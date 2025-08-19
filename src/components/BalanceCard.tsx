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
    <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-gray-300 text-sm font-medium">Total Balance</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-white">
              {parseFloat(balance).toFixed(4)}
            </span>
            <span className="text-xl text-gray-300 mb-1">{network?.symbol || 'ETH'}</span>
          </div>
        </div>
        <div className="bg-green-500/20 px-3 py-1 rounded-full">
          <div className="flex items-center gap-1 text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+2.4%</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onSend}
          className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-3 px-4 text-white font-medium transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Send
        </button>
        
        <button
          onClick={onSwap}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-xl py-3 px-4 text-white font-medium transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <ArrowUpDown className="w-5 h-5" />
          Swap
        </button>
      </div>
    </div>
  );
}