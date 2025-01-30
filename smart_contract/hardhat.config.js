require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/1J-cDltJGB7Kbwpj7Bph1D3cBQvVqLEp',
      accounts: ['85adaaf058c656053adfdd3e3294f467ba011370be0379abff1ae9510c4bd4a6'],
    },
  },
};