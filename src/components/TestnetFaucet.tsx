import React, { useState } from 'react';
import { Droplets, ExternalLink, Copy, Check } from 'lucide-react';

interface TestnetFaucetProps {
  address: string;
  network: { chainId: number; name: string } | null;
}

const FAUCET_URLS = {
  11155111: { // Sepolia
    name: 'Sepolia Faucet',
    urls: [
      'https://sepoliafaucet.com/',
      'https://faucet.sepolia.dev/',
      'https://faucet.quicknode.com/ethereum/sepolia'
    ]
  },
  3441006: { // Manta Pacific Testnet
    name: 'Manta Pacific Testnet Faucet',
    urls: [
      'https://faucet.testnet.manta.network/',
      'https://bridge.testnet.manta.network/'
    ]
  },
  4202: { // Lisk Sepolia Testnet
    name: 'Lisk Sepolia Testnet Faucet',
    urls: [
      'https://faucet.lisk.com/',
      'https://bridge.sepolia-api.lisk.com/'
    ]
  }
};

export function TestnetFaucet({ address, network }: TestnetFaucetProps) {
  const [copied, setCopied] = useState(false);

  if (!network || !FAUCET_URLS[network.chainId as keyof typeof FAUCET_URLS]) {
    return null;
  }

  const faucetInfo = FAUCET_URLS[network.chainId as keyof typeof FAUCET_URLS];

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-500 p-2 rounded-lg">
          <Droplets className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Get Testnet Tokens</h3>
          <p className="text-sm text-gray-600">Free tokens for {network.name}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Wallet Address
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={address}
              readOnly
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono text-gray-900"
            />
            <button
              onClick={copyAddress}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Faucets
          </label>
          <div className="space-y-2">
            {faucetInfo.urls.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">
                  {faucetInfo.name} #{index + 1}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> Testnet tokens have no real value and are only for testing purposes. 
            Some faucets may require social verification or have daily limits.
          </p>
        </div>
      </div>
    </div>
  );
}