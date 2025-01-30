import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) {
        console.log("Please install MetaMask");
        return;
      }

      // Check if we're on the right network
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0xaa36a7') { // Sepolia chainId
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }], // Sepolia
          });
        } catch (switchError) {
          console.log("Network switch error:", switchError);
        }
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("Available accounts:", accounts);

      if (accounts.length) {
        const account = accounts[0];
        console.log("Found authorized account:", account);
        setCurrentAccount(account);
        localStorage.setItem("currentAccount", account); // Save to localStorage
        getAllTransactions();
      } else {
        // Try to recover from localStorage
        const savedAccount = localStorage.getItem("currentAccount");
        if (savedAccount) {
          setCurrentAccount(savedAccount);
          getAllTransactions();
        } else {
          console.log("No authorized account found");
        }
      }

      // Add event listener for account changes
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);

      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      };
    } catch (error) {
      console.log("Error checking wallet connection:", error);
      throw error;
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User has disconnected their wallet
      setCurrentAccount("");
      localStorage.removeItem("currentAccount");
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      // User has switched accounts
      setCurrentAccount(accounts[0]);
      localStorage.setItem("currentAccount", accounts[0]);
      getAllTransactions();
    }
  };

  const handleChainChanged = () => {
    // Handle chain changes by reloading the page
    window.location.reload();
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask.");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      console.log("Connected to account:", account);
      
      setCurrentAccount(account);
      localStorage.setItem("currentAccount", account);
      getAllTransactions();
    } catch (error) {
      console.log("Error connecting wallet:", error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    try {
      setCurrentAccount("");
      localStorage.removeItem("currentAccount");
      setTransactions([]);
      console.log("Wallet disconnected");
    } catch (error) {
      console.log("Error disconnecting wallet:", error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  // Initialize wallet connection check
  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  // Separate effect for transaction existence check
  useEffect(() => {
    if (currentAccount) {
      checkIfTransactionsExists();
    }
  }, [currentAccount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        disconnectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
