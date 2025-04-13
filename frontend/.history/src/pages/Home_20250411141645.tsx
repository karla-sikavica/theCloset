import { useNavigate } from "react-router-dom";
import HomeButton from "../components/ui/HomeButton";
import { LuPlus } from "react-icons/lu";
import { TbHanger } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import styles from "./css/Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
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
