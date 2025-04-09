
# EDUChain Deployment Guide

This guide provides instructions for deploying the EDUChain platform, including both the smart contract on Arbitrum Layer 3 and the frontend application.

## Prerequisites

1. **Development Environment Setup**:
   - Node.js (v16.0.0 or higher)
   - npm (v8.0.0 or higher)
   - Git

2. **Required Accounts**:
   - Ethereum wallet (MetaMask recommended)
   - Arbitrum Testnet or Mainnet account with ETH for gas fees
   - Web hosting account (Vercel, Netlify, etc.)

## Step 1: Smart Contract Deployment

### Setup Development Environment

```bash
# Install Hardhat and dependencies
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle @openzeppelin/contracts dotenv
```

### Configure Environment Variables

Create a `.env` file in the project root:

```
PRIVATE_KEY=your_private_key_here
EDUCHAIN_RPC_URL=your_arbitrum_layer3_rpc_url_here
```

### Deploy Smart Contract

1. Run the deployment script:

```bash
npx hardhat run scripts/deploy.js --network eduChain
```

2. Save the deployed contract address and update it in `src/utils/contractUtils.ts`:

```typescript
const CONTRACT_ADDRESS = 'your_deployed_contract_address_here';
```

3. Verify the contract on the block explorer (if supported):

```bash
npx hardhat verify --network eduChain DEPLOYED_CONTRACT_ADDRESS
```

## Step 2: Frontend Deployment

### Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

### Option 1: Deploy to Vercel

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy:

```bash
vercel
```

3. Follow the prompts to complete the deployment.

### Option 2: Deploy to Netlify

1. Install Netlify CLI:

```bash
npm install -g netlify-cli
```

2. Deploy:

```bash
netlify deploy
```

3. For production deployment:

```bash
netlify deploy --prod
```

### Option 3: Deploy to GitHub Pages

1. Install gh-pages package:

```bash
npm install --save-dev gh-pages
```

2. Add these scripts to package.json:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Deploy:

```bash
npm run deploy
```

## Post-Deployment Configuration

### Update Frontend Constants

1. Update the contract address in `src/utils/contractUtils.ts` with your deployed contract address.
2. Ensure the ABI in `src/utils/contractUtils.ts` matches your deployed contract.

### Configure RPC Provider

If you're using a public RPC endpoint, consider:
1. Setting up your own RPC endpoint for better reliability
2. Using a service like Infura or Alchemy for production deployments

## Testing the Deployment

1. Ensure users can connect their wallets
2. Test token balance retrieval
3. Verify student registration functionality
4. Test token earning and redemption processes

## Security Considerations

1. Ensure proper access controls are set in the smart contract
2. Implement HTTPS for your frontend
3. Set appropriate CORS headers in your hosting configuration
4. Consider implementing rate limiting for API calls

## Maintenance

1. Monitor contract events for unusual activities
2. Keep dependencies updated
3. Consider implementing a contract upgrade mechanism for future updates

## Troubleshooting

### Common Issues

1. **Wallet Connection Failures**: Ensure users have MetaMask or a compatible wallet installed.

2. **Contract Interaction Errors**: Verify users are on the correct network (Arbitrum Layer 3).

3. **Transaction Failures**: Check that users have sufficient ETH for gas fees.

4. **Frontend Issues**:
   - Clear browser cache
   - Ensure correct contract ABI is being used
   - Check console for JavaScript errors

For additional support, please reach out to the EDUChain team.
