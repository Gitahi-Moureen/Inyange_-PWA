export interface MaterialData {
    material_id: number;
    material_name: string;
    brand_name: String;
    category_name: string;
    description: string;
    quantity: number;
    price: number;
    image: File | null;
    category: string; 
  }

  export interface Credentials{
    email:String;
    password:String;
}

// src/app/utils/types.ts
export interface CartItem {
  id: number;         // Unique identifier for the item
  name: string;       // Name of the item
  price: number;      // Price of the item
  quantity: number;   // Quantity of the item in the cart
}

