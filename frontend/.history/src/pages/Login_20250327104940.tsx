import GoogleLogin from "../components/ui/GoogleLogin";

function Login() {
  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h1 style={{ fontSize: 200 }}>the closet</h1>
      <h2 style={{ fontSize: 60 }}>Login</h2>
      <div style={{ textAlign: "center" }}>
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
}

export default Login;
