import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Collage from "./components/ui/Collage";
import Loading from "./pages/Loading";
import { useLoading } from "./hooks/LoadingContext";
import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import Add from "./pages/Add";
import Closet from "./pages/Closet";
import Profile from "./pages/Profile";

function App() {
  const { loading } = useLoading();

  return (
    <Router>
      {loading && <Loading />}
      <Collage />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="/" element={<AppLayout />}>
            <Route path="add" element={<Add />} />
            <Route path="closet" element={<Closet />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
