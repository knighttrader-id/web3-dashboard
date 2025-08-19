import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Token } from '../types/web3';

interface TokenListProps {
  tokens: Token[];
}

export function TokenList({ tokens }: TokenListProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-gray-600">
          <div>Crypto Name</div>
          <div className="text-right">Last Price</div>
          <div className="text-right">24h Change</div>
          <div className="text-right">Action</div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {tokens.map((token) => (
          <div key={token.address} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{token.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{token.symbol}</div>
                  <div className="text-sm text-gray-500">{token.name}</div>
                </div>
              </div>
              
              <div className="text-right font-semibold text-gray-900">
                ${(parseFloat(token.balance) * (Math.random() * 100 + 1)).toLocaleString()}
              </div>
              
              <div className="text-right">
                {Math.random() > 0.5 ? (
                  <span className="text-green-600 font-medium">+{(Math.random() * 10).toFixed(2)}%</span>
                ) : (
                  <span className="text-red-600 font-medium">-{(Math.random() * 5).toFixed(2)}%</span>
                )}
              </div>
              
              <div className="text-right">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}