import Image from 'next/image';
import React from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center w-full p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center px-6">
        <Image 
          src="/images/bmLogo.png" 
          alt="BuildMart Logo"
          width={150} 
          height={50} 
          className="w-[150px] sm:w-[200px]" 
        />
      </div>
      <div className="flex items-center w-full max-w-md bg-transparent border border-[#F8B612] rounded-full overflow-hidden">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="bg-transparent focus:outline-none px-4 py-2 w-full text-black"
        />
        <button className="bg-[#F8B612] px-8 sm:px-8 py-2 text-white font-semibold rounded-full">
          Search
        </button>
      </div>
      <div className="flex items-center px-10 space-x-2">
        <MdOutlineShoppingCart className="text-[#263C5A] cursor-pointer" size={35} />
      </div>
    </nav>
  );
};

export default Navbar;
