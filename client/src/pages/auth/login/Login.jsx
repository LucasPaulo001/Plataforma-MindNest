import { useEffect, useState } from "react";
import { Input } from "../../../components/inputs/Input";
import styles from "../style.module.css";
import { Button } from "../../../components/buttons/Button";
import logo from "../../../assets/images/logo.png";
import { LuEyeClosed, LuEye } from "react-icons/lu";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { Loading } from "../../../components/loading/Loading";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login, usuario, loading } = useAuth();

  const navigate = useNavigate();

  //Função de manipulação do eye no password
  const showEyePass = () => {
    setShowPass((prev) => !prev);
  };

  //Função de login
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  //Importante para redirecionar após o login
  useEffect(() => {
    if (usuario && usuario.token) {
      navigate("/home");
    }
  }, [usuario]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.localImg}>
          <img src={logo} alt="logo do MindNest" />
        </div>
        <div className={styles.localInput}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.localInput}>
          {showPass ? (
            <>
              <Input
                type={"text"}
                placeholder={"Senha"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LuEye className={styles.eye} onClick={showEyePass} />
            </>
          ) : (
            <>
              <Input
                type={"password"}
                placeholder={"Senha"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LuEyeClosed className={styles.eye} onClick={showEyePass} />
            </>
          )}
        </div>
        <span>
          <Link to={"#"}>Esqueceu a senha?</Link>
        </span>
        <div className={styles.localBtn}>
          {loading ? (
            <Loading />
          ) : (
            <Button text={"Login"} type={"submit"} />
          )}
          
        </div>
        <span>
          É novo por aqui? Faça o cadastro <Link to={"/register"}>aqui!</Link>
        </span>
      </form>
    </div>
  );
};
