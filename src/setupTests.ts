import '@testing-library/jest-dom';

// Mock window.ethereum for tests
Object.defineProperty(window, 'ethereum', {
  writable: true,
  value: {
    isMetaMask: true,
    request: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn(),
  },
});

// Mock ethers provider
jest.mock('ethers', () => ({
  ...jest.requireActual('ethers'),
  BrowserProvider: jest.fn().mockImplementation(() => ({
    send: jest.fn(),
    getSigner: jest.fn().mockResolvedValue({
      getAddress: jest.fn().mockResolvedValue('0x123'),
      sendTransaction: jest.fn().mockResolvedValue({ hash: '0x123', wait: jest.fn() }),
    }),
    getBalance: jest.fn().mockResolvedValue('1000000000000000000'),
    getNetwork: jest.fn().mockResolvedValue({ chainId: 1, name: 'homestead' }),
    getBlockNumber: jest.fn().mockResolvedValue(12345),
    getFeeData: jest.fn().mockResolvedValue({
      gasPrice: '20000000000',
    }),
  })),
}));