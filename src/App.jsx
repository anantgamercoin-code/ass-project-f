import { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/orders/Orders";
import Customers from "./pages/customers/Customers";
import Reports from "./pages/reports/Reports";
import Login from "./pages/auth/Login";
import Settings from "./pages/settings/Settings";

function App() {
  const [page, setPage] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ important

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:2000/auth/me",
          {
            withCredentials: true, // ✅ must
          }
        );

        if (data.isAuthenticated) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ⏳ prevent flicker
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  switch (page) {
    case "orders":
      return (
        <Orders setPage={setPage} setIsAuthenticated={setIsAuthenticated} />
      );
    case "customers":
      return (
        <Customers setPage={setPage} setIsAuthenticated={setIsAuthenticated} />
      );
    case "reports":
      return (
        <Reports setPage={setPage} setIsAuthenticated={setIsAuthenticated} />
      );
    case "settings":
      return (
        <Settings setPage={setPage} setIsAuthenticated={setIsAuthenticated} />
      );
    default:
      return (
        <Dashboard setPage={setPage} setIsAuthenticated={setIsAuthenticated} />
      );
  }
}

export default App;