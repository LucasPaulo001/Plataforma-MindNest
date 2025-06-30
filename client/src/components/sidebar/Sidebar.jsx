import logo from "../../assets/images/logo.png";
import { useAuth } from "../../contexts/authContext";

export const Sidebar = () => {
  const { usuario } = useAuth();

  return (
    <aside>
      <div className="logoAside">
        <img src={logo} alt="logo MindNest" />
        <p>Espaço de <strong>{usuario.nome}</strong></p>
        <span className="line"></span>
      </div>
    </aside>
  );
};
