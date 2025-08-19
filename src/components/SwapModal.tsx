import React, { useState } from 'react';
import { X, ArrowUpDown, Settings } from 'lucide-react';
import type { Token } from '../types/web3';
import { useTokenOperations } from '../hooks/useTokenOperations';
import { ethers } from 'ethers';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: Token[];
}

export function SwapModal({ isOpen, onClose, tokens }: SwapModalProps) {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const { swapTokens, getSwapQuote, isLoading, error } = useTokenOperations();

  if (!isOpen) return null;

  const handleSwap = async () => {
    if (!fromAmount) return;
    
    try {
      const fromToken = allTokens.find(t => t.symbol === fromToken);
      const toToken = allTokens.find(t => t.symbol === toToken);
      
      const fromAddress = fromToken?.symbol === 'ETH' ? 'ETH' : fromToken?.address || '';
      const toAddress = toToken?.symbol === 'ETH' ? 'ETH' : toToken?.address || '';
      
      const slippageAmount = (parseFloat(toAmount) * (1 - parseFloat(slippage) / 100)).toString();
      
      const txHash = await swapTokens(
        fromAddress,
        toAddress,
        fromAmount,
        slippageAmount,
        fromToken?.decimals || 18,
        toToken?.decimals || 18
      );
      
      alert(`Swap completed! Hash: ${txHash}`);
      onClose();
    } catch (error: any) {
      alert(`Swap failed: ${error.message}`);
    }
  };

  const flipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Simulate price calculation
  React.useEffect(() => {
    if (fromAmount && fromToken !== toToken) {
      const getQuote = async () => {
        try {
          const fromTokenData = allTokens.find(t => t.symbol === fromToken);
          const toTokenData = allTokens.find(t => t.symbol === toToken);
          
          const fromAddress = fromTokenData?.symbol === 'ETH' ? 'ETH' : fromTokenData?.address || '';
          const toAddress = toTokenData?.symbol === 'ETH' ? 'ETH' : toTokenData?.address || '';
          
          const quote = await getSwapQuote(
            fromAddress,
            toAddress,
            fromAmount,
            fromTokenData?.decimals || 18
          );
          
          if (quote) {
            const formattedQuote = ethers.formatUnits(quote, toTokenData?.decimals || 18);
            setToAmount(parseFloat(formattedQuote).toFixed(6));
          }
        } catch (error) {
          console.error('Error getting quote:', error);
          // Fallback to mock calculation
          const rate = fromToken === 'ETH' ? 2000 : 0.0005;
          setToAmount((parseFloat(fromAmount) * rate).toFixed(6));
        }
      };
      
      getQuote();
    }
  }, [fromAmount, fromToken, toToken, allTokens, getSwapQuote]);

  const allTokens = [{ symbol: 'ETH', name: 'Ethereum', balance: '1.5' }, ...tokens];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-md shadow-xl">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Swap Tokens</h2>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {/* From Token */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">You pay</span>
              <span className="text-sm text-gray-500">
                Balance: {allTokens.find(t => t.symbol === fromToken)?.balance || '0'}
              </span>
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-500"
              >
                {allTokens.map(token => (
                  <option key={token.symbol} value={token.symbol} className="bg-white">
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={flipTokens}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full p-3 transition-colors"
            >
              <ArrowUpDown className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* To Token */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">You receive</span>
              <span className="text-sm text-gray-500">
                Balance: {allTokens.find(t => t.symbol === toToken)?.balance || '0'}
              </span>
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-500"
              >
                {allTokens.map(token => (
                  <option key={token.symbol} value={token.symbol} className="bg-white">
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Swap Details */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex gap-3">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-red-800">
                  <p className="font-medium">Swap Error</p>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {fromAmount && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm border border-gray-200">
              <div className="flex justify-between text-gray-700">
                <span>Rate</span>
                <span>1 {fromToken} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Slippage tolerance</span>
                <span>{slippage}%</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Network fee</span>
                <span>~$5.50</span>
              </div>
            </div>
          )}
          
          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={!fromAmount || isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Swapping...
              </>
            ) : (
              <>
                <ArrowUpDown className="w-5 h-5" />
                Swap Tokens
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}