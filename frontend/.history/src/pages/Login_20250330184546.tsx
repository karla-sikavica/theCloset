import GoogleLogin from "../components/ui/GoogleLogin";
import styles from "./css/Login.module.css";

function Login() {
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>The Closet</h1>
      <h2 className={styles.loginSubtitle}>
        Please log in with your Google account
      </h2>
      <div className={styles.googleLoginContainer}>
        <GoogleLogin />
      </div>
    </div>
  );
}

export default Login;
