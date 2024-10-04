"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 

const Sidebar = ({ onCategorySelect, selectedCategory }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const router = useRouter(); 

  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const handleCategoryClick = (material) => {
    onCategorySelect(material); 


    switch (material) {
      case 'Steel':
        router.push('/components/Steel');
        break;
      case 'Wood':
        router.push('/components/Wood'); 
        break;
      case 'Iron Sheets':
        router.push('/components/IronSheets'); 
        break;
      case 'Cement':
        router.push('/components/Cement'); 
        break;
      case 'Paint':
        router.push('/components/Paint'); 
        break;
      case 'Tiles':
        router.push('/components/Tiles'); 
        break;
      case 'Carpentry':
        router.push('/components/Carpentry'); 
        break;
    }
  };

  return (
    <aside 
      className="w-full sm:w-72 p-4 bg-white shadow-md fixed top-[125px] left-0 h-[calc(100vh-64px)] overflow-y-auto z-50"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-900">All Categories</h3>
      <ul className="space-y-3">
      
        <li>
          <div 
            className="flex justify-between items-center cursor-pointer px-4 py-2"
            onClick={() => toggleCategory('Building Materials')}
          >
            <span className="font-semibold">Building Materials</span>
            <span>{expandedCategory === 'Building Materials' ? '-' : '+'}</span>
          </div>
          {expandedCategory === 'Building Materials' && (
            <ul className="pl-6 mt-2 space-y-2">
              {['Steel', 'Wood', 'Iron Sheets', 'Cement'].map((material) => (
                <li
                  key={material}
                  className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
                    selectedCategory === material
                      ? 'bg-[#F8B612] text-white font-semibold'
                      : 'hover:bg-[#F8B612] hover:text-white text-black'
                  }`}
                  onClick={() => handleCategoryClick(material)}
                >
                  {material}
                </li>
              ))}
            </ul>
          )}
        </li>
       
        <li>
          <div 
            className="flex justify-between items-center cursor-pointer px-4 py-2"
            onClick={() => toggleCategory('Finishing Materials')}
          >
            <span className="font-semibold">Finishing Materials</span>
            <span>{expandedCategory === 'Finishing Materials' ? '-' : '+'}</span>
          </div>
          {expandedCategory === 'Finishing Materials' && (
            <ul className="pl-6 mt-2 space-y-2">
              {['Paint', 'Tiles'].map((material) => (
                <li
                  key={material}
                  className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
                    selectedCategory === material
                      ? 'bg-[#F8B612] text-white font-semibold'
                      : 'hover:bg-[#F8B612] hover:text-white text-black'
                  }`}
                  onClick={() => handleCategoryClick(material)} 
                >
                  {material}
                </li>
              ))}
            </ul>
          )}
        </li>
      
        <li>
          <div 
            className="flex justify-between items-center cursor-pointer px-4 py-2"
            onClick={() => toggleCategory('Hardware and Tools')}
          >
            <span className="font-semibold">Hardware and Tools</span>
            <span>{expandedCategory === 'Hardware and Tools' ? '-' : '+'}</span>
          </div>
          {expandedCategory === 'Hardware and Tools' && (
            <ul className="pl-6 mt-2 space-y-2">
              {['Carpentry'].map((material) => (
                <li
                  key={material}
                  className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
                    selectedCategory === material
                      ? 'bg-[#F8B612] text-white font-semibold'
                      : 'hover:bg-[#F8B612] hover:text-white text-black'
                  }`}
                  onClick={() => handleCategoryClick(material)} 
                >
                  {material}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
