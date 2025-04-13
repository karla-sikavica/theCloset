import styles from "../css/GoogleButton.module.css";
import googleLogo from "../../../src/images/google-logo.png";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const GoogleButton = ({ onClick, children }: Props) => {
  return (
    <button onClick={onClick} className={styles.googleButton}>
      <img src={googleLogo} alt="Google logo" className={styles.googleLogo} />
      {children}
    </button>
  );
};

export default GoogleButton;
