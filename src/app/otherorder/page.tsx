// "use client";
// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useMaterials } from '../hooks/useMaterials';
// import { MaterialData } from '@/app/utils/types';
// import { FiChevronLeft, FiShoppingCart } from 'react-icons/fi';

// const ITEMS_PER_PAGE = 6; // Set the number of items to display per page

// const OtherOrders = () => {
//   const { materials, loading } = useMaterials();
//   const [currentPage, setCurrentPage] = useState(1);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
//       </div>
//     );
//   }

//   // Calculate total pages
//   const totalPages = Math.ceil(materials.length / ITEMS_PER_PAGE);

//   // Get the current items to display
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentMaterials = materials.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <Link href="/" className="text-gray-600">
//                 <FiChevronLeft size={24} />
//               </Link>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8">
//                   <Image 
//                     src="/images/bmLogo.png" 
//                     alt="BuildMart Logo" 
//                     width={32} 
//                     height={32}
//                   />
//                 </div>
//                 <span className="text-xl font-semibold">
//                   Build<span className="text-yellow-500">Mart</span>
//                 </span>
//               </div>
//             </div>
//             <Link href="/cart" className="relative">
//               <FiShoppingCart size={24} />
//               <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                 2
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
//         <h2 className="text-2xl font-semibold mb-8">Would you like to order others?</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//           {currentMaterials.map((material: MaterialData) => (
//             <div key={material.material_id} className="flex gap-6">
//               <div className="w-1/3 aspect-square relative">
//               <Image
//                   src={material.image || '/images/placeholder-image.png'} // Use a fallback
//                   alt={material.material_name}
//                   fill
//                   className="object-contain"
//                   sizes="(max-width: 768px) 33vw, 20vw"
//                 />
//               </div>
//               <div className="flex-1">
//                 <div className="mb-1">
//                   <span className="font-semibold text-lg">KES {material.price}</span>
//                 </div>
//                 <h3 className="font-semibold text-lg mb-1">{material.material_name}</h3>
//                 <p className="text-gray-600 text-sm mb-1">{material.brand_name}</p>
//                 <p className="text-gray-600 text-sm mb-3">{material.location}</p>
//                 <div className="flex gap-4">
//                   <button className="text-sm text-blue-600 underline hover:text-blue-800">
//                     View details
//                   </button>
//                   <button className="bg-white border-2 border-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors duration-300">
//                     Add to cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination Controls */}
//         <div className="mt-8 flex justify-center">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-yellow-500 text-white rounded-lg ml-2 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>

//         {/* Checkout Button */}
//         <div className="mt-8 flex justify-center">
//           <Link 
//             href="/components/Pages"
//             className="bg-yellow-500 text-white px-12 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors"
//           >
//             Checkout
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtherOrders;
"use client"; // Enable client-side rendering

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMaterials } from '../hooks/useMaterials';
import { MaterialData } from '@/app/utils/types';
import { FiChevronLeft, FiShoppingCart } from 'react-icons/fi';

const ITEMS_PER_PAGE = 6; // Set the number of items to display per page

const OtherOrders = () => {
  const { materials, loading } = useMaterials();
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Update local storage whenever cart items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (material) => {
    const existingItem = cartItems.find(item => item.id === material.material_id);
    if (existingItem) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === material.material_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(prevItems => [
        ...prevItems,
        {
          material_id: material.material_id,
          material_name: material.material_name,
          brand_name: material.brand_name,

          price: material.price,
          quantity: 1,
        },
      ]);
    }
    alert(`${material.material_name} has been added to your cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(materials.length / ITEMS_PER_PAGE);

  // Get the current items to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMaterials = materials.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600">
                <FiChevronLeft size={24} />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8">
                  <Image 
                    src="/images/bmLogo.png" 
                    alt="BuildMart Logo" 
                    width={32} 
                    height={32}
                  />
                </div>
                <span className="text-xl font-semibold">
                  Build<span className="text-yellow-500">Mart</span>
                </span>
              </div>
            </div>
            <Link href="/components/Pages" className="relative">
              <FiShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} {/* Display cart count */}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        <h2 className="text-2xl font-semibold mb-8">Would you like to order others?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {currentMaterials.map((material: MaterialData) => (
            <div key={material.material_id} className="flex gap-6">
              <div className="w-1/3 aspect-square relative">
                <Image
                  src={material.image || '/images/placeholder-image.png'} // Use a fallback
                  alt={material.material_name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
              <div className="flex-1">
                <div className="mb-1">
                  <span className="font-semibold text-lg">KES {material.price}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{material.material_name}</h3>
                <p className="text-gray-600 text-sm mb-1">{material.brand_name}</p>
                <p className="text-gray-600 text-sm mb-3">{material.location}</p>
                <div className="flex gap-4">
                  <button className="text-sm text-blue-600 underline hover:text-blue-800">
                    View details
                  </button>
                  <button 
                    onClick={() => handleAddToCart(material)} // Add onClick handler
                    className="bg-white border-2 border-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors duration-300"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg ml-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Checkout Button */}
        <div className="mt-8 flex justify-center">
          <Link 
            href="/components/Pages"
            className="bg-yellow-500 text-white px-12 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtherOrders;
