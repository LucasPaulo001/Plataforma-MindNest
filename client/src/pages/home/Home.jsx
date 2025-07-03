import { WelcomePage } from "../../components/welcomePage/WelcomePage"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Editor } from "../../components/editor/Editor"
import { Loading } from "../../components/loading/Loading"
const token = localStorage.getItem("token")

export const Home = () => {
    const [searchParams] = useSearchParams()
    const pageId = searchParams.get("page")
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState(null)

    useEffect(() => {
        const fetchPage = async () => {
            if(!pageId){
                setPageData(null);
                return
            }

            try{
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pages/page/${pageId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                const data = await res.json()

                if(res.ok){
                    setPageData(data)
                    setLoading(false)
                    console.log(data)
                }
                else{
                    setPageData(null)
                }
            }
            catch(err){
                console.log(err)
            }
            finally{
                setLoading(false)
            }
        }

        fetchPage()
    }, [pageId, token]);

    return(
        <div className="containerHome">
            <Sidebar />

            {loading ? <span className="center"><Loading /></span> :
                pageData ? 
                    <Editor pageData={pageData} content={pageData.content} /> 
                    : 
                    <WelcomePage />
            }
        </div>
    )
}