import { Editor } from "../../components/editor/Editor"
import { Sidebar } from "../../components/sidebar/Sidebar"

export const Home = () => {
    return(
        <div className="containerHome">
            <Sidebar />
            <Editor />
        </div>
    )
}