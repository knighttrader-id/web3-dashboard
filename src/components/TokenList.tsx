import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Token } from '../types/web3';

interface TokenListProps {
  tokens: Token[];
}

export function TokenList({ tokens }: TokenListProps) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">Token Portfolio</h3>
      </div>
      
      <div className="divide-y divide-white/10">
        {tokens.map((token) => (
          <div key={token.address} className="p-6 hover:bg-white/5 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{token.name}</h4>
                  <p className="text-sm text-gray-400">{token.symbol}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-white">{parseFloat(token.balance).toLocaleString()}</p>
                <div className="flex items-center gap-1 justify-end">
                  {Math.random() > 0.5 ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">+{(Math.random() * 10).toFixed(2)}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-red-400">-{(Math.random() * 5).toFixed(2)}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}