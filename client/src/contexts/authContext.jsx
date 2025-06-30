import { createContext, useState, useEffect, useContext } from "react";

//Criando contexto
const AuthContext = createContext();

//Importando o link base da API hospedada (backend)
const API_URI = import.meta.env.VITE_API_URL;

//Criando provider
export const AuthProvider = ({ children }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [token, setToken] = useState(null);

  //Pegando o token e setando no localstorage (importante para persistir o token após recarregar a página)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && usuario) {
      setToken(token);
      getMe()
    }
  }, []);

  //Função de registro
  const register = async (nome, email, password, confirmPass) => {
    try {
      //Limpando mensagens de erro e sucesso
      setError("");
      setSuccess("");

      //Inicializando o loading antes da requisição
      setLoading(true);
      const res = await fetch(`${API_URI}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nome, email, password, confirmPass }),
      });

      const data = await res.json();

      //Caso a reqisição dê errado, o loading para, as mensagens de sucesso são limpas e o erro é setado
      if (!res.ok) {
        setSuccess("");
        setError(data.errors || []);
        setLoading(false);
        return;
      }

      setSuccess(data.msg);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //Função de login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URI}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.errors || []);
        setLoading(false);
        return;
      }
      //Setando token, dados do usuário (id) e colocando o token no localstorage
      setToken(data.token);
      localStorage.setItem("token", data.token);
      await getMe();
      setLoading(false);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //Função para pegar dados do usuário (Importante para inicializar com os dados do usuário logado)
  const getMe = async () => {
    try {
      const res = await fetch(`${API_URI}/api/users/profile`, {
        // A autorização é importante para conseguir ter acesso aos dados do usuário
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUsuario(data);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // Aqui injetamos no contexto todas as funções
    <AuthContext.Provider
      value={{ register, loading, success, error, login, usuario, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
