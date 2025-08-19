import React from 'react';
import { WalletConnect } from './components/WalletConnect';
import { Dashboard } from './components/Dashboard';
import { useWallet } from './hooks/useWallet';

function App() {
  const wallet = useWallet();

  if (!wallet.isConnected) {
    return (
      <WalletConnect 
        onConnect={wallet.connectWallet}
        isConnecting={wallet.isConnecting}
      />
    );
  }

  return (
    <Dashboard 
      walletState={wallet}
      onDisconnect={wallet.disconnectWallet}
      onSwitchNetwork={wallet.switchNetwork}
      networks={wallet.networks}
    />
  );
}

export default App;