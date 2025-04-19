import { useEffect, useState } from "react";
import { getAuth, getIdToken } from "firebase/auth";
import { app } from "../firebase";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const auth = getAuth(app);
        const currentUser = auth.currentUser;

        if (currentUser) {
          const idToken = await getIdToken(currentUser);
          const response = await fetch("http://localhost:8080/users/current", {
            method: "GET",
            headers: { Authorization: `Bearer ${idToken}` },
          });
          const data = await response.json();
          setUser(data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  return user;
};
