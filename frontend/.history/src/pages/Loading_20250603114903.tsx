import styles from "../pages/css/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className="loading">loading ...</div>
    </div>
  );
};

export default Loading;
