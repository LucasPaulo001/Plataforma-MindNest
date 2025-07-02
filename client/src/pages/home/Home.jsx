import { WelcomePage } from "../../components/welcomePage/WelcomePage"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"

export const Home = () => {
    const [searchParams] = useSearchParams()
    const [pageData, setPageData] = useState(null)



    return(
        <div className="containerHome">
            <Sidebar />
            <WelcomePage />
        </div>
    )
}