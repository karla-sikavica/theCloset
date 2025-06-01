import Decimal from "decimal.js"; // If you are using BigDecimal, ensure you have the correct library.
export interface Category {
  id: number;
  name: string;
}
export interface Subcategory {
  id: number;
  name: string;
}
export interface Color {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface ClothingItem {
  id: number;
  name: string;
  material: string;
  size: string;
  brand: string;
  gift: boolean;
  price: Decimal;
  noOfWears: number;
  dateAcquired: string; // Use ISO 8601 format for date (e.g., "2025-04-12")
  season: string;
  imageUrl: string;
  user: User; // A reference to the User object
  category: string | null; // Assuming you have a Category interface
  subcategory?: Subcategory; // Optional, because it could be null
  colors: string[]; // Assuming you have a Color interface
  outfits: Outfit[]; // An array of Outfit objects
}

export interface Outfit {
  id: number;
  imageUrl: string;
  user: User; // A reference to the User object
  tags: Tag[]; // Assuming you have a Tag interface
  clothingItems: ClothingItem[]; // An array of ClothingItem objects
}

export interface User {
  id: number;
  uid: string;
  name: string;
  email: string;
  outfits: Outfit[];
  clothingItems: ClothingItem[];
}