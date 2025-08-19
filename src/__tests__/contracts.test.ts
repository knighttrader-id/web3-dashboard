import { ethers } from 'ethers';
import { ERC20_ABI, TESTNET_TOKENS } from '../contracts/ERC20';
import { UNISWAP_V2_ROUTER_ABI, ROUTER_ADDRESSES } from '../contracts/UniswapV2';

// Mock provider for testing
const mockProvider = {
  getNetwork: jest.fn().mockResolvedValue({ chainId: 11155111 }),
  getBlockNumber: jest.fn().mockResolvedValue(12345),
  getFeeData: jest.fn().mockResolvedValue({
    gasPrice: ethers.parseUnits('20', 'gwei')
  })
};

// Mock ethers
jest.mock('ethers', () => ({
  ...jest.requireActual('ethers'),
  BrowserProvider: jest.fn().mockImplementation(() => mockProvider),
  Contract: jest.fn().mockImplementation((address, abi, provider) => ({
    name: jest.fn().mockResolvedValue('Test Token'),
    symbol: jest.fn().mockResolvedValue('TEST'),
    decimals: jest.fn().mockResolvedValue(18),
    balanceOf: jest.fn().mockResolvedValue(ethers.parseEther('100')),
    transfer: jest.fn().mockResolvedValue({ hash: '0x123', wait: jest.fn() }),
    approve: jest.fn().mockResolvedValue({ hash: '0x456', wait: jest.fn() })
  }))
}));

describe('Smart Contract Integration', () => {
  beforeEach(() => {
    // Mock window.ethereum
    (global as any).window = {
      ethereum: {
        request: jest.fn(),
        on: jest.fn(),
        removeListener: jest.fn()
      }
    };
  });

  describe('ERC20 Contract', () => {
    test('should have correct ABI functions', () => {
      expect(ERC20_ABI).toContain('function name() view returns (string)');
      expect(ERC20_ABI).toContain('function symbol() view returns (string)');
      expect(ERC20_ABI).toContain('function balanceOf(address owner) view returns (uint256)');
      expect(ERC20_ABI).toContain('function transfer(address to, uint256 amount) returns (bool)');
    });

    test('should have testnet token addresses', () => {
      expect(TESTNET_TOKENS[11155111]).toBeDefined();
      expect(TESTNET_TOKENS[11155111].USDC).toBeDefined();
      expect(TESTNET_TOKENS[80001]).toBeDefined();
      expect(TESTNET_TOKENS[97]).toBeDefined();
    });
  });

  describe('Uniswap V2 Router', () => {
    test('should have correct router addresses', () => {
      expect(ROUTER_ADDRESSES[1]).toBeDefined();
      expect(ROUTER_ADDRESSES[11155111]).toBeDefined();
      expect(ROUTER_ADDRESSES[137]).toBeDefined();
      expect(ROUTER_ADDRESSES[80001]).toBeDefined();
    });

    test('should have swap functions in ABI', () => {
      expect(UNISWAP_V2_ROUTER_ABI).toContain(
        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
      );
      expect(UNISWAP_V2_ROUTER_ABI).toContain(
        'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)'
      );
    });
  });

  describe('Token Operations', () => {
    test('should create ERC20 contract instance', () => {
      const tokenAddress = TESTNET_TOKENS[11155111].USDC;
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, mockProvider);
      
      expect(ethers.Contract).toHaveBeenCalledWith(tokenAddress, ERC20_ABI, mockProvider);
      expect(contract).toBeDefined();
    });

    test('should handle token balance queries', async () => {
      const tokenAddress = TESTNET_TOKENS[11155111].USDC;
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, mockProvider);
      
      const balance = await contract.balanceOf('0x123');
      expect(balance).toBeDefined();
    });
  });

  describe('Network Configuration', () => {
    test('should support specified testnet networks only', () => {
      // Sepolia Testnet
      expect(ROUTER_ADDRESSES[11155111]).toBe('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
      
      // Manta Pacific Testnet
      expect(ROUTER_ADDRESSES[3441006]).toBeDefined();
      
      // Lisk Sepolia Testnet
      expect(ROUTER_ADDRESSES[4202]).toBeDefined();
    });

    test('should have testnet token configurations', () => {
      const sepoliaTokens = TESTNET_TOKENS[11155111];
      expect(sepoliaTokens.USDC).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(sepoliaTokens.DAI).toMatch(/^0x[a-fA-F0-9]{40}$/);
      
      const mantaTokens = TESTNET_TOKENS[3441006];
      expect(mantaTokens.USDC).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(mantaTokens.WETH).toMatch(/^0x[a-fA-F0-9]{40}$/);
      
      const liskTokens = TESTNET_TOKENS[4202];
      expect(liskTokens.USDC).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(liskTokens.LSK).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });
  });
});