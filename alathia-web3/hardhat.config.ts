import dotenv from 'dotenv';
import '@nomiclabs/hardhat-ethers';

dotenv.config();

export default {
  solidity: {
    version: '0.8.16',
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    mantleSepolia: {
      url: 'https://rpc.sepolia.mantle.xyz', // RPC URL for Mantle testnet
      chainId: 5003, // Chain ID for Mantle Testnet
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
