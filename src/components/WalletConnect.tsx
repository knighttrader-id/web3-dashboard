import React from 'react';
import { Wallet, Loader2 } from 'lucide-react';

interface WalletConnectProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export function WalletConnect({ onConnect, isConnecting }: WalletConnectProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-md w-full text-center">
        <div className="bg-gradient-to-r from-cyan-400 to-purple-500 p-4 rounded-2xl w-fit mx-auto mb-6">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Welcome to Web3
        </h1>
        
        <p className="text-gray-300 mb-8 leading-relaxed">
          Connect your MetaMask wallet to access decentralized finance features, 
          manage your tokens, and interact with smart contracts.
        </p>
        
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-3"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5" />
              Connect MetaMask
            </>
          )}
        </button>
        
        <p className="text-sm text-gray-400 mt-4">
          Don't have MetaMask? 
          <a 
            href="https://metamask.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 ml-1 underline"
          >
            Install it here
          </a>
        </p>
      </div>
    </div>
  );
}