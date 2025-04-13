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
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className={styles.homeContainer}>
      {!isClicked && (
        <div className={styles.welcomeDiv}>👋 welcome to your closet</div>
      )}

      {isClicked && (
        <div className={styles.contentBox}>
          {/* Tu će se prikazivati sadržaj - kao "outlet" za nested routes */}
          <p>This is where the magic happens ✨</p>
        </div>
      )}

      <div
        className={
          isClicked
            ? styles.navButtonsContainerBottom
            : styles.navButtonsContainerCenter
        }
      >
        <HomeButton
          onClick={() => {
            setIsClicked(true);
            navigate("/clothes");
          }}
        >
          <TbHanger />
        </HomeButton>
        <HomeButton
          onClick={() => {
            setIsClicked(true);
            navigate("/add");
          }}
        >
          <LuPlus />
        </HomeButton>
        <HomeButton
          onClick={() => {
            setIsClicked(true);
            navigate("/profile");
          }}
        >
          <FiUser />
        </HomeButton>
      </div>
    </div>
  );
};

export default Home;
