export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  value?: number;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  type: 'send' | 'receive' | 'swap';
}

export interface Network {
  chainId: number;
  name: string;
  rpcUrl: string;
  symbol: string;
  blockExplorer: string;
}

export interface WalletState {
  address: string | null;
  balance: string;
  network: Network | null;
  tokens: Token[];
  transactions: Transaction[];
  isConnecting: boolean;
  isConnected: boolean;
}