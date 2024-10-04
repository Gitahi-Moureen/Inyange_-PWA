// import Image from 'next/image';
// import React from 'react';
// import { MdOutlineShoppingCart } from "react-icons/md";

// const Navbar = ({ itemCount }: { itemCount: number }) => {
//   return (
//     <nav className="flex flex-row justify-between items-center w-full p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
//       <div className="flex items-center px-6">
//         <Image 
//           src="/images/bmLogo.png" 
//           alt="BuildMart Logo"
//           width={150} 
//           height={50} 
//           className="w-[150px] sm:w-[200px]" 
//         />
//       </div>
//       <div className="flex items-center w-full max-w-md bg-transparent border border-[#F8B612] rounded-full overflow-hidden">
//         <input
//           type="text"
//           placeholder="What are you looking for?"
//           className="bg-transparent focus:outline-none px-4 py-2 w-full text-black"
//         />
//         <button className="bg-[#F8B612] px-8 sm:px-8 py-2 text-white font-semibold rounded-full">
//           Search
//         </button>
//       </div>
//       <div className="relative">
        
//           <MdOutlineShoppingCart className="text-[#263C5A] cursor-pointer" size={35} />
//           {itemCount > 0 && (
//             <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
//               {itemCount}
//             </span>
//           )}
//         </div>
//     </nav>
//   );
// };

// export default Navbar;


import Image from 'next/image';
import React from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import Link from 'next/link';  // Import the Link component from Next.js

const Navbar = ({ itemCount }: { itemCount: number }) => {
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
      <div className="relative">
        {/* Wrap the cart icon in a Link component to route to the cart page */}
        <Link href="/cart">
          <div className="cursor-pointer">
            <MdOutlineShoppingCart className="text-[#263C5A]" size={35} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                {itemCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
