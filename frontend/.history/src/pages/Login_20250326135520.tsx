// src/components/Login.tsx
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import EmailLogin from "../components/ui/EmailLogin";
import GoogleLogin from "../components/ui/GoogleLogin";

function Login() {
  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ fontSize: 100 }}>Login</h2>

      <EmailLogin></EmailLogin>

      <hr />
      <p style={{ fontSize: 50, textAlign: "center" }}>or</p>

      <div style={{ textAlign: "center" }}>
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
}

export default Login;
