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
      <div className="navButtonsContainer">
        <HomeButton onClick={() => navigate("/home")}>
          <TbHanger />
        </HomeButton>
        <HomeButton onClick={() => navigate("/home")}>
          <LuPlus />
        </HomeButton>
        <HomeButton onClick={() => navigate("/home")}>
          <FiUser />
        </HomeButton>
      </div>
    </div>
  );
};

export default Home;
