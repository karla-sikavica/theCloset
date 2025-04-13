import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";
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
