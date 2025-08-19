import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { ethers } from 'ethers';

interface NetworkStatusProps {
  network: { chainId: number; name: string; rpcUrl: string } | null;
}

export function NetworkStatus({ network }: NetworkStatusProps) {
  const [isConnected, setIsConnected] = useState(true);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [gasPrice, setGasPrice] = useState<string | null>(null);

  useEffect(() => {
    if (!network || !window.ethereum) return;

    const checkNetworkStatus = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Get latest block number
        const latestBlock = await provider.getBlockNumber();
        setBlockNumber(latestBlock);
        
        // Get current gas price
        const feeData = await provider.getFeeData();
        if (feeData.gasPrice) {
          const gasPriceGwei = ethers.formatUnits(feeData.gasPrice, 'gwei');
          setGasPrice(parseFloat(gasPriceGwei).toFixed(1));
        }
        
        setIsConnected(true);
      } catch (error) {
        console.error('Network status check failed:', error);
        setIsConnected(false);
      }
    };

    checkNetworkStatus();
    const interval = setInterval(checkNetworkStatus, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [network]);

  if (!network) return null;

  const isTestnet = [11155111, 80001, 97].includes(network.chainId);
  const isTestnet = [11155111, 3441006, 4202].includes(network.chainId);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Network Status</h3>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-xs font-medium ${
            isConnected ? 'text-green-600' : 'text-red-600'
          }`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Network:</span>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{network.name}</span>
            {isTestnet && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                Testnet
              </span>
            )}
          </div>
        </div>
        
        {blockNumber && (
          <div className="flex justify-between">
            <span className="text-gray-600">Latest Block:</span>
            <span className="font-mono text-gray-900">#{blockNumber.toLocaleString()}</span>
          </div>
        )}
        
        {gasPrice && (
          <div className="flex justify-between">
            <span className="text-gray-600">Gas Price:</span>
            <span className="font-mono text-gray-900">{gasPrice} Gwei</span>
          </div>
        )}
      </div>

      {isTestnet && (
        <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-yellow-800">
              <p className="font-medium">Testnet Environment</p>
              <p>Tokens have no real value. Use for testing only.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}