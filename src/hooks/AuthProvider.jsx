import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  async function userLogin(data) {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/user/login`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();           
         
        if (json) {
          setUser(json.user)
          setToken(json.token)
          localStorage.setItem('token', json.token)
          localStorage.setItem('user', JSON.stringify(json.user))
          navigate('/')
          return;
        }

    } catch (error) {
        console.error(error)
    }
  }

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem('user')
  };

  return (
    <AuthContext.Provider value={{ token, user, userLogin, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
