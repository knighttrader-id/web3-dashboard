// Uniswap V2 Router ABI for token swapping
export const UNISWAP_V2_ROUTER_ABI = [
  "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
  "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  "function WETH() external pure returns (address)"
];

// Router addresses for different networks
export const ROUTER_ADDRESSES = {
  // Sepolia Testnet
  11155111: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  // Manta Pacific Testnet (Mock DEX Router)
  3441006: "0x123456789abcdef123456789abcdef1234567890",
  // Lisk Sepolia Testnet (Mock DEX Router)
  4202: "0x234567890abcdef234567890abcdef2345678901"
};

// WETH addresses for different networks
export const WETH_ADDRESSES = {
  11155111: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
  3441006: "0x123456789abcdef123456789abcdef123456789c", // WETH on Manta
  4202: "0x234567890abcdef234567890abcdef234567890d" // WETH on Lisk
};