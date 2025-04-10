import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Collage from "./components/ui/Collage";
import Loading from "./pages/Loading";
import { useLoading } from "./hooks/LoadingContext";
import Home from "./pages/Home";

function App() {
  const { loading } = useLoading();

  return (
    <Router>
      {loading && <Loading />}
      <Collage />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
