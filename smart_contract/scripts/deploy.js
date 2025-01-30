// Main deployment function
const main = async () => {
  // Get the contract factory (compiler output) for "Transactions"
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
  
  // Deploy the contract
  const transactionsContract = await transactionsFactory.deploy();

  // Wait for the contract to be deployed
  await transactionsContract.deployed();

  // Log the contract's address
  console.log("Transactions address: ", transactionsContract.address);
};

// Wrapper function to handle the deployment process
const runMain = async () => {
  try {
    await main();
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit with error
  }
};

runMain();