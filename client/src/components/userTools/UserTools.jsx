import { useAuth } from "../../contexts/authContext";
import styles from "./UserTools.module.css";

export const UserTools = ({ open }) => {
      const { logout } = useAuth();

  return (
    <>
      {open && (
        <div className={styles.containerUT}>
          <ul>
            <li onClick={logout} className={`${styles.sair}`}> Sair</li>
          </ul>
        </div>
      )}
    </>
  );
};
