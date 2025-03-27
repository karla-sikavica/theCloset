import GoogleLogin from "../components/ui/GoogleLogin";

function Login() {
  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ fontSize: 100 }}>Login</h2>
      <div style={{ textAlign: "center" }}>
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
}

export default Login;
