// src/layouts/AppLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { TbHanger } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import HomeButton from "../components/ui/HomeButton";
import styles from "./Home.module.css";

const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentFrame}>
        <Outlet />
      </div>
      <div className={styles.navButtonsContainer}>
        <HomeButton onClick={() => navigate("/closet")}>
          <TbHanger />
        </HomeButton>
        <HomeButton onClick={() => navigate("/add")}>
          <LuPlus />
        </HomeButton>
        <HomeButton onClick={() => navigate("/profile")}>
          <FiUser />
        </HomeButton>
      </div>
    </div>
  );
};

export default AppLayout;
