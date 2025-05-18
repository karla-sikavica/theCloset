/* import { useNavigate } from "react-router-dom";
import HomeButton from "../components/ui/HomeButton";
import { LuPlus } from "react-icons/lu";
import { TbHanger } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import styles from "./css/Home.module.css";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [first, setFirst] = useState(true);

  return (
    <div className={styles.homeContainer}>
      <img
        src="../../../public/images/Closet--logo.svg"
        alt="logo.img"
        className={styles.logoImg}
      />

      <div className={styles.welcomeDiv}>welcome to your closet</div>
      <div className={styles.navButtonsContainer}>
        <HomeButton
          onClick={() => {
            navigate("/closet");
          }}
        >
          <TbHanger />
        </HomeButton>
        <HomeButton
          onClick={() => {
            navigate("/add");
          }}
        >
          <LuPlus />
        </HomeButton>
        <HomeButton
          onClick={() => {
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
 */

import { useNavigate } from "react-router-dom";
import HomeButton from "../components/ui/HomeButton";
import { LuPlus } from "react-icons/lu";
import { TbHanger } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import styles from "./css/Home.module.css";
import { useState } from "react";

type ButtonKey = "closet" | "add" | "profile";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<ButtonKey | null>(null);

  const buttonLabels: Record<ButtonKey, string> = {
    closet: "here you can see all your clothes and created outfits",
    add: "here you can add a new clothing item or an outfit to your closet",
    profile: "here you can see your statistics such as your most worn items ",
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.contentContainer}></div>
      <img
        src="/images/Closet--logo.svg"
        alt="logo.img"
        className={styles.logoImg}
      />

      <div className={styles.welcomeDiv}>welcome to your closet</div>

      <div className={styles.navButtonsContainer}>
        <HomeButton
          onClick={() => navigate("/closet")}
          onMouseEnter={() => setHoveredButton("closet")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <TbHanger />
        </HomeButton>

        <HomeButton
          onClick={() => navigate("/add")}
          onMouseEnter={() => setHoveredButton("add")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <LuPlus />
        </HomeButton>

        <HomeButton
          onClick={() => navigate("/profile")}
          onMouseEnter={() => setHoveredButton("profile")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <FiUser />
        </HomeButton>
      </div>

      {hoveredButton && (
        <div className={styles.hoverText}>{buttonLabels[hoveredButton]}</div>
      )}
    </div>
  );
};

export default Home;
