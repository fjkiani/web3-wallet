// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
  
    struct TransferStruct {
        address sender;     // Who sent the transaction
        address receiver;   // Who received the transaction
        uint amount;        // Amount of cryptocurrency
        string message;     // Message attached to transfer
        uint256 timestamp; // When the transfer occurred
        string keyword;    // Keyword for searching/categorizing
    }

  // addToBlockchain() This function:
  //Records a new transaction
  //Increments the transaction count
  //Emits a Transfer event

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    // getAllTransactions() These functions allow reading:
    // Returns all transactions in the blockchain
    // Returns the total number of transactions
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}

// This contract is a simple blockchain-based transaction system that allows users to send and receive cryptocurrency.
// It uses Solidity to define the contract and its functions, and Hardhat to compile and deploy the contract.
// The contract includes a mapping to store the transaction history, and functions to add new transactions and retrieve the transaction history.
// The contract also includes an event to notify listeners when a new transaction is added to the blockchain.
// The contract is designed to be used in a decentralized application (DApp) that allows users to send and receive cryptocurrency.
// The contract is designed to be secure and efficient, and to be used in a real-world application.
