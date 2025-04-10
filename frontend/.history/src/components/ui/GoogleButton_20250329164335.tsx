import styles from "../css/GoogleButton.module.css";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const GoogleButton = ({ onClick, children }: Props) => {
  return (
    <button onClick={onClick} className={styles.googleButton}>
      <h3>{children}</h3>
    </button>
  );
};

export default GoogleButton;
