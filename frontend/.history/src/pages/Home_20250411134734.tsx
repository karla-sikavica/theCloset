import { useNavigate } from "react-router-dom";
import HomeButton from "../components/ui/HomeButton";
import { LuPlus } from "react-icons/lu";
import { TbHanger } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import styles from "./css/Home.module.css";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className={styles.homeContainer}>
      {!isClicked && (
        <div className={styles.welcomeDiv}>welcome to your closet</div>
      )}

      {isClicked && (
        <div className={styles.contentBox}>
          <p>This is where the magic happens</p>
        </div>
      )}

      <div
        className={
          isClicked
            ? styles.navButtonsContainerBottom
            : styles.navButtonsContainerCenter
        }
      >
        {/*         <div className={styles.navButtonsContainer}>
         */}{" "}
        <HomeButton
          onClick={() => {
            setIsClicked(true);
            navigate("/home");
          }}
        >
          <TbHanger />
        </HomeButton>
        <HomeButton
          onClick={() => {
            setIsClicked(true);
            navigate("/home");
          }}
        >
          <LuPlus />
        </HomeButton>
        <HomeButton
          onClick={() => {
            setIsClicked(true);
            navigate("/home");
          }}
        >
          <FiUser />
        </HomeButton>
        {/*         </div>
         */}{" "}
      </div>
    </div>
  );
};

export default Home;
