import React, { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import type { Network } from '../types/web3';
import { useTokenOperations } from '../hooks/useTokenOperations';

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
  const { sendToken, isLoading, error } = useTokenOperations();

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!recipient || !amount) return;
    
    try {
      const txHash = await sendToken('ETH', recipient, amount, 18);
      alert(`Transaction sent! Hash: ${txHash}`);
      onClose();
    } catch (error: any) {
      alert(`Transaction failed: ${error.message}`);
    }
  };

  const maxBalance = parseFloat(balance) - 0.001; // Reserve for gas

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-md shadow-xl">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Send {network?.symbol || 'ETH'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          {/* Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Amount</label>
              <button
                onClick={() => setAmount(maxBalance.toString())}
                className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
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
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 pr-16 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {network?.symbol || 'ETH'}
              </span>
            </div>
          </div>
          
          {/* Gas Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gas Price (Gwei)
            </label>
            <input
              type="number"
              value={gasPrice}
              onChange={(e) => setGasPrice(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          {/* Warning */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium mb-1">Transaction Error</p>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Transaction Fee Estimate</p>
                <p>~${(parseFloat(gasPrice) * 0.001 * 2000).toFixed(2)} USD</p>
              </div>
            </div>
          </div>
          
          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!recipient || !amount || parseFloat(amount) > maxBalance || isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
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