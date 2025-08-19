import React from 'react';
import { Wallet, Loader2 } from 'lucide-react';

interface WalletConnectProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export function WalletConnect({ onConnect, isConnecting }: WalletConnectProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md w-full text-center">
        <div className="bg-blue-500 p-4 rounded-xl w-fit mx-auto mb-6">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Connect Your Wallet
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Connect your MetaMask wallet to start trading and managing your crypto assets.
        </p>
        
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
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
        
        <p className="text-sm text-gray-500 mt-4">
          Don't have MetaMask? 
          <a 
            href="https://metamask.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 ml-1 underline"
          >
            Install it here
          </a>
        </p>
      </div>
    </div>
  );
}