import { useNavigate } from "react-router-dom";
import HomeButton from "../components/ui/HomeButton";
import { LuPlus } from "react-icons/lu";
import { TbHanger } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import styles from "./css/Home.module.css";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState(true);
  return (
    <div className={styles.homeContainer}>
      {welcome && (
        <>
          <div className={styles.welcomeDiv}>welcome to your closet</div>
        </>
      )}
      <div className={styles.navButtonsContainer}>
        <HomeButton
          onClick={() => {
            navigate("/home");
            setWelcome(true);
          }}
        >
          <TbHanger />
        </HomeButton>
        <HomeButton
          onClick={() => {
            navigate("/home");
            setWelcome(true);
          }}
        >
          <LuPlus />
        </HomeButton>
        <HomeButton
          onClick={() => {
            navigate("/home");
            setWelcome(true);
          }}
        >
          <FiUser />
        </HomeButton>
      </div>
    </div>
  );
};

export default Home;
