import React, { useState } from 'react';
import { X, ArrowUpDown, Settings } from 'lucide-react';
import type { Token } from '../types/web3';

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
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSwap = async () => {
    if (!fromAmount) return;
    
    setIsLoading(true);
    
    // Simulate swap
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      alert('Swap completed! (This is a demo)');
    }, 2000);
  };

  const flipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Simulate price calculation
  React.useEffect(() => {
    if (fromAmount) {
      const rate = fromToken === 'ETH' ? 2000 : 0.0005; // Mock rates
      setToAmount((parseFloat(fromAmount) * rate).toFixed(6));
    }
  }, [fromAmount, fromToken]);

  const allTokens = [{ symbol: 'ETH', name: 'Ethereum', balance: '1.5' }, ...tokens];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 w-full max-w-md">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Swap Tokens</h2>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {/* From Token */}
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">You pay</span>
              <span className="text-sm text-gray-400">
                Balance: {allTokens.find(t => t.symbol === fromToken)?.balance || '0'}
              </span>
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl text-white placeholder-gray-400 focus:outline-none"
              />
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              >
                {allTokens.map(token => (
                  <option key={token.symbol} value={token.symbol} className="bg-gray-800">
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
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-colors"
            >
              <ArrowUpDown className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* To Token */}
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">You receive</span>
              <span className="text-sm text-gray-400">
                Balance: {allTokens.find(t => t.symbol === toToken)?.balance || '0'}
              </span>
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl text-white placeholder-gray-400 focus:outline-none"
              />
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              >
                {allTokens.map(token => (
                  <option key={token.symbol} value={token.symbol} className="bg-gray-800">
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Swap Details */}
          {fromAmount && (
            <div className="bg-white/5 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Rate</span>
                <span>1 {fromToken} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Slippage tolerance</span>
                <span>{slippage}%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Network fee</span>
                <span>~$5.50</span>
              </div>
            </div>
          )}
          
          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={!fromAmount || isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
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