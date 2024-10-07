
"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import Link from 'next/link';
import { MaterialData } from '@/app/utils/types';


interface NavbarProps {
 itemCount: number;
 cart?: MaterialData[]; // Make cartItems optional
 onAddToCart: (item: MaterialData) => void; // Function to handle adding items
}


const Navbar: React.FC<NavbarProps> = ({ itemCount, cart = [], onAddToCart }) => {
 const [storedCartItems, setStoredCartItems] = useState<MaterialData[]>([]); // State to hold cart items


 useEffect(() => {
   // Retrieve cart items from local storage when the component mounts
   const storedItems = localStorage.getItem('cart'); // Use 'cartItems' key
   if (storedItems) {
     try {
       const parsedItems = JSON.parse(storedItems);
       if (Array.isArray(parsedItems)) {
         console.log('Retrieved cart items:', parsedItems); // Log retrieved items
         setStoredCartItems(parsedItems); // Set state with retrieved items
       }
     } catch (error) {
       console.error('Error parsing cart items from local storage:', error);
       localStorage.removeItem('cart'); // Clear invalid data
     }
   }
 }, []);


 // Store cart items in local storage when storedCartItems state changes
 useEffect(() => {
   localStorage.setItem('cart', JSON.stringify(storedCartItems));
 }, [storedCartItems]);


 


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
       <Link href="/components/Pages">
         <span className="cursor-pointer">
           <MdOutlineShoppingCart
             className="text-[#263C5A]"
             size={35}
           />
         </span>
       </Link>
       {itemCount > 0 && (
         <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
           {itemCount}
         </span>
       )}
      
     </div>
   </nav>
 );
};


export default Navbar;
// "use client";
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import { MdOutlineShoppingCart } from 'react-icons/md';
// import Link from 'next/link';
// import { MaterialData } from '@/app/utils/types';

// interface NavbarProps {
//   itemCount: number;
//   cart?: MaterialData[];
//   onAddToCart: (item: MaterialData) => void;
//   materials: MaterialData[]; // Corrected: Define materials type without default value
// }

// // Moved default materials outside of the interface
// const defaultMaterials: MaterialData[] = [
//   { id: 1, material_name: 'Cement',Image: '/images/cement.jpg' },
//   { id: 2, material_name: 'Steel', Image: '/images/steel.jpg' },
//   { id: 3, material_name: 'Timber', Image: '/images/timber.jpg' }
// ];

// const Navbar: React.FC<NavbarProps> = ({ itemCount, cart = [], onAddToCart, materials = defaultMaterials }) => {
//   const [storedCartItems, setStoredCartItems] = useState<MaterialData[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');  // State to hold the search term
//   const [filteredMaterials, setFilteredMaterials] = useState<MaterialData[]>([]);  // State for search results

//   useEffect(() => {
//     const storedItems = localStorage.getItem('cart');
//     if (storedItems) {
//       try {
//         const parsedItems = JSON.parse(storedItems);
//         if (Array.isArray(parsedItems)) {
//           console.log('Retrieved cart items:', parsedItems);
//           setStoredCartItems(parsedItems);
//         }
//       } catch (error) {
//         console.error('Error parsing cart items from local storage:', error);
//         localStorage.removeItem('cart');
//       }
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(storedCartItems));
//   }, [storedCartItems]);

//   // Handle search input change
//   const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);  // Update the search term state
//   };

//   // Handle search button click
//   const handleSearch = () => {
//     if (searchTerm.trim() === '') {
//       setFilteredMaterials([]);  // Reset search results if search term is empty
//       return;
//     }

//     if (!materials || materials.length === 0) {
//       console.warn('No materials available for filtering.');
//       return;
//     }

//     const results = materials.filter((material) =>
//       material.material_name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredMaterials(results);  // Update the state with search results
//   };

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
//           value={searchTerm}  // Bind input value to searchTerm state
//           onChange={handleSearchInputChange}  // Update search term on input change
//           placeholder="What are you looking for?"
//           className="bg-transparent focus:outline-none px-4 py-2 w-full text-black"
//         />
//         <button
//           onClick={handleSearch}  // Trigger search on button click
//           className="bg-[#F8B612] px-8 sm:px-8 py-2 text-white font-semibold rounded-full"
//         >
//           Search
//         </button>
//       </div>

//       <div className="relative">
//         <Link href="/components/Pages">
//           <span className="cursor-pointer">
//             <MdOutlineShoppingCart className="text-[#263C5A]" size={35} />
//           </span>
//         </Link>
//         {itemCount > 0 && (
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
//             {itemCount}
//           </span>
//         )}
//       </div>

//       {/* Display search results (Optional, depends on your UI requirement) */}
//       {filteredMaterials.length > 0 && (
//         <div className="absolute top-16 bg-white w-full max-w-md rounded-lg shadow-lg">
//           {filteredMaterials.map((material) => (
//             <div key={material.material_id} className="p-2 border-b border-gray-200">
//               <p>{material.material_name}</p>
//               <button onClick={() => onAddToCart(material)} className="mt-2 bg-[#F8B612] text-white rounded-full px-4 py-1">
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

