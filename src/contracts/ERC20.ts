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
  },
  // Mumbai Testnet (Polygon)
  80001: {
    USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    DAI: "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F",
    WMATIC: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
  },
  // BSC Testnet
  97: {
    USDT: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    BUSD: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
    CAKE: "0xFa60D973F7642B748046464e165A65B7323b0DEE",
  }
};

export interface TokenContract {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}