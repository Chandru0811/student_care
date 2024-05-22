import {  useEffect, useState } from "react";
import Admin from "./layouts/Admin";
import "./styles/admin.css";
import "./styles/custom.css";
import Auth from "./layouts/Auth";
// import { useNavigate } from "react-router-dom";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();
  const handleLogin = () => {
    sessionStorage.setItem("isAuthenticated", true);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // navigate("/")
    sessionStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    const isAuthenticatedFromStorage =
      sessionStorage.getItem("isAuthenticated");
    if (isAuthenticatedFromStorage === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <div>
      {isAuthenticated ? (
        <Admin handleLogout={handleLogout} />
      ) : (
        <Auth handleLogin={handleLogin} />
      )}
      </div>
    </div>
  );
}

export default App;
