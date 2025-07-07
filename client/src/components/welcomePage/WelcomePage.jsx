import { usePage } from "../../contexts/pagesContext";
import styles from "./WelcomePage.module.css";

export const WelcomePage = () => {
  const { openMenu } = usePage();

  return (
    <>
      {!openMenu && (
        <div className={styles.mainContent}>
          <h1>Seja bem vindo ao MindNest!</h1>
        </div>
      )}
    </>
  );
};
