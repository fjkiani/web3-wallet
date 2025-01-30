// Navigation
export const navItems = [
  { 
    title: "Get Started", 
    id: "get-started",
    description: "Begin your Web3 journey"
  },
  { 
    title: "How It Works", 
    id: "how-it-works",
    description: "Understanding Web3 transactions"
  },
  { 
    title: "Digital Wallets", 
    id: "wallets",
    description: "Your gateway to blockchain"
  },
  { 
    title: "Security", 
    id: "security",
    description: "Keeping your assets safe"
  }
];

// Features Grid
export const featureItems = [
  { title: "Decentralized", description: "No central authority" },
  { title: "Transparent", description: "All transactions are public" },
  { title: "Borderless", description: "Send money globally" },
  { title: "Web 3.0", description: "Next generation internet" },
  { title: "Low Fees", description: "Minimal transaction costs" },
  { title: "Blockchain", description: "Immutable ledger technology" }
];

// Service Cards
export const serviceCards = [
  {
    title: "Decentralized Security",
    color: "bg-[#2952E3]",
    icon: "shield",
    subtitle: "Unlike traditional banks, blockchain technology provides transparent, immutable, and cryptographically secured transactions."
  },
  {
    title: "Smart Contract Automation",
    color: "bg-[#8945F8]",
    icon: "search",
    subtitle: "Replace traditional payment processors with automated smart contracts, reducing costs and eliminating intermediaries."
  },
  {
    title: "Global Instant Transfers",
    color: "bg-[#F84550]",
    icon: "heart",
    subtitle: "Move from slow bank transfers to instant, borderless transactions. Send value anywhere in the world within seconds."
  }
];

// Form Fields
export const formFields = [
  {
    placeholder: "Recipient's Wallet Address",
    name: "addressTo",
    type: "text"
  },
  {
    placeholder: "Amount (ETH)",
    name: "amount",
    type: "number"
  },
  {
    placeholder: "Transaction Keyword",
    name: "keyword",
    type: "text"
  },
  {
    placeholder: "Transaction Message",
    name: "message",
    type: "text"
  }
];

// Educational Content
export const educationalContent = {
  whatIsWeb3: {
    title: "What is Web3?",
    description: "Web3 represents the next generation of the internet, where users have full control over their data and digital assets through blockchain technology."
  },
  digitalWallets: {
    title: "Digital Wallets Explained",
    description: "A digital wallet is your personal account on the blockchain, allowing you to send, receive, and store cryptocurrency securely."
  },
  security: {
    title: "Security Best Practices",
    steps: [
      "Never share your private keys",
      "Use hardware wallets for large amounts",
      "Verify all transaction details",
      "Keep your recovery phrase safe"
    ]
  }
};

// Brand
export const brandInfo = {
  name: "Web3 Bridge",
  tagline: "Your Gateway to Decentralized Finance",
  description: "Experience the evolution from traditional payment systems to blockchain technology."
};

// Section Content
export const sections = {
  getStarted: {
    title: "Transform Your Payment Experience",
    subtitle: "Step into the future of finance. Experience seamless, secure, and borderless transactions with blockchain technology.",
    features: [
      { title: "Decentralized", description: "No central authority needed" },
      { title: "Transparent", description: "All transactions are public" },
      { title: "Borderless", description: "Global transfers in seconds" },
      { title: "Automated", description: "Smart contract powered" },
      { title: "Secure", description: "Cryptographically protected" },
      { title: "Instant", description: "Real-time settlements" }
    ]
  },
  howItWorks: {
    title: "How Web3 Transactions Work",
    subtitle: "Understanding the basics of blockchain transactions",
    steps: [
      {
        title: "Connect Wallet",
        description: "Link your MetaMask wallet to get started",
        icon: "wallet"
      },
      {
        title: "Enter Details",
        description: "Specify recipient and amount to send",
        icon: "form"
      },
      {
        title: "Confirm Transaction",
        description: "Review and approve in MetaMask",
        icon: "check"
      }
    ]
  },
  wallets: {
    title: "Digital Wallets Explained",
    subtitle: "Your gateway to the blockchain world",
    content: [
      {
        title: "What is a Digital Wallet?",
        description: "A secure digital tool that allows you to send, receive, and store cryptocurrency.",
        icon: "wallet"
      },
      {
        title: "Why MetaMask?",
        description: "Industry-standard wallet with easy-to-use interface and strong security.",
        icon: "metamask"
      }
    ]
  },
  security: {
    title: "Security First",
    subtitle: "Protecting your digital assets",
    tips: [
      {
        title: "Private Keys",
        description: "Never share your private keys or recovery phrase"
      },
      {
        title: "Verify Transactions",
        description: "Always double-check recipient addresses"
      },
      {
        title: "Use Protection",
        description: "Enable two-factor authentication when possible"
      }
    ]
  }
};

// Footer Content
export const footerContent = {
  links: [
    {
      title: "Resources",
      items: [
        { name: "MetaMask Guide", url: "#" },
        { name: "Security Tips", url: "#" },
        { name: "FAQs", url: "#" }
      ]
    },
    {
      title: "Community",
      items: [
        { name: "Discord", url: "#" },
        { name: "Twitter", url: "#" },
        { name: "Blog", url: "#" }
      ]
    }
  ],
  copyright: "© 2024 Web3 Bridge. All rights reserved."
}; 