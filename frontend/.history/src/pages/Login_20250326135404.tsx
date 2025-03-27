// src/components/Login.tsx
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import EmailLogin from "../components/ui/EmailLogin";
import GoogleLogin from "../components/ui/GoogleLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = await user.getIdToken();
      console.log("✅ Email login successful! Token:", token);

      const res = await fetch("http://localhost:8080/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Backend response:", data);
    } catch (error: any) {
      console.error("❌ Email login error:", error.message);
    }
  };

  // 🔐 Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();
      console.log("✅ Google login successful! Token:", token);

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
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ fontSize: 100 }}>Login</h2>

      {/* Email/Password Login Form */}
      <form onSubmit={handleEmailLogin}>
        <EmailLogin></EmailLogin>
      </form>

      {/* OR Separator */}
      <hr />
      <p style={{ fontSize: 50, textAlign: "center" }}>or</p>

      {/* Google Login */}
      <div style={{ textAlign: "center" }}>
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
}

export default Login;
