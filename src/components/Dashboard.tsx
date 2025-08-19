import React, { useState } from 'react';
import { Header } from './Header';
import { BalanceCard } from './BalanceCard';
import { TokenList } from './TokenList';
import { TransactionHistory } from './TransactionHistory';
import { SendModal } from './SendModal';
import { SwapModal } from './SwapModal';
import { TestnetFaucet } from './TestnetFaucet';
import { NetworkStatus } from './NetworkStatus';
import type { WalletState, Network } from '../types/web3';

interface DashboardProps {
  walletState: WalletState;
  onDisconnect: () => void;
  onSwitchNetwork: (chainId: number) => void;
  networks: Record<number, Network>;
}

export function Dashboard({ walletState, onDisconnect, onSwitchNetwork, networks }: DashboardProps) {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  
  const isTestnet = walletState.network && [11155111, 80001, 97].includes(walletState.network.chainId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        address={walletState.address!}
        network={walletState.network}
        networks={networks}
        onDisconnect={onDisconnect}
        onSwitchNetwork={onSwitchNetwork}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Balance Overview */}
          <div>
            <BalanceCard 
              balance={walletState.balance}
              network={walletState.network}
              onSend={() => setShowSendModal(true)}
              onSwap={() => setShowSwapModal(true)}
            />
          </div>
          
          {/* Tokens and Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Assets</h2>
              <TokenList tokens={walletState.tokens} />
              
              {/* Testnet Faucet */}
              {isTestnet && (
                <div className="mt-6">
                  <TestnetFaucet 
                    address={walletState.address!}
                    network={walletState.network}
                  />
                </div>
              )}
            </div>
            <div>
              <TransactionHistory transactions={walletState.transactions} />
              
              {/* Network Status */}
              <div className="mt-6">
                <NetworkStatus network={walletState.network} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Modals */}
      {showSendModal && (
        <SendModal 
          isOpen={showSendModal}
          onClose={() => setShowSendModal(false)}
          balance={walletState.balance}
          network={walletState.network}
        />
      )}
      
      {showSwapModal && (
        <SwapModal 
          isOpen={showSwapModal}
          onClose={() => setShowSwapModal(false)}
          tokens={walletState.tokens}
        />
      )}
    </div>
  );
}