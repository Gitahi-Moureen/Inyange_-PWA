// import React, { useEffect, useState } from 'react';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState<any[]>([]);

//   useEffect(() => {
//     const storedCartItems = localStorage.getItem('cart');
//     if (storedCartItems) {
//       setCartItems(JSON.parse(storedCartItems));
//     }
//   }, []);

//   const handleQuantityChange = (materialId: string, increment: boolean) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.material_id === materialId
//           ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1) }
//           : item
//       )
//     );
//   };

//   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="container mx-auto p-6">
//       {/* Left Section - Cart Items */}
//       <div className="flex justify-between items-start">
//         <div className="flex-1">
//           <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//           {cartItems.length > 0 ? (
//             <table className="table-auto w-full">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2">Product</th>
//                   <th className="px-4 py-2">Quantity</th>
//                   <th className="px-4 py-2">Total Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.material_id}>
//                     <td className="border px-4 py-2">
//                       <div className="flex items-center space-x-4">
//                         <img
//                           src={item.image || '/images/placeholder.jpg'}
//                           alt={item.material_name}
//                           className="w-16 h-16 object-contain"
//                         />
//                         <div>
//                           <h4 className="text-sm font-bold">{item.material_name}</h4>
//                           <p className="text-sm text-gray-600">{item.description}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="border px-4 py-2 text-center">
//                       <div className="flex items-center justify-center space-x-2">
//                         <button
//                           onClick={() => handleQuantityChange(item.material_id, false)}
//                           className="bg-gray-300 px-2 py-1 rounded"
//                         >
//                           -
//                         </button>
//                         <span>{item.quantity}</span>
//                         <button
//                           onClick={() => handleQuantityChange(item.material_id, true)}
//                           className="bg-gray-300 px-2 py-1 rounded"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td className="border px-4 py-2 text-right">
//                       KES {item.price * item.quantity}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>Your cart is empty.</p>
//           )}
//           <button className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded">
//             Continue Shopping
//           </button>
//         </div>

//         {/* Right Section - Order Summary */}
//         <div className="w-1/3 ml-4 bg-gray-100 p-4 rounded-lg">
//           <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//           <div className="flex flex-col mb-4">
//             <label className="text-sm">Payment Method</label>
//             <input
//               type="text"
//               placeholder="Amount"
//               className="border p-2 mb-2 rounded"
//             />
//             <input
//               type="text"
//               placeholder="Enter Phone Number"
//               className="border p-2 rounded"
//             />
//           </div>
//           <div className="flex justify-between mb-4">
//             <span className="font-bold">Subtotal:</span>
//             <span>KES {totalPrice}</span>
//           </div>
//           <div className="flex justify-between font-bold text-lg mb-6">
//             <span>Total:</span>
//             <span>KES {totalPrice}</span>
//           </div>
//           <button className="bg-yellow-500 text-white px-6 py-2 rounded w-full">
//             Pay Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
import React from "react";
import Image from "next/image";
import { ChevronLeft, ShoppingCart } from "lucide-react";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: "Simba Cement",
      description: "White cement",
      price: 698,
      quantity: 1,
    },
    {
      id: 2,
      name: "Bamburi Cement",
      description: "White cement",
      price: 798,
      quantity: 1,
    },
    {
      id: 3,
      name: "Mombasa Cement",
      description: "White cement",
      price: 798,
      quantity: 1,
    },
  ];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <header className="flex items-center mb-4">
        <ChevronLeft className="text-gray-600" />
        <div className="flex items-center ml-4">
          <Image
            src="/placeholder.png"
            alt="BuildMart Logo"
            width={24}
            height={24}
            className="mr-2"
          />
          <span className="font-bold">BuildMart</span>
        </div>
        <div className="ml-auto relative">
          <ShoppingCart className="text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            3
          </span>
        </div>
      </header>

      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-grow">
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-2">Product</th>
                <th className="text-left pb-2">Quantity</th>
                <th className="text-right pb-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4">
                    <div className="flex items-center">
                      <Image
                        src="/placeholder.png"
                        alt={item.name}
                        width={80}
                        height={80}
                        className="mr-4"
                      />
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center border rounded-md w-24">
                      <button className="px-3 py-1 text-gray-600">-</button>
                      <span className="px-3 py-1 flex-grow text-center">
                        {item.quantity}
                      </span>
                      <button className="px-3 py-1 text-gray-600">+</button>
                    </div>
                  </td>
                  <td className="text-right font-bold">KES {item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded">
            <ChevronLeft className="mr-2" />
            Continue Shopping
          </button>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p className="mb-2">Payment Method</p>
            <input
              type="text"
              placeholder="Amount"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>KES {totalPrice}</span>
            </div>
            <div className="flex justify-between font-bold mb-4">
              <span>Total:</span>
              <span>KES {totalPrice}</span>
            </div>
            <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
