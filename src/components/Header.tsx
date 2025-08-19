import React, { useState } from 'react';
import { LogOut, ChevronDown, Network, Copy, Check } from 'lucide-react';
import type { Network as NetworkType } from '../types/web3';

interface HeaderProps {
  address: string;
  network: NetworkType | null;
  networks: Record<number, NetworkType>;
  onDisconnect: () => void;
  onSwitchNetwork: (chainId: number) => void;
}

export function Header({ address, network, networks, onDisconnect, onSwitchNetwork }: HeaderProps) {
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-2 rounded-xl">
              <Network className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">CryptoExchange</h1>
            <nav className="hidden md:flex items-center gap-6 ml-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Marketplace</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Trading</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Portfolio</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Network Selector */}
            <div className="relative">
              <button
                onClick={() => setShowNetworkMenu(!showNetworkMenu)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors border border-gray-300"
              >
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">{network?.name || 'Unknown'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showNetworkMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg py-2 min-w-[200px] z-50">
                  {Object.values(networks).map((net) => (
                    <button
                      key={net.chainId}
                      onClick={() => {
                        onSwitchNetwork(net.chainId);
                        setShowNetworkMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        network?.chainId === net.chainId ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          network?.chainId === net.chainId ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        {net.name}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Address */}
            <button
              onClick={copyAddress}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors border border-gray-300"
            >
              <span className="font-mono">{formatAddress(address)}</span>
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            {/* Disconnect */}
            <button
              onClick={onDisconnect}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-red-600 hover:text-red-700 transition-colors border border-red-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}