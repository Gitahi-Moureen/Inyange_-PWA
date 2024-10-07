

"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { usePayment } from "@/app/hooks/payment";
import Link from "next/link";
import { MaterialData } from "@/app/utils/types";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<MaterialData[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { processPayment, isSubmitting, errorMessage, successMessage } = usePayment();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const items = localStorage.getItem('cart');
    if (items) {
      try {
        const parsedItems = JSON.parse(items);
        setCartItems(parsedItems); // Safely parse and set cart items
      } catch (error) {
        console.error('Error parsing cart items:', error); // Handle parsing errors
      }
    }
  }, []);

  const handleQuantityChange = (id: number, increment: boolean) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.material_id === id
          ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    // Call the payment processing function with the total price and phone number
    await processPayment(totalPrice.toString(), phoneNumber);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 sm:px-8 lg:px-12">
      <header className="flex items-center mb-8">
      <Link href="/components/Steel">
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
                <ChevronLeft size={24} />
            </button>
        </Link>
        <div className="flex items-center ml-4">
          <img
            src="/images/bmLogo.png"
            alt="BuildMart Logo"
            className="w-40"
          />
          <span className="font-bold text-2xl text-blue-900"></span>
        </div>
        <div className="ml-auto relative">
          <ShoppingCart className="text-gray-600" size={24} />
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>
      </header>

      <main className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 lg:p-12">
          <h1 className="text-3xl font-bold mb-8 text-blue-900">Shopping Cart</h1>

          <div className="flex flex-col xl:flex-row gap-12">
            <div className="flex-grow">
              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-4 text-gray-600 font-semibold">Product</th>
                    <th className="text-left pb-4 text-gray-600 font-semibold">Quantity</th>
                    <th className="text-right pb-4 text-gray-600 font-semibold">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.material_id} className="border-b border-gray-200">
                      <td className="py-6">
                        <div className="flex items-center">
                          {/* <img
                            src={item.image} // Ensure you have an image property in your MaterialData
                            alt={item.material_name}
                            className="w-24 h-24 object-cover mr-6 rounded-md shadow-sm"
                          /> */}
                          <div>
                            <p className="font-bold text-xl text-blue-900">{item.material_name}</p>
                            <p className="text-md text-gray-600 mt-1">
                              Brand: {item.brand_name} {/* Ensure brand_name exists in your MaterialData */}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center border rounded-md w-36 shadow-sm">
                          <button 
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                            onClick={() => handleQuantityChange(item.material_id, false)}
                          >
                            <Minus size={18} />
                          </button>
                          <span className="px-4 py-2 flex-grow text-center font-semibold text-lg">
                            {item.quantity}
                          </span>
                          <button 
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                            onClick={() => handleQuantityChange(item.material_id, true)}
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </td>
                      <td className="text-right font-bold text-xl text-blue-900">KES {item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/otherorder">
                <button className="flex items-center bg-yellow-500 text-blue-900 font-bold px-8 py-4 rounded-lg shadow-md hover:bg-yellow-400 transition-colors text-lg">
                  <ChevronLeft className="mr-2" size={24} />
                  Continue Shopping
                </button>
              </Link>
            </div>

            <div className="w-full xl:w-1/3">
              <div className="bg-blue-900 p-8 rounded-xl text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <p className="mb-3 font-semibold">Payment Method</p>
                <input
                  type="text"
                  placeholder="Amount"
                  className="w-full p-4 mb-4 border rounded-lg bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  value={totalPrice}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="w-full p-4 mb-6 border rounded-lg bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <div className="flex justify-between mb-4 text-xl">
                  <span>Subtotal:</span>
                  <span>KES {totalPrice}</span>
                </div>
                <div className="flex justify-between font-bold mb-8 text-2xl">
                  <span>Total:</span>
                  <span>KES {totalPrice}</span>
                </div>
                
                <button 
                  className="w-full bg-yellow-500 text-blue-900 font-bold px-6 py-4 rounded-lg shadow-md hover:bg-yellow-400 transition-colors text-xl"
                  onClick={handlePayment} // Trigger payment on click
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? 'Processing...' : 'Pay Now'}
                </button>
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;



