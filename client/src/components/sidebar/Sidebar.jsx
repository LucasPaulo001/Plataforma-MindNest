import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../contexts/authContext";
import { usePage } from "../../contexts/pagesContext";
import { Button } from "../buttons/Button";
import { Loading } from "../loading/Loading";
import { HiDotsVertical } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { Dropdown } from "../dropdown/Dropdown";
import { Input } from "../inputs/Input";

export const Sidebar = () => {
  const [pageId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [dropdownId, setDropdownId] = useState(null);
  const [title, setTitle] = useState("");
  const { usuario, loading } = useAuth();
  const { createPage, loadingPage, pages, fetchPages, editInfo, deletePage } = usePage();

  const navigate = useNavigate();

  useEffect(() => {
    if (usuario && usuario._id) {
      fetchPages(usuario.workspaces[0]);
    }
  }, [usuario]);

  //Função para criar páginas
  const handleCreate = async () => {
    const novaPagina = await createPage(pageId);
    if (!novaPagina) return;

    await fetchPages(usuario.workspaces[0]);
  };

  //Função de deletar página
  const handleDelete = async (pageId) => {
    await deletePage(pageId)
  }

  return (
    <aside>
      <div className="logoAside">
        <Link to={"/home"}>
          <img src={logo} alt="logo MindNest" />
        </Link>
        {loading ? (
          <Loading />
        ) : (
          <p>
            Espaço de
            <strong> {usuario.nome}</strong>
          </p>
        )}
        <span className="line"></span>
      </div>
      <div className="localBtn">
        {loadingPage ? (
          <Loading />
        ) : (
          <Button
            text={"Adicionar página"}
            type={"button"}
            onClick={handleCreate}
          />
        )}
      </div>
      <span className="line"></span>
      {loadingPage ? (
        <Loading />
      ) : pages && pages.length > 0 ? (
        pages.map((p) => (
          <div className="listPage" key={p._id}>
            <li
              className="liSideBar"
              onClick={() => navigate(`/home?page=${p._id}`)}
              
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
              <FaCheck onClick={async () => {
                await editInfo(p._id, title);
                setEdit(false)
                fetchPages(usuario.workspaces[0]);
              }}/>
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
  );
};
