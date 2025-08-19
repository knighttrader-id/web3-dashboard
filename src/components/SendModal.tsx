import React, { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import type { Network } from '../types/web3';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: string;
  network: Network | null;
}

export function SendModal({ isOpen, onClose, balance, network }: SendModalProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [gasPrice, setGasPrice] = useState('20');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!recipient || !amount) return;
    
    setIsLoading(true);
    
    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // You would integrate with actual Web3 provider here
      alert('Transaction submitted! (This is a demo)');
    }, 2000);
  };

  const maxBalance = parseFloat(balance) - 0.001; // Reserve for gas

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 w-full max-w-md">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Send {network?.symbol || 'ETH'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
          
          {/* Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-300">Amount</label>
              <button
                onClick={() => setAmount(maxBalance.toString())}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Max: {maxBalance.toFixed(4)}
              </button>
            </div>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-16 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {network?.symbol || 'ETH'}
              </span>
            </div>
          </div>
          
          {/* Gas Price */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gas Price (Gwei)
            </label>
            <input
              type="number"
              value={gasPrice}
              onChange={(e) => setGasPrice(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
          
          {/* Warning */}
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-200">
                <p className="font-medium mb-1">Transaction Fee Estimate</p>
                <p>~${(parseFloat(gasPrice) * 0.001 * 2000).toFixed(2)} USD</p>
              </div>
            </div>
          </div>
          
          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!recipient || !amount || parseFloat(amount) > maxBalance || isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Transaction
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}