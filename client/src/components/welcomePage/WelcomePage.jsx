import { usePage } from "../../contexts/pagesContext";
import styles from "./WelcomePage.module.css";
import { FcIdea } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export const WelcomePage = () => {
  const { openMenu } = usePage();

  return (
    <>
      {!openMenu && (
        <div className={styles.mainContent}>
          <h1>Seja bem vindo ao MindNest!</h1>

          <p>
            Organize ideias suas ideias <FcIdea />
          </p>
          <span>
            <Link to={"https://github.com/LucasPaulo001"} target="_blank">
              <FaGithub />
            </Link>
            Lucas Paulo &copy; 2025
          </span>
        </div>
      )}
    </>
  );
};
