import { useState } from "react";
import { Input } from "../../../components/inputs/Input";
import styles from "../style.module.css";
import logo from "../../../assets/images/logo.png";
import { Button } from "../../../components/buttons/Button";
import { LuEyeClosed, LuEye } from "react-icons/lu";

import { Link } from "react-router-dom";

export const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const showEyePass = () => {
    setShowPass((prev) => !prev);
  };

  const showEyePassConfirm = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  return (
    <div className={styles.container}>
      <form>
        <div className={styles.localImg}>
          <img src={logo} alt="logo do MindNest" />
        </div>
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
                placeholder={"Senha"}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <LuEyeClosed className={styles.eye} onClick={showEyePassConfirm} />
            </>
          )}
        </div>
        <div className={styles.localBtn}>
          <Button text={"Cadastrar"} type={"submit"} />
        </div>
        <span>
          Já tem uma conta? faça seu login <Link to={"/login"}>aqui!</Link>
        </span>
      </form>
    </div>
  );
};
