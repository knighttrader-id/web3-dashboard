// ERC20 Token Contract ABI and Interface
export const ERC20_ABI = [
  // Read functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  
  // Write functions
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

// Common testnet token addresses
export const TESTNET_TOKENS = {
  // Sepolia Testnet
  11155111: {
    USDC: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8", // Mock USDC
    DAI: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357", // Mock DAI
    LINK: "0x779877A7B0D9E8603169DdbD7836e478b4624789", // Chainlink Token
    USDT: "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06", // Mock USDT
  },
  // Manta Pacific Testnet
  3441006: {
    USDC: "0x123456789abcdef123456789abcdef123456789a", // Mock USDC on Manta
    USDT: "0x123456789abcdef123456789abcdef123456789b", // Mock USDT on Manta
    WETH: "0x123456789abcdef123456789abcdef123456789c", // Wrapped ETH on Manta
  },
  // Lisk Sepolia Testnet
  4202: {
    USDC: "0x234567890abcdef234567890abcdef234567890a", // Mock USDC on Lisk
    USDT: "0x234567890abcdef234567890abcdef234567890b", // Mock USDT on Lisk
    LSK: "0x234567890abcdef234567890abcdef234567890c", // Lisk Token
  }
};

export interface TokenContract {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}