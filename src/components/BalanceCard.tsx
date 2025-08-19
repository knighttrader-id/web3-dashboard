import React from 'react';
import { Send, ArrowUpDown, TrendingUp } from 'lucide-react';
import type { Network } from '../types/web3';

interface BalanceCardProps {
  balance: string;
  network: Network | null;
  onSend: () => void;
  onSwap: () => void;
}

export function BalanceCard({ balance, network, onSend, onSwap }: BalanceCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-gray-600 text-lg font-medium mb-2">Total Balance</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-gray-900">
              {parseFloat(balance).toFixed(4)}
            </span>
            <span className="text-2xl text-gray-600 mb-2">{network?.symbol || 'ETH'}</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">≈ ${(parseFloat(balance) * 2000).toLocaleString()} USD</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-green-600 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-lg font-semibold">+2.4%</span>
          </div>
          <p className="text-sm text-gray-500">24h change</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onSend}
          className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl py-3 px-4 text-gray-700 font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Send
        </button>
        
        <button
          onClick={onSwap}
          className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-xl py-3 px-4 text-white font-medium transition-colors flex items-center justify-center gap-2"
        >
          <ArrowUpDown className="w-5 h-5" />
          Swap
        </button>
      </div>
    </div>
  );
}