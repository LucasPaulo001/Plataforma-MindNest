import { createContext, useState, useEffect, useContext } from "react";

const PagesContext = createContext();

//Importando o link base da API hospedada (backend)
const API_URI = import.meta.env.VITE_API_URL;

export const PagesProvider = ({ children }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loadingPage, setLoadingPage] = useState(false);
  const [page, setPage] = useState(null)
  const [pages, setPages] = useState([])



  const createPage = async (pageId) => {
    try {
      setLoadingPage(true);
      const res = await fetch(`${API_URI}/api/users/create-page`, {
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
        setPage(data.página)
        console.log(page);
        return data.página

      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPage(false);
    }
  };


  const fetchPages = async (workspaceId, parentId = null) => {
    try{
      setLoadingPage(true)
      const res = await fetch(`${API_URI}/api/users/parent-pages?workspace=${workspaceId}&parent=${parentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      const data = await res.json()

      if(res.ok){
        setPages(data)
        setLoadingPage(false)
      }

    }catch (err) {
      console.log(err);
    } finally {
      setLoadingPage(false);
    }
  }

  return (
    <PagesContext.Provider value={{ createPage, loadingPage, page, pages, fetchPages }}>
      {children}
    </PagesContext.Provider>
  );
};

export const usePage = () => {
  return useContext(PagesContext);
};
