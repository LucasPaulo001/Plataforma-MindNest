import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../contexts/authContext";
import { usePage } from "../../contexts/pagesContext";
import { Button } from "../buttons/Button";
import { Loading } from "../loading/Loading";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export const Sidebar = () => {
  const [pageId, setPageId] = useState(null);
  const { usuario, loading } = useAuth();
  const { createPage, loadingPage, page, pages, fetchPages } = usePage();
  const [searchParams] = useSearchParams();
  const currentPageId = searchParams.get("page");
  const navigate = useNavigate()

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

  return (
    <aside>
      <div className="logoAside">
        <Link to={"/home"}><img src={logo} alt="logo MindNest" /></Link>
        <p>
          Espaço de
          {loading ? <Loading /> : <strong> {usuario.nome}</strong>}
        </p>
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
      {loadingPage ?
      <Loading /> :
      pages && pages.length > 0 ? (
        pages.map((p) => (
        <li className="liSideBar" onClick={() => navigate(`/home?page=${p._id}`)} key={p._id}>
          {p.title}
        </li>))
      ) : (
        <h4>Não tem lista</h4>
      )}
    </aside>
  );
};
