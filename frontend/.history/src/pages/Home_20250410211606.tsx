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
    <HomeButton
      onClick={() => {
        setIsClicked(true);
        navigate("/clothes");
      }}
    >
      <TbHanger />
    </HomeButton>
  );
};

export default Home;
