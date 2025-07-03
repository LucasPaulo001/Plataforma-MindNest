import { createContext, useState, useEffect, useContext } from "react";

const PagesContext = createContext();

//Importando o link base da API hospedada (backend)
const API_URI = import.meta.env.VITE_API_URL;

export const PagesProvider = ({ children }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingAutoSave, setLoadingAutoSave] = useState(false)
  const [page, setPage] = useState(null);
  const [pages, setPages] = useState([]);

  const createPage = async (pageId) => {
    try {
      setLoadingPage(true);
      const res = await fetch(`${API_URI}/api/pages/create-page`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ parentPage: pageId }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoadingPage(false);
        setPage(data.página);
        console.log(page);
        return data.página;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPage(false);
    }
  };

  const fetchPages = async (workspaceId, parentId = null) => {
    try {
      setLoadingPage(true);
      const res = await fetch(
        `${API_URI}/api/pages/parent-pages?workspace=${workspaceId}&parent=${parentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setPages(data);
        setLoadingPage(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPage(false);
    }
  };

  //Editar dados da página
  const editInfo = async (pageId, title) => {
    try {
      const res = await fetch(`${API_URI}/api/pages/edit-page/${pageId}/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data);
        setPages(data.pageEdited)
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Deletar páginas
  const deletePage = async (pageId) => {
    try{
      setLoadingPage(true)
      const res = await fetch(`${API_URI}/api/pages/delete-page/page/${pageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      const data = await res.json()

      if(res.ok){
        console.log(data)
        setLoadingPage(false)
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoadingPage(false)
    }
  }

  //Autosalvar páginas
  const autoSave = async (pageId, content) => {
    setLoadingAutoSave(true)
    try{
      const res = await fetch(`${API_URI}/api/pages/save-progress/page/${pageId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ content })
      })
      const data = await res.json()
      if(res.ok){
        console.log(data)
        setLoadingAutoSave(false)
        setSuccess("Página salva!")

        setTimeout(() => {
          setSuccess("")
        }, 2000)
      }
    } 
    catch(err){
      console.log(err)
    }
    finally{
      setLoadingAutoSave(false)
    }
  }

  return (
    <PagesContext.Provider
      value={{ 
        createPage, 
        loadingPage, 
        loadingAutoSave, 
        page, 
        pages, 
        fetchPages,
        editInfo, 
        deletePage, 
        autoSave,
        success
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};

export const usePage = () => {
  return useContext(PagesContext);
};
