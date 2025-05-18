import GoogleLogin from "../components/ui/GoogleLogin";
import styles from "./css/Login.module.css";

function Login() {
  return (
    <>
      <div className={styles.loginContainer}>
        <img
          src="images/logo.svg"
          alt="logo.img"
          className={styles.loginLogo}
        />

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
