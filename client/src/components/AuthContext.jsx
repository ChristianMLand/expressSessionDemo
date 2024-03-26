import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Context } from "~/util";

export function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const clear = () => setUser(null);

  useEffect(() => {
    if (location.pathname === "/" || user) return;
    axios.get("http://localhost:8000/api/session", { withCredentials: true })
      .then(({ data }) => setUser(data))
      .catch(() => navigate("/"));
  }, [location, user]);

  return (
    <Context.Provider value={{ user, clear }}>
      {children}
    </Context.Provider>
  );
}