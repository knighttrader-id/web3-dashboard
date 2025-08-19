# Web3 Dashboard - Testnet DeFi Application

A modern, production-ready Web3 dashboard built with React, TypeScript, and Ethers.js. This application provides a comprehensive interface for managing cryptocurrency wallets, tokens, and DeFi operations on testnet environments with a clean, professional design.

![Web3 Dashboard](https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## 🚀 Features

### 🔐 Wallet Management
- **MetaMask Integration**: Seamless connection with MetaMask browser extension
- **Multi-Testnet Support**: Switch between Sepolia, Manta Pacific, and Lisk testnets
- **Account Management**: View wallet address, copy to clipboard, and disconnect functionality
- **Balance Tracking**: Real-time ETH/native token balance updates

### 💰 Token Portfolio
- **Token List**: Display ERC-20 tokens with balances and price changes
- **Portfolio Overview**: Clean table view of token holdings
- **Real-time Data**: Live blockchain data fetching
- **Token Details**: Symbol, name, contract address, and decimal information

### 💸 Transaction Features
- **Send Tokens**: Transfer ETH or tokens to any address with real blockchain transactions
- **Gas Estimation**: Real-time gas price calculation and fee estimation
- **Transaction History**: Complete history of sends, receives, and swaps from blockchain
- **Status Tracking**: Pending, confirmed, and failed transaction states

### 🔄 DeFi Operations
- **Token Swapping**: Exchange tokens using Uniswap V2 router contracts
- **Real Price Quotes**: Live exchange rate calculation from DEX
- **Slippage Protection**: Customizable slippage tolerance settings
- **Approval Flow**: Proper ERC20 token approval before swaps

### 🎨 Modern UI/UX
- **Clean Professional Design**: White background with structured data tables
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Financial Interface**: Traditional crypto exchange styling
- **Smooth Animations**: Loading states and micro-interactions
- **Accessibility**: WCAG compliant with proper contrast ratios

## 🛠 Technology Stack

### Frontend Framework
- **React 18**: Latest React with hooks and concurrent features
- **TypeScript**: Full type safety and developer experience
- **Vite**: Lightning-fast build tool and development server

### Web3 Integration
- **Ethers.js v6**: Modern Ethereum library for blockchain interactions
- **MetaMask Provider**: Browser wallet integration
- **Smart Contracts**: Real ERC20 and Uniswap V2 contract interactions

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Custom Components**: Reusable UI components with consistent design

### Development Tools
- **ESLint**: Code linting and quality assurance
- **Jest**: Comprehensive testing framework
- **TypeScript Config**: Strict type checking configuration

## 🌐 Supported Networks

This application supports three testnet environments:

### Sepolia Testnet (Ethereum)
- **Chain ID**: 11155111
- **Native Token**: ETH
- **RPC URL**: https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
- **Block Explorer**: https://sepolia.etherscan.io
- **Faucets**: 
  - https://sepoliafaucet.com/
  - https://faucet.sepolia.dev/
  - https://faucet.quicknode.com/ethereum/sepolia

### Manta Pacific Testnet
- **Chain ID**: 3441006
- **Native Token**: ETH
- **RPC URL**: https://manta-testnet.calderachain.xyz/http
- **Block Explorer**: https://manta-testnet.calderachain.xyz/blockscout
- **Faucets**:
  - https://faucet.testnet.manta.network/
  - https://bridge.testnet.manta.network/

### Lisk Sepolia Testnet
- **Chain ID**: 4202
- **Native Token**: ETH
- **RPC URL**: https://rpc.sepolia-api.lisk.com
- **Block Explorer**: https://sepolia-blockscout.lisk.com
- **Faucets**:
  - https://faucet.lisk.com/
  - https://bridge.sepolia-api.lisk.com/

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- MetaMask browser extension
- Modern web browser with Web3 support

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web3-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

## 🏗 Project Structure

```
src/
├── components/           # React components
│   ├── WalletConnect.tsx    # Wallet connection interface
│   ├── Dashboard.tsx        # Main dashboard layout
│   ├── Header.tsx          # Navigation and account info
│   ├── BalanceCard.tsx     # Balance display component
│   ├── TokenList.tsx       # Token portfolio table
│   ├── TransactionHistory.tsx # Transaction history
│   ├── SendModal.tsx       # Send token modal
│   ├── SwapModal.tsx       # Token swap interface
│   ├── TestnetFaucet.tsx   # Testnet faucet links
│   └── NetworkStatus.tsx   # Network status display
├── hooks/               # Custom React hooks
│   ├── useWallet.ts        # Wallet state management
│   └── useTokenOperations.ts # Token transfer/swap operations
├── contracts/           # Smart contract ABIs
│   ├── ERC20.ts           # ERC20 token contract ABI
│   └── UniswapV2.ts       # Uniswap V2 router ABI
├── types/               # TypeScript definitions
│   ├── web3.ts            # Web3 type definitions
│   └── ethereum.d.ts      # Ethereum provider types
├── __tests__/           # Test files
│   └── contracts.test.ts   # Smart contract tests
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🧪 Testing

### Smart Contract Testing

The application includes comprehensive tests for smart contract integration:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Test Coverage:**
- ERC20 token contract interactions
- Uniswap V2 router integration
- Network configuration validation
- Token balance and transfer operations
- Swap quote calculations

### Testnet Testing Guide

**Step 1: Setup MetaMask**
1. Install MetaMask browser extension
2. Create or import a wallet
3. Add the testnet networks (app will prompt to add them)

**Step 2: Get Testnet Tokens**
1. Connect to Sepolia testnet
2. Use the built-in faucet links to get testnet ETH
3. Copy your wallet address using the app's copy button
4. Visit faucet websites and request tokens

**Step 3: Test Core Features**
- [ ] Wallet connection/disconnection
- [ ] Network switching between testnets
- [ ] Balance updates and display
- [ ] Send testnet ETH transactions
- [ ] View real transaction history
- [ ] Token swapping (if DEX available on testnet)

**Step 4: Verify Transactions**
- Check transaction hashes on block explorers
- Verify balance changes after transactions
- Test error handling with insufficient funds

## 🔒 Security Features

### Built-in Security
- **No Private Key Storage**: Never stores private keys locally
- **MetaMask Integration**: Uses secure browser wallet
- **Transaction Signing**: All transactions signed by user
- **Input Validation**: Validates all user inputs and addresses
- **Testnet Only**: Safe testing environment without real funds

### Best Practices
- **Address Validation**: Checksums and format validation
- **Gas Estimation**: Prevents failed transactions
- **Error Handling**: Comprehensive error messages
- **Network Validation**: Ensures operations are supported

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--blue-500: #3B82F6      /* Primary buttons and accents */
--blue-600: #2563EB      /* Hover states */

/* Status Colors */
--green-500: #10B981     /* Success states and gains */
--red-500: #EF4444       /* Error states and losses */
--yellow-500: #F59E0B    /* Warning states */

/* Background Colors */
--gray-50: #F9FAFB       /* Page background */
--white: #FFFFFF         /* Card backgrounds */

/* Text Colors */
--gray-900: #111827      /* Primary text */
--gray-700: #374151      /* Secondary text */
--gray-500: #6B7280      /* Tertiary text */
```

### Typography
- **Headings**: Inter font family, bold weights
- **Body Text**: Inter font family, regular weight
- **Monospace**: For addresses and transaction hashes
- **Responsive Sizing**: Scales appropriately across devices

## 🚀 Deployment

### Build Optimization
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Removes unused code
- **Asset Optimization**: Compressed images and fonts
- **Bundle Analysis**: Optimized chunk sizes

### Deployment Platforms
**Recommended:**
- **Vercel**: Zero-config deployment with Git integration
- **Netlify**: Continuous deployment with form handling
- **GitHub Pages**: Free hosting for static sites
- **IPFS**: Decentralized hosting for Web3 applications

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Submit a pull request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow configured linting rules
- **Testing**: Add tests for new features
- **Documentation**: Update README for significant changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MetaMask Team**: For the excellent Web3 provider
- **Ethers.js**: For the comprehensive Ethereum library
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon set
- **Vite Team**: For the fast build tool

## 📞 Support

For support and questions:
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check this README for guidance
- **MetaMask Support**: For wallet-specific issues

---

**Built with ❤️ for Web3 developers and DeFi enthusiasts**

*This application demonstrates modern Web3 development practices and serves as a foundation for building decentralized applications on testnet environments.*