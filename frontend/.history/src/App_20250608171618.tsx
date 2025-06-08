import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Collage from "./components/ui/Collage";
import Loading from "./pages/Loading";
import { useLoading } from "./hooks/LoadingContext";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Closet from "./pages/Closet";
import Profile from "./pages/Profile";
import { AuthProvider } from "../src/utils/AuthContext";
import ProtectedRoute from "../src/components/ui/ProtectedRoute";
import Add3 from "./pages/Add";
import Add from "./pages/Add";

function App() {
  const { loading } = useLoading();
  return (
    <AuthProvider>
      <Router>
        {loading && <Loading />}
        <Collage />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="add" element={<Add />} />
              <Route path="closet" element={<Closet />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
