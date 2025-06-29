import { useState } from "react";
import { Input } from "../../../components/inputs/Input";
import styles from "../style.module.css";
import logo from "../../../assets/images/logo.png";
import { Button } from "../../../components/buttons/Button";
import { LuEyeClosed, LuEye } from "react-icons/lu";

import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { Loading } from "../../../components/loading/Loading";

export const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, loading, success, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(nome, email, password, confirmPass);
    setNome("")
    setEmail("")
    setPassword("")
    setConfirmPass("")
  };

  // Função de "eye" para o password
  const showEyePass = () => {
    setShowPass((prev) => !prev);
  };

  // Função de "eye" para o confirmPassword
  const showEyePassConfirm = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.localImg}>
          <img src={logo} alt="logo do MindNest" />
        </div>
        {success && <span className="msgSuccess">{success}</span>}
        {error &&
          Array.isArray(error) &&
          error.map((err, i) => <span className="msgError" key={i}>{err.msg || err}</span>)}
        <div className={styles.localInput}>
          <Input
            type={"text"}
            value={nome}
            placeholder={"Nome de usuário"}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className={styles.localInput}>
          <Input
            value={email}
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.localInput}>
          {showPass ? (
            <>
              <Input
                value={password}
                type={"text"}
                placeholder={"Senha"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LuEye className={styles.eye} onClick={showEyePass} />
            </>
          ) : (
            <>
              <Input
                value={password}
                type={"password"}
                placeholder={"Senha"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LuEyeClosed className={styles.eye} onClick={showEyePass} />
            </>
          )}
        </div>

        {/* Confirmação de senha */}
        <div className={styles.localInput}>
          {showConfirmPassword ? (
            <>
              <Input
                value={confirmPass}
                type={"text"}
                placeholder={"Senha"}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <LuEye className={styles.eye} onClick={showEyePassConfirm} />
            </>
          ) : (
            <>
              <Input
                value={confirmPass}
                type={"password"}
                placeholder={"Repita a senha..."}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <LuEyeClosed
                className={styles.eye}
                onClick={showEyePassConfirm}
              />
            </>
          )}
        </div>
        <div className={styles.localBtn}>
          {loading ? (
            <Loading />
          ) : (
            <Button text={"Cadastrar"} type={"submit"} />
          )}
        </div>
        <span>
          Já tem uma conta? faça seu login <Link to={"/login"}>aqui!</Link>
        </span>
      </form>
    </div>
  );
};
