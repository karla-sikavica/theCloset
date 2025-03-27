// src/components/GoogleLogin.js
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Dohvati ID token
      const token = await user.getIdToken();
      console.log("✅ Google login successful! Token:", token);

      // Slanje tokena backendu
      const res = await fetch("http://localhost:8080/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Backend response:", data);
    } catch (error: any) {
      console.error("❌ Google login error:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}

export default GoogleLogin;
