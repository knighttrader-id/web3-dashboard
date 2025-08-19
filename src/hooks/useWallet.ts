import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import type { WalletState, Network, Token, Transaction } from '../types/web3';
import { ERC20_ABI, TESTNET_TOKENS } from '../contracts/ERC20';

const NETWORKS: Record<number, Network> = {
  11155111: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    symbol: 'ETH',
    blockExplorer: 'https://sepolia.etherscan.io'
  },
  3441006: {
    chainId: 3441006,
    name: 'Manta Pacific Testnet',
    rpcUrl: 'https://manta-testnet.calderachain.xyz/http',
    symbol: 'ETH',
    blockExplorer: 'https://manta-testnet.calderachain.xyz/blockscout'
  },
  4202: {
    chainId: 4202,
    name: 'Lisk Sepolia Testnet',
    rpcUrl: 'https://rpc.sepolia-api.lisk.com',
    symbol: 'ETH',
    blockExplorer: 'https://sepolia-blockscout.lisk.com'
  }
};

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    balance: '0',
    network: null,
    tokens: [],
    transactions: [],
    isConnecting: false,
    isConnected: false
  });

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true }));

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      setWalletState(prev => ({
        ...prev,
        address,
        balance: ethers.formatEther(balance),
        network: NETWORKS[Number(network.chainId)] || {
          chainId: Number(network.chainId),
          name: network.name,
          rpcUrl: '',
          symbol: 'ETH',
          blockExplorer: ''
        },
        isConnected: true,
        isConnecting: false
      }));

      // Load mock tokens and transactions for demo
      await loadTokens(address);
      await loadTransactions(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please make sure you have MetaMask installed and try again.');
      setWalletState(prev => ({ ...prev, isConnecting: false }));
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      address: null,
      balance: '0',
      network: null,
      tokens: [],
      transactions: [],
      isConnecting: false,
      isConnected: false
    });
  }, []);

  const loadTokens = async (address: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      
      // Get testnet tokens for current network
      const networkTokens = TESTNET_TOKENS[chainId as keyof typeof TESTNET_TOKENS];
      if (!networkTokens) {
        setWalletState(prev => ({ ...prev, tokens: [] }));
        return;
      }

      const tokens: Token[] = [];
      
      for (const [symbol, tokenAddress] of Object.entries(networkTokens)) {
        try {
          const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
          
          const [name, decimals, balance] = await Promise.all([
            contract.name(),
            contract.decimals(),
            contract.balanceOf(address)
          ]);
          
          const formattedBalance = ethers.formatUnits(balance, decimals);
          
          if (parseFloat(formattedBalance) > 0) {
            tokens.push({
              address: tokenAddress,
              symbol,
              name,
              decimals: Number(decimals),
              balance: formattedBalance
            });
          }
        } catch (error) {
          console.error(`Error loading token ${symbol}:`, error);
        }
      }

      setWalletState(prev => ({ ...prev, tokens }));
    } catch (error) {
      console.error('Error loading tokens:', error);
      setWalletState(prev => ({ ...prev, tokens: [] }));
    }
  };

  const loadTransactions = async (address: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      
      // Get recent transactions from the blockchain
      const latestBlock = await provider.getBlockNumber();
      const transactions: Transaction[] = [];
      
      // Check last 100 blocks for transactions
      for (let i = 0; i < 100 && transactions.length < 10; i++) {
        try {
          const block = await provider.getBlock(latestBlock - i, true);
          if (block && block.transactions) {
            for (const tx of block.transactions) {
              if (typeof tx === 'object' && tx.from && tx.to) {
                if (tx.from.toLowerCase() === address.toLowerCase() || 
                    tx.to?.toLowerCase() === address.toLowerCase()) {
                  
                  const receipt = await provider.getTransactionReceipt(tx.hash);
                  
                  transactions.push({
                    hash: tx.hash,
                    from: tx.from,
                    to: tx.to || '',
                    value: ethers.formatEther(tx.value || '0'),
                    timestamp: block.timestamp * 1000,
                    status: receipt?.status === 1 ? 'confirmed' : 'failed',
                    type: tx.from.toLowerCase() === address.toLowerCase() ? 'send' : 'receive'
                  });
                  
                  if (transactions.length >= 10) break;
                }
              }
            }
          }
        } catch (error) {
          console.error(`Error loading block ${latestBlock - i}:`, error);
        }
      }

      setWalletState(prev => ({ ...prev, transactions }));
    } catch (error) {
      console.error('Error loading transactions:', error);
      // Fallback to empty array
      setWalletState(prev => ({ ...prev, transactions: [] }));
    }
  };

  const switchNetwork = async (chainId: number) => {
    if (typeof window.ethereum === 'undefined') return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        const network = NETWORKS[chainId];
        if (network) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${chainId.toString(16)}`,
              chainName: network.name,
              rpcUrls: [network.rpcUrl],
              nativeCurrency: {
                name: network.symbol,
                symbol: network.symbol,
                decimals: 18,
              },
              blockExplorerUrls: [network.blockExplorer],
            }],
          });
        }
      }
    }
  };

  // Listen for account and network changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== walletState.address) {
          connectWallet();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [walletState.address, connectWallet, disconnectWallet]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    networks: NETWORKS
  };
}