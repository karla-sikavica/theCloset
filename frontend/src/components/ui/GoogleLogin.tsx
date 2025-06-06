// src/components/GoogleLogin.js
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import GoogleButton from "./GoogleButton";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();
      console.log("google login successful, token:", token);

      const res = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`backend error: ${res.status} – ${text}`);
      }

      const data = await res.json();
      console.log("backend response:", data);
      navigate("/home");
    } catch (error: any) {
      console.error("google login error:", error.message);
    }
  };

  return (
    <div>
      <GoogleButton onClick={handleGoogleLogin}>
        Sign in with Google
      </GoogleButton>{" "}
    </div>
  );
}

export default GoogleLogin;
