import { useNavigate } from "react-router-dom";
import HomeButton from "../components/ui/HomeButton";
import { LuPlus } from "react-icons/lu";
import { TbHanger } from "react-icons/tb";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="homeContainer">
      <HomeButton onClick={() => navigate("/home")}>
        <LuPlus />
      </HomeButton>
      <HomeButton onClick={() => navigate("/home")}>
        <TbHanger />
      </HomeButton>
      <HomeButton onClick={() => navigate("/home")}>+</HomeButton>
    </div>
  );
};

export default Home;
