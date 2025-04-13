import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "../types";
// Firebase modular imports
import { getAuth, getIdToken } from "firebase/auth";
import { app } from "../firebase";

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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const auth = getAuth(app); // Get Firebase Auth instance
        const currentUser = auth.currentUser;

        if (currentUser) {
          // Get the ID token of the currently logged-in user
          const idToken = await getIdToken(currentUser);
          if (idToken) {
            // Make the API call to get the current user
            const response = await fetch(
              "http://localhost:8080/users/current",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${idToken}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to fetch current user");
            }

            const data = await response.json();
            setUser(data); // Set the user data in context
          }
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser(); // Call the function to fetch the current user on mount
  }, []); // Empty dependency array means it runs once when the component mounts

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
