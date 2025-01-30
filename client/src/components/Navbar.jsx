import React, { useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { TransactionContext } from "../context/TransactionContext";
import { navItems } from "../constants/content";
import { shortenAddress } from "../utils/shortenAddress";
import jediLogo from "../assets/jedi-logo.png";

const JediLogo = () => (
  <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <img 
      src={jediLogo} 
      alt="Jedi" 
      className="w-10 h-10 object-contain"
    />
  </div>
);

const NavBarItem = ({ title, classprops, onClick }) => (
  <li 
    className={`mx-4 cursor-pointer hover:text-[#37c7da] transition-colors duration-300 ${classprops}`} 
    onClick={onClick}
  >
    {title}
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setToggleMenu(false);
    }
  };

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 fixed top-0 bg-[#0f0e13]/90 backdrop-blur-sm z-50">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <JediLogo />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {navItems.map((item) => (
          <NavBarItem 
            key={item.id} 
            title={item.title} 
            onClick={() => scrollToSection(item.id)}
          />
        ))}
        {!currentAccount ? (
          <button
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] transition-colors duration-300"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center bg-[#2952e3] py-2 px-4 mx-4 rounded-full">
            <SiEthereum className="text-white mr-2" />
            <span className="text-white text-sm">
              {shortenAddress(currentAccount)}
            </span>
          </div>
        )}
      </ul>

      {/* Mobile Menu */}
      <div className="flex relative md:hidden">
        {toggleMenu
          ? <AiOutlineClose fontSize={28} className="text-white cursor-pointer" onClick={() => setToggleMenu(false)} />
          : <HiMenuAlt4 fontSize={28} className="text-white cursor-pointer" onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {navItems.map((item) => (
              <NavBarItem
                key={item.id}
                title={item.title}
                classprops="my-2 text-lg"
                onClick={() => scrollToSection(item.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
