import React from "react";
import { BsShieldFillCheck, BsArrowRight } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { FaWallet, FaCheckCircle } from "react-icons/fa";
import { serviceCards, brandInfo, educationalContent, sections } from "../constants/content";

const getIcon = (iconName) => {
  const icons = {
    shield: <BsShieldFillCheck fontSize={21} className="text-white" />,
    search: <BiSearchAlt fontSize={21} className="text-white" />,
    heart: <RiHeart2Fill fontSize={21} className="text-white" />,
    wallet: <FaWallet fontSize={21} className="text-white" />,
    check: <FaCheckCircle fontSize={21} className="text-white" />
  };
  return icons[iconName] || null;
};

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-6 m-2 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105">
    <div className={`w-12 h-12 rounded-full flex justify-center items-center ${color} shadow-lg`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-300 text-sm md:w-9/12 leading-relaxed">
        {subtitle}
      </p>
    </div>
  </div>
);

const EducationalSection = ({ title, description, items }) => (
  <div className="flex flex-col w-full mt-16 bg-[#20242A] rounded-2xl p-8">
    <div className="mb-8">
      <h2 className="text-white text-3xl font-bold mb-4 text-gradient">{title}</h2>
      <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="white-glassmorphism p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center mb-4">
            {item.icon && (
              <div className="w-10 h-10 rounded-full bg-[#2952E3] flex items-center justify-center mr-4">
                {getIcon(item.icon)}
              </div>
            )}
            <h3 className="text-white text-xl font-semibold">{item.title}</h3>
          </div>
          <p className="text-gray-300 text-base leading-relaxed">
            {item.description || item}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const ComparisonFlow = ({ steps, isWeb3 }) => (
  <div className="space-y-3">
    {steps.map((step, index) => (
      <div key={index} className="flex items-center text-gray-300">
        <span className={`mr-2 ${isWeb3 ? 'text-green-400' : ''}`}>{step}</span>
        {index < steps.length - 1 && <BsArrowRight className="ml-2" />}
      </div>
    ))}
  </div>
);

const Services = () => {
  const web2Steps = ['User', 'Payment Form', 'Payment Processor', 'Bank', 'Recipient'];
  const web3Steps = ['User', 'MetaMask', 'Smart Contract', 'Recipient'];

  return (
    <div className="flex w-full flex-col justify-center items-center gradient-bg-services">
      <div className="flex flex-col items-center justify-between max-w-7xl w-full px-4 md:px-20 py-20">
        {/* Get Started Section */}
        <div id="get-started" className="flex flex-col items-center text-center mb-16">
          <h1 className="text-white text-4xl sm:text-6xl font-bold py-2 text-gradient">
            {brandInfo.tagline}
          </h1>
          <p className="text-center mt-4 text-gray-300 text-xl font-light md:w-9/12 w-11/12 leading-relaxed">
            {brandInfo.description}
          </p>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="w-full">
          <div className="grid md:grid-cols-3 gap-8 w-full mb-16">
            {serviceCards.map((card, index) => (
              <ServiceCard
                key={index}
                color={card.color}
                title={card.title}
                icon={getIcon(card.icon)}
                subtitle={card.subtitle}
              />
            ))}
          </div>

          <EducationalSection
            title={educationalContent.whatIsWeb3.title}
            description={educationalContent.whatIsWeb3.description}
            items={sections.howItWorks.steps}
          />
        </div>

        {/* Digital Wallets Section */}
        <div id="wallets" className="w-full">
          <EducationalSection
            title={educationalContent.digitalWallets.title}
            description={educationalContent.digitalWallets.description}
            items={sections.wallets.content}
          />
        </div>

        {/* Security Section */}
        <div id="security" className="w-full">
          <EducationalSection
            title={educationalContent.security.title}
            description={sections.security.subtitle}
            items={educationalContent.security.steps}
          />
        </div>

        {/* Web2 to Web3 Comparison */}
        <div className="flex flex-col w-full mt-16 bg-[#20242A] rounded-2xl p-8">
          <h2 className="text-white text-3xl font-bold mb-8 text-gradient">Web2 vs Web3 Transactions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="white-glassmorphism p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
              <h3 className="text-white text-2xl font-bold mb-6">Traditional (Web2) Flow</h3>
              <ComparisonFlow steps={web2Steps} />
              <div className="mt-4 text-gray-400 text-sm">
                Typical processing time: 2-3 business days
              </div>
            </div>
            <div className="white-glassmorphism p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
              <h3 className="text-white text-2xl font-bold mb-6">Blockchain (Web3) Flow</h3>
              <ComparisonFlow steps={web3Steps} isWeb3={true} />
              <div className="mt-4 text-green-400 text-sm">
                Typical processing time: 15-30 seconds
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
