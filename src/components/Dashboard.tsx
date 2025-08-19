import React, { useState } from 'react';
import { Header } from './Header';
import { BalanceCard } from './BalanceCard';
import { TokenList } from './TokenList';
import { TransactionHistory } from './TransactionHistory';
import { SendModal } from './SendModal';
import { SwapModal } from './SwapModal';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <Header 
        address={walletState.address!}
        network={walletState.network}
        networks={networks}
        onDisconnect={onDisconnect}
        onSwitchNetwork={onSwitchNetwork}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance Overview */}
          <div className="lg:col-span-2">
            <BalanceCard 
              balance={walletState.balance}
              network={walletState.network}
              onSend={() => setShowSendModal(true)}
              onSwap={() => setShowSwapModal(true)}
            />
            
            {/* Tokens */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Your Tokens</h2>
              <TokenList tokens={walletState.tokens} />
            </div>
          </div>
          
          {/* Transaction History */}
          <div>
            <TransactionHistory transactions={walletState.transactions} />
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