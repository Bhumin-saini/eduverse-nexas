
# EduPoints Token Deployment Guide

## Prerequisites

1. **Development Environment Setup**:
   - Install Hardhat: `npm install --save-dev hardhat`
   - Install OpenZeppelin contracts: `npm install @openzeppelin/contracts`

2. **Arbitrum Layer 3 Specifics**:
   - Ensure you have an RPC endpoint for your Layer 3 testnet
   - Obtain testnet tokens for deployment

## Deployment Steps

1. Create a Hardhat configuration file (hardhat.config.js) with Arbitrum Layer 3 network:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    eduChain: {
      url: process.env.EDUCHAIN_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

2. Create a deployment script:

```javascript
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const EduPointsToken = await ethers.getContractFactory("EduPointsToken");
  const eduPoints = await EduPointsToken.deploy();
  await eduPoints.deployed();

  console.log("EduPoints token deployed to:", eduPoints.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

3. Deploy the contract:
   ```
   npx hardhat run scripts/deploy.js --network eduChain
   ```

4. Verify the contract (if your Layer 3 supports verification):
   ```
   npx hardhat verify --network eduChain DEPLOYED_CONTRACT_ADDRESS
   ```

5. Save the deployed contract address for frontend integration

## Frontend Integration

Create a utility file to interact with the smart contract:

```typescript
import { ethers } from 'ethers';
import EduPointsTokenABI from './EduPointsToken.json';

export const getEduPointsContract = async (provider) => {
  const signer = provider.getSigner();
  const eduPointsContract = new ethers.Contract(
    'YOUR_DEPLOYED_CONTRACT_ADDRESS',
    EduPointsTokenABI.abi,
    signer
  );
  
  return eduPointsContract;
};

export const getUserBalance = async (contract, address) => {
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatEther(balance);
};

export const getStudentSummary = async (contract, address) => {
  const summary = await contract.getStudentSummary(address);
  return {
    isRegistered: summary[0],
    totalPointsEarned: ethers.utils.formatEther(summary[1]),
    totalPointsSpent: ethers.utils.formatEther(summary[2]),
    currentBalance: ethers.utils.formatEther(summary[3]),
    stakedPoints: ethers.utils.formatEther(summary[4]),
    achievementCount: summary[5].toNumber(),
  };
};
```
