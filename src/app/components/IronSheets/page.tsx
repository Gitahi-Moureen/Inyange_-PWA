// "use client";

// import React, { useEffect, useState } from 'react';
// import { useMaterials } from '../../hooks/useMaterials';
// import { MaterialData } from '@/app/utils/types';
// import Sidebar from '@/app/components/Sidebar'; 
// import Layout from '../Layout'; 

// const Sheet = () => {
//   const { materials, loading } = useMaterials(); 
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
//   const [filteredMaterials, setFilteredMaterials] = useState<MaterialData[]>([]);

  
//   useEffect(() => {
//     console.log('Materials:', materials); 
//     console.log('Selected Category:', selectedCategory); 
//     if (selectedCategory) {
//       const filtered = materials.filter(
//         (material) => material.category_name.toLowerCase() === selectedCategory.toLowerCase()
//       );
//       console.log('Filtered Materials:', filtered); 
//       setFilteredMaterials(filtered);
//     } else {
//       setFilteredMaterials(materials);
//     }
//   }, [selectedCategory, materials]);

//   const handleCategorySelect = (category: string) => {
//     console.log('Category Selected:', category); 
//     setSelectedCategory(category);
//   };

//   const placeholderImage = '/images/sheets.jpg'; 

//   return (
//     <Layout>
//       <div className="flex flex-row min-h-screen bg-gray-100">
    
//         <Sidebar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />

    
//         <div className="flex-1 p-4 sm:p-6 ml-72 pt-24 mt-24 overflow-auto">
//           {loading ? (
//             <p className="text-center">Loading...</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {filteredMaterials.map((material: MaterialData) => (
//                 <div
//                   key={material.material_id} 
//                   className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
//                 >
//                   <img
//                     src={material.image || placeholderImage}
//                     alt={material.material_name} 
//                     className="w-full h-32 sm:h-40 object-contain mb-4"
//                   />
//                   <h4 className="font-semibold text-md text-gray-900 mb-1">KES {material.price}</h4>
//                   <h4 className="text-gray-800 text-base font-bold mb-1">{material.material_name}</h4>
//                   <p className="text-gray-600 text-sm mb-1">{material.brand_name}</p>
//                   <p className="text-gray-500 text-sm mb-1">{material.description}</p>
//                   <button className="mt-4 w-full sm:w-[150px] font-bold border border-[#F8B612] text-black py-2 rounded-lg sm:rounded-2xl hover:bg-[#F8B612] hover:text-white transition-colors duration-300">
//                     Add to cart
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Sheet;

// "use client"; // Enable client-side rendering

// import React, { useEffect, useState } from 'react';
// import { useMaterials } from '../../hooks/useMaterials';
// import { MaterialData } from '@/app/utils/types';
// import Sidebar from '@/app/components/Sidebar'; 
// import Layout from '../Layout'; 

// const Sheet = () => {
//   const { materials, loading } = useMaterials(); 
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
//   const [filteredMaterials, setFilteredMaterials] = useState<MaterialData[]>([]);

//   // Load cart items from local storage
//   const getCartItems = () => {
//     const cartItems = localStorage.getItem('cart');
//     return cartItems ? JSON.parse(cartItems) : [];
//   };

//   const [cartItems, setCartItems] = useState<any[]>(getCartItems());

