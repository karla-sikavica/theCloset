import { useNavigate } from "react-router-dom";
import HomeButton from "../components/ui/HomeButton";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="homeContainer">
      <HomeButton onClick={Navigate()}>+</HomeButton>
    </div>
  );
};

export default Home;
