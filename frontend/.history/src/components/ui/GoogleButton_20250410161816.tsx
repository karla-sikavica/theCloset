import styles from "../css/GoogleButton.module.css";
import googleLogo from "../images/googleLogo.png";
interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const GoogleButton = ({ onClick, children }: Props) => {
  return (
    <button onClick={onClick} className={styles.googleButton}>
      <img src={googleLogo} alt="Google logo" className="google-logo" />
      {children}
    </button>
  );
};

export default GoogleButton;
