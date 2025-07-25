import GoogleLogin from "../components/ui/GoogleLogin";
import styles from "./css/Login.module.css";

function Login() {
  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginTitle}>
          <img src="../../../public/images/logo.svg" alt="logo.img" />
        </div>
        <div className={styles.loginSubtitle}>
          To see your closet, please sign in with Google.
        </div>
        <div className={styles.googleLoginContainer}>
          <GoogleLogin />
        </div>
      </div>
    </>
  );
}

export default Login;
