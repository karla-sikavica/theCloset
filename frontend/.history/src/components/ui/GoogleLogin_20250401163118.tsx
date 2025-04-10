// src/components/GoogleLogin.js
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import GoogleButton from "./GoogleButton";

function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();
      console.log("✅ Google login successful! Token:", token);

      const res = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // može biti prazno jer info dolazi iz tokena
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Backend error: ${res.status} – ${text}`);
      }

      const data = await res.json();
      console.log("Backend response:", data);
    } catch (error: any) {
      console.error("❌ Google login error:", error.message);
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
