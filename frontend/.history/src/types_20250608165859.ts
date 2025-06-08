import Decimal from "decimal.js";
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
  dateAcquired: string;
  season: string;
  imageUrl: string;
  user: User;
  category: string | null;
  subcategory?: Subcategory;
  colors: string[];
  outfits: Outfit[];
}

export interface Outfit {
  id: number;
  imageUrl: string;
  user: User;
  tags: Tag[];
  clothingItems: ClothingItem[];
}

export interface User {
  id: number;
  uid: string;
  name: string;
  email: string;
  outfits: Outfit[];
  clothingItems: ClothingItem[];
}