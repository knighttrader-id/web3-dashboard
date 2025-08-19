import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import type { WalletState, Network, Token, Transaction } from '../types/web3';

const NETWORKS: Record<number, Network> = {
  1: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://eth.llamarpc.com',
    symbol: 'ETH',
    blockExplorer: 'https://etherscan.io'
  },
  137: {
    chainId: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon.llamarpc.com',
    symbol: 'MATIC',
    blockExplorer: 'https://polygonscan.com'
  },
  56: {
    chainId: 56,
    name: 'BSC',
    rpcUrl: 'https://bsc.llamarpc.com',
    symbol: 'BNB',
    blockExplorer: 'https://bscscan.com'
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
    // Mock token data for demo - in production, you'd fetch from APIs
    const mockTokens: Token[] = [
      {
        address: '0xA0b86a33E6441b8446df7c00F4Bd86C8c7cf74c3',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        balance: '1250.50'
      },
      {
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        symbol: 'DAI',
        name: 'Dai Stablecoin',
        decimals: 18,
        balance: '890.75'
      },
      {
        address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        symbol: 'UNI',
        name: 'Uniswap',
        decimals: 18,
        balance: '45.25'
      }
    ];

    setWalletState(prev => ({ ...prev, tokens: mockTokens }));
  };

  const loadTransactions = async (address: string) => {
    // Mock transaction data for demo
    const mockTransactions: Transaction[] = [
      {
        hash: '0x1234...abcd',
        from: address,
        to: '0x742d35Cc6565C9B7cb1E8d6F5D0a7FdB3e3F8B8d',
        value: '0.5',
        timestamp: Date.now() - 3600000,
        status: 'confirmed',
        type: 'send'
      },
      {
        hash: '0x5678...efgh',
        from: '0x8ba1f109551bD432803012645Hac136c9c7b5C1C',
        to: address,
        value: '1.25',
        timestamp: Date.now() - 7200000,
        status: 'confirmed',
        type: 'receive'
      },
      {
        hash: '0x9abc...ijkl',
        from: address,
        to: '0xUniswapV3Router',
        value: '100',
        timestamp: Date.now() - 10800000,
        status: 'confirmed',
        type: 'swap'
      }
    ];

    setWalletState(prev => ({ ...prev, transactions: mockTransactions }));
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