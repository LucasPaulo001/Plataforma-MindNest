import { ClipLoader } from "react-spinners"

export const Loading = () => {
    return(
        <div className="loading">
            <ClipLoader color="#36d7b7" size={25} cssOverride={{borderWidth: "3px"}}/>
        </div>
        
    )
}