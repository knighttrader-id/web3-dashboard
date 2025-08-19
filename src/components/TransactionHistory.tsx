import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ArrowUpDown, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import type { Transaction } from '../types/web3';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getTransactionIcon = (type: Transaction['type'], status: Transaction['status']) => {
    const iconClass = "w-5 h-5";
    
    if (status === 'pending') return <Clock className={`${iconClass} text-yellow-400`} />;
    if (status === 'failed') return <XCircle className={`${iconClass} text-red-400`} />;
    
    switch (type) {
      case 'send':
        return <ArrowUpRight className={`${iconClass} text-red-400`} />;
      case 'receive':
        return <ArrowDownLeft className={`${iconClass} text-green-400`} />;
      case 'swap':
        return <ArrowUpDown className={`${iconClass} text-purple-400`} />;
      default:
        return <CheckCircle className={`${iconClass} text-green-400`} />;
    }
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
      </div>
      
      <div className="divide-y divide-white/10 max-h-96 overflow-y-auto">
        {transactions.map((tx) => (
          <div key={tx.hash} className="p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              {getTransactionIcon(tx.type, tx.status)}
              <div className="flex-1">
                <p className="font-medium text-white capitalize">{tx.type}</p>
                <p className="text-xs text-gray-400">{formatTime(tx.timestamp)}</p>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  tx.type === 'receive' ? 'text-green-400' : 'text-white'
                }`}>
                  {tx.type === 'receive' ? '+' : '-'}{tx.value} ETH
                </p>
                <p className={`text-xs ${
                  tx.status === 'confirmed' ? 'text-green-400' :
                  tx.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {tx.status}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-mono">{tx.hash}</span>
              <button className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                <ExternalLink className="w-3 h-3" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}