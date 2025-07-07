//Icones
import { HiDotsVertical } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { FiMenu } from "react-icons/fi";

//Componentes
import { Button } from "../buttons/Button";
import { Loading } from "../loading/Loading";
import { Dropdown } from "../dropdown/Dropdown";
import { Input } from "../inputs/Input";
import styles from "./Sidebar.module.css";
import logo from "../../assets/images/logo.png";

//módulos
import { UserTools } from "../userTools/UserTools";
import { useAuth } from "../../contexts/authContext";
import { usePage } from "../../contexts/pagesContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const [pageId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [dropdownId, setDropdownId] = useState(null);
  const [title, setTitle] = useState("");
  const { usuario, loading } = useAuth();
  const [openUserTools, setOpenUserTools] = useState(false);
  const {
    createPage, 
    loadingPage, 
    pages, 
    fetchPages, 
    editInfo, 
    deletePage,
    openMenu, 
    setOpenMenu
  } = usePage();

  const navigate = useNavigate();

  useEffect(() => {
    if (usuario && usuario._id) {
      fetchPages(usuario.workspaces[0]);
    }
  }, [usuario, pageId]);

  //Função para criar páginas
  const handleCreate = async () => {
    const novaPagina = await createPage(pageId);
    if (!novaPagina) return;

    await fetchPages(usuario.workspaces[0]);
  };

  //Função de deletar página
  const handleDelete = async (pageId) => {
    await deletePage(pageId);
    await fetchPages(usuario.workspaces[0]);
  };

  return (
    <>
      <button
        onClick={() => setOpenMenu((prev) => !prev)}
        className={styles.openMenu}
      >
        <FiMenu />
      </button>
      <aside className={`${openMenu ? styles.open : ""}`}>
        {/* Ferramentas de usuário */}
        <div className="logoAside">
          <Link to={"/home"}>
            <img src={logo} alt="logo MindNest" />
          </Link>
          {loading ? (
            <Loading />
          ) : (
            <>
              <button onClick={() => setOpenUserTools((prev) => !prev)}>
                <span>
                  Espaço de
                  <strong> {usuario.nome}</strong>
                </span>

                {openUserTools ? <GoChevronUp /> : <GoChevronDown />}
              </button>
              <UserTools open={openUserTools} />
            </>
          )}
          <span className="line"></span>
        </div>

        {/* Criação de páginas */}
        <div className="localBtn">
          <Button
            text={"Adicionar página"}
            type={"button"}
            onClick={handleCreate}
          />
        </div>
        <span className="line"></span>
        {loadingPage ? (
          <Loading />
        ) : pages && pages.length > 0 ? (
          pages.map((p) => (
            <div className="listPage" key={p._id}>
              <li
                className="liSideBar"
                onClick={() => {
                  navigate(`/home?page=${p._id}`);
                  setOpenMenu(false);
                }}
              >
                {/* Input de edição */}
                {edit === p._id ? (
                  <div>
                    <Input
                      placeholder={"Novo título"}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                ) : (
                  p.title
                )}
              </li>
              {/* Botão de envio de dados de edição V */}
              {edit === p._id ? (
                <FaCheck
                  onClick={async () => {
                    await editInfo(p._id, title);
                    setEdit(false);
                    fetchPages(usuario.workspaces[0]);
                  }}
                />
              ) : (
                // Botão de abertura do dropdown
                <HiDotsVertical
                  onClick={() =>
                    setDropdownId((prevId) => (prevId === p._id ? null : p._id))
                  }
                />
              )}

              {/* Dropdown */}
              {dropdownId === p._id && (
                <Dropdown
                  list={p._id}
                  handleDelete={() => handleDelete(p._id)}
                  setEdit={() => {
                    setEdit(p._id);
                    setTitle(p.title);
                  }}
                />
              )}
            </div>
          ))
        ) : (
          <h4>Não tem lista</h4>
        )}
      </aside>
    </>
  );
};
