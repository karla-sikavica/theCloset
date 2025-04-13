import React, { createContext, useContext, useState, ReactNode } from "react";
import { BigDecimal } from "some-bigdecimal-library"; // If you are using BigDecimal, ensure you have the correct library.
interface Category {
  id: number;
  name: string;
}
interface Subategory {
  id: number;
  name: string;
}
interface Color {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface ClothingItem {
  id: number;
  name: string;
  material: string;
  size: string;
  brand: string;
  gift: boolean;
  price: BigDecimal;
  noOfWears: number;
  dateAcquired: string; // Use ISO 8601 format for date (e.g., "2025-04-12")
  season: string;
  imageUrl: string;
  user: User; // A reference to the User object
  category: Category; // Assuming you have a Category interface
  subcategory?: Subcategory; // Optional, because it could be null
  colors: Color[]; // Assuming you have a Color interface
  outfits: Outfit[]; // An array of Outfit objects
}

interface Outfit {
  id: number;
  imageUrl: string;
  user: User; // A reference to the User object
  tags: Tag[]; // Assuming you have a Tag interface
  clothingItems: ClothingItem[]; // An array of ClothingItem objects
}

interface User {
  id: number;
  uid: string;
  name: string;
  email: string;
  outfits: Outfit[];
  clothingItems: ClothingItem[];
}

// Define the context's value type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void; // Function to update the user
}

// Create the context with default value as null (no user initially)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the provider component that will wrap your app
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Initialize user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext in any component
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
