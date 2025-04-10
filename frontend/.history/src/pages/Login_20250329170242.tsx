import GoogleLogin from "../components/ui/GoogleLogin";
import styles from "../css/Login.module.css"; // Import CSS module

function Login() {
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>the closet</h1>
      <h2 className={styles.loginSubtitle}>Login</h2>
      <div className={styles.googleLoginContainer}>
        <GoogleLogin />
      </div>
    </div>
  );
}

export default Login;
