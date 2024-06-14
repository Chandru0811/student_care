import {  useEffect, useState } from "react";
import Admin from "./layouts/Admin";
import "./styles/admin.css";
import "./styles/custom.css";
import Auth from "./layouts/Auth";
import toast from "react-hot-toast";
import api from "./config/URL";
import { updateScreens } from "./config/ScreenFilter";
import { FiAlertTriangle } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();

  const handleLogin = async (id) => {
    setIsLoading(true);
    setIsAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", true);
    try {
      if (id) {
        const response = await api.get(`/getAllRoleInfoById/${id}`);
        const rolePermissions = response.data;
        sessionStorage.setItem("screens", JSON.stringify(rolePermissions));

        // Delay the execution by 2 seconds
        sessionStorage.setItem("isAuthenticated", true);
        setIsAuthenticated(true);
      } else {
        setIsLoading(false);
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("screens");
    sessionStorage.removeItem("roleId");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("loginUserId");
    sessionStorage.removeItem("studentCareId");
  };

  useEffect(() => {

    const isAdminFromStorage = sessionStorage.getItem("isAuthenticated");

    const isAdminBoolean = isAdminFromStorage === "true";
    if (isAuthenticated !== isAdminBoolean) {
      setIsAuthenticated(isAdminBoolean);
    }

    const interceptor = api.interceptors.response.use(
      (response) => response,

      (error) => {
        console.log("Error is", error.response);
        if (error.response?.status === 401) {
          toast("Session Experied!! Please Login", {
            icon: <FiAlertTriangle className="text-warning" />,
          });
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
     <div>
        {isLoading ? (
          <div className="loader-container">
            <div class="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : isAuthenticated ? (
          <Admin handleLogout={handleLogout} />
        ) : (
          <Auth handleLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
