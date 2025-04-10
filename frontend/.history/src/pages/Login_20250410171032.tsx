import { useState } from "react";
import GoogleLogin from "../components/ui/GoogleLogin";
import styles from "./css/Login.module.css";
import Loading from "./Loading";

function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginTitle}>closet</div>
        <div className={styles.loginSubtitle}>
          To see your closet, please sign in with Google.
        </div>
        <div className={styles.googleLoginContainer}>
          <GoogleLogin setLoading={setLoading} />
        </div>
      </div>
    </>
  );
}

export default Login;
