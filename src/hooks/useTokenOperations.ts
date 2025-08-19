import { useState } from 'react';
import { ethers } from 'ethers';
import { ERC20_ABI } from '../contracts/ERC20';
import { UNISWAP_V2_ROUTER_ABI, ROUTER_ADDRESSES, WETH_ADDRESSES } from '../contracts/UniswapV2';

export function useTokenOperations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendToken = async (
    tokenAddress: string,
    recipientAddress: string,
    amount: string,
    decimals: number
  ) => {
    if (!window.ethereum) throw new Error('MetaMask not found');
    
    setIsLoading(true);
    setError(null);
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      if (tokenAddress === 'ETH') {
        // Send ETH
        const tx = await signer.sendTransaction({
          to: recipientAddress,
          value: ethers.parseEther(amount)
        });
        
        await tx.wait();
        return tx.hash;
      } else {
        // Send ERC20 token
        const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
        const amountWei = ethers.parseUnits(amount, decimals);
        
        const tx = await contract.transfer(recipientAddress, amountWei);
        await tx.wait();
        return tx.hash;
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const swapTokens = async (
    fromTokenAddress: string,
    toTokenAddress: string,
    amountIn: string,
    amountOutMin: string,
    fromDecimals: number,
    toDecimals: number
  ) => {
    if (!window.ethereum) throw new Error('MetaMask not found');
    
    setIsLoading(true);
    setError(null);
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      
      const routerAddress = ROUTER_ADDRESSES[chainId as keyof typeof ROUTER_ADDRESSES];
      const wethAddress = WETH_ADDRESSES[chainId as keyof typeof WETH_ADDRESSES];
      
      if (!routerAddress || !wethAddress) {
        throw new Error('Unsupported network for swapping');
      }
      
      const router = new ethers.Contract(routerAddress, UNISWAP_V2_ROUTER_ABI, signer);
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
      
      let tx;
      
      if (fromTokenAddress === 'ETH') {
        // ETH to Token
        const path = [wethAddress, toTokenAddress];
        const amountOutMinWei = ethers.parseUnits(amountOutMin, toDecimals);
        
        tx = await router.swapExactETHForTokens(
          amountOutMinWei,
          path,
          await signer.getAddress(),
          deadline,
          { value: ethers.parseEther(amountIn) }
        );
      } else if (toTokenAddress === 'ETH') {
        // Token to ETH
        const path = [fromTokenAddress, wethAddress];
        const amountInWei = ethers.parseUnits(amountIn, fromDecimals);
        const amountOutMinWei = ethers.parseEther(amountOutMin);
        
        // First approve the router to spend tokens
        const tokenContract = new ethers.Contract(fromTokenAddress, ERC20_ABI, signer);
        const approveTx = await tokenContract.approve(routerAddress, amountInWei);
        await approveTx.wait();
        
        tx = await router.swapExactTokensForETH(
          amountInWei,
          amountOutMinWei,
          path,
          await signer.getAddress(),
          deadline
        );
      } else {
        // Token to Token
        const path = [fromTokenAddress, wethAddress, toTokenAddress];
        const amountInWei = ethers.parseUnits(amountIn, fromDecimals);
        const amountOutMinWei = ethers.parseUnits(amountOutMin, toDecimals);
        
        // First approve the router to spend tokens
        const tokenContract = new ethers.Contract(fromTokenAddress, ERC20_ABI, signer);
        const approveTx = await tokenContract.approve(routerAddress, amountInWei);
        await approveTx.wait();
        
        tx = await router.swapExactTokensForTokens(
          amountInWei,
          amountOutMinWei,
          path,
          await signer.getAddress(),
          deadline
        );
      }
      
      await tx.wait();
      return tx.hash;
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getSwapQuote = async (
    fromTokenAddress: string,
    toTokenAddress: string,
    amountIn: string,
    fromDecimals: number
  ) => {
    if (!window.ethereum) throw new Error('MetaMask not found');
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      
      const routerAddress = ROUTER_ADDRESSES[chainId as keyof typeof ROUTER_ADDRESSES];
      const wethAddress = WETH_ADDRESSES[chainId as keyof typeof WETH_ADDRESSES];
      
      if (!routerAddress || !wethAddress) {
        throw new Error('Unsupported network for quotes');
      }
      
      const router = new ethers.Contract(routerAddress, UNISWAP_V2_ROUTER_ABI, provider);
      const amountInWei = ethers.parseUnits(amountIn, fromDecimals);
      
      let path: string[];
      if (fromTokenAddress === 'ETH') {
        path = [wethAddress, toTokenAddress];
      } else if (toTokenAddress === 'ETH') {
        path = [fromTokenAddress, wethAddress];
      } else {
        path = [fromTokenAddress, wethAddress, toTokenAddress];
      }
      
      const amounts = await router.getAmountsOut(amountInWei, path);
      return amounts[amounts.length - 1];
    } catch (error: any) {
      console.error('Error getting swap quote:', error);
      return null;
    }
  };

  return {
    sendToken,
    swapTokens,
    getSwapQuote,
    isLoading,
    error
  };
}