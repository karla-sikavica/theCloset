// src/components/Login.tsx
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Email/Password Login
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <button type="submit" style={{ marginBottom: "20px" }}>
          Login with Email
        </button>
      </form>

      {/* OR Separator */}
      <hr />
      <p style={{ fontSize: 100, textAlign: "center" }}>or</p>

      {/* Google Login */}
      <div style={{ textAlign: "center" }}>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </div>
  );
}

export default Login;
