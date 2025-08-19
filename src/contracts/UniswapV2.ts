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
  // Ethereum Mainnet
  1: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  // Sepolia Testnet
  11155111: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  // Polygon Mainnet
  137: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
  // Mumbai Testnet
  80001: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
  // BSC Mainnet
  56: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  // BSC Testnet
  97: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1"
};

// WETH addresses for different networks
export const WETH_ADDRESSES = {
  1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  11155111: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
  137: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", // WMATIC
  80001: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889", // WMATIC
  56: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // WBNB
  97: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd" // WBNB
};