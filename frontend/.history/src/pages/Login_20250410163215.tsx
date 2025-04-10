import GoogleLogin from "../components/ui/GoogleLogin";
import styles from "./css/Login.module.css";

function Login() {
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>closet</h1>
      <h2 className={styles.loginSubtitle}>
        <br />
        To see your closet, please sign in with Google.
      </h2>
      <div className={styles.googleLoginContainer}>
        <GoogleLogin />
      </div>
    </div>
  );
}

export default Login;