//   // Update local storage whenever cart items change
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   useEffect(() => {
//     if (selectedCategory) {
//       const filtered = materials.filter(
//         (material) => material.category_name.toLowerCase() === selectedCategory.toLowerCase()
//       );
//       setFilteredMaterials(filtered);
//     } else {
//       setFilteredMaterials(materials);
//     }
//   }, [selectedCategory, materials]);

//   const handleCategorySelect = (category: string) => {
//     setSelectedCategory(category);
//   };

//   const handleAddToCart = (material: MaterialData) => {
//     const existingItem = cartItems.find((item) => item.material_id === material.material_id);
//     if (existingItem) {
//       setCartItems((prevItems) =>
//         prevItems.map((item) =>
//           item.material_id === material.material_id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCartItems((prevItems) => [...prevItems, { ...material, quantity: 1 }]);
//     }
//     alert(`${material.material_name} has been added to your cart!`);
//   };

//   const placeholderImage = '/images/sheets.jpg'; 

//   return (
//     <Layout>
//       <div className="flex flex-row min-h-screen bg-gray-100">
//         <Sidebar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />

//         <div className="flex-1 p-4 sm:p-6 ml-72 pt-24 mt-24 overflow-auto">
//           {loading ? (
//             <p className="text-center">Loading...</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {filteredMaterials.map((material: MaterialData) => (
//                 <div
//                   key={material.material_id} 
//                   className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
//                 >
//                   <img
//                     src={material.image || placeholderImage}
//                     alt={material.material_name} 
//                     className="w-full h-32 sm:h-40 object-contain mb-4"
//                   />
//                   <h4 className="font-semibold text-md text-gray-900 mb-1">KES {material.price}</h4>
//                   <h4 className="text-gray-800 text-base font-bold mb-1">{material.material_name}</h4>
//                   <p className="text-gray-600 text-sm mb-1">{material.brand_name}</p>
//                   <p className="text-gray-500 text-sm mb-1">{material.description}</p>
//                   <button
//                     onClick={() => handleAddToCart(material)} // Add item to cart on click
//                     className="mt-4 w-full sm:w-[150px] font-bold border border-[#F8B612] text-black py-2 rounded-lg sm:rounded-2xl hover:bg-[#F8B612] hover:text-white transition-colors duration-300"
//                   >
//                     Add to cart
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Sheet;



"use client"; // Enable client-side rendering

import React, { useEffect, useState } from 'react';
import { useMaterials } from '../../hooks/useMaterials';
import { MaterialData } from '@/app/utils/types';
import Sidebar from '@/app/components/Sidebar'; 
import Layout from '../Layout'; 
import Navbar from '@/app/components/Navbar'; // Import Navbar
import Image from 'next/image';
const Sheet = () => {
  const { materials, loading } = useMaterials(); 
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialData[]>([]);

  const getCartItems = () => {
    const cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : [];
  };

  const [cartItems, setCartItems] = useState<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[]>(getCartItems()); // Specify the type directly here

  // Update local storage whenever cart items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = materials.filter(
        (material) => material.category_name.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredMaterials(filtered);
    } else {
      setFilteredMaterials(materials);
    }
  }, [selectedCategory, materials]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (material: MaterialData) => {
    const existingItem = cartItems.find((item) => item.id === material.material_id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === material.material_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { id: material.material_id, name: material.material_name, price: material.price, quantity: 1 }]);
    }
    alert(`${material.material_name} has been added to your cart!`);
  };

  const placeholderImage = '/images/sheets.jpg';

  return (
    <Layout>
      <Navbar itemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} /> {/* Pass cart item count to Navbar */}
      <div className="flex flex-row min-h-screen bg-gray-100">
        <Sidebar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />

        <div className="flex-1 p-4 sm:p-6 ml-72 pt-24 mt-24 overflow-auto">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredMaterials.map((material: MaterialData) => (
                <div
                  key={material.material_id} 
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
                >
                  <Image
                    src={material.image || placeholderImage}
                    alt={material.material_name} 
                    className="w-full h-32 sm:h-40 object-contain mb-4"
                  />
                  <h4 className="font-semibold text-md text-gray-900 mb-1">KES {material.price}</h4>
                  <h4 className="text-gray-800 text-base font-bold mb-1">{material.material_name}</h4>
                  <p className="text-gray-600 text-sm mb-1">{material.brand_name}</p>
                  <p className="text-gray-500 text-sm mb-1">{material.description}</p>
                  <button
                    onClick={() => handleAddToCart(material)} // Add item to cart on click
                    className="mt-4 w-full sm:w-[150px] font-bold border border-[#F8B612] text-black py-2 rounded-lg sm:rounded-2xl hover:bg-[#F8B612] hover:text-white transition-colors duration-300"
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Sheet;

