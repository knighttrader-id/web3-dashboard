import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ArrowUpDown, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import type { Transaction } from '../types/web3';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getTransactionIcon = (type: Transaction['type'], status: Transaction['status']) => {
    const iconClass = "w-4 h-4";
    
    if (status === 'pending') return <Clock className={`${iconClass} text-yellow-500`} />;
    if (status === 'failed') return <XCircle className={`${iconClass} text-red-500`} />;
    
    switch (type) {
      case 'send':
        return <ArrowUpRight className={`${iconClass} text-red-500`} />;
      case 'receive':
        return <ArrowDownLeft className={`${iconClass} text-green-500`} />;
      case 'swap':
        return <ArrowUpDown className={`${iconClass} text-blue-500`} />;
      default:
        return <CheckCircle className={`${iconClass} text-green-500`} />;
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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
      </div>
      
      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {transactions.map((tx) => (
          <div key={tx.hash} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              {getTransactionIcon(tx.type, tx.status)}
              <div className="flex-1">
                <p className="font-medium text-gray-900 capitalize">{tx.type}</p>
                <p className="text-sm text-gray-500">{formatTime(tx.timestamp)}</p>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  tx.type === 'receive' ? 'text-green-600' : 'text-gray-900'
                }`}>
                  {tx.type === 'receive' ? '+' : '-'}{tx.value} ETH
                </p>
                <p className={`text-xs ${
                  tx.status === 'confirmed' ? 'text-green-600' :
                  tx.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-mono">{tx.hash}</span>
              <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
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