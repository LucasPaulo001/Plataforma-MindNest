import logo from "../../assets/images/logo.png";
import { useAuth } from "../../contexts/authContext";
import { Button } from "../buttons/Button";
import { Loading } from "../loading/Loading";

export const Sidebar = () => {
  const { usuario, loading } = useAuth();

  return (
    <aside>
      <div className="logoAside">
        <img src={logo} alt="logo MindNest" />
        <p>
          Espaço de
          {loading ? <Loading /> : <strong> {usuario.nome}</strong>}
        </p>
        <span className="line"></span>
      </div>
      <div className="localBtn">
        <Button text={"Adicionar página"} type={"button"} />
      </div>
    </aside>
  );
};
