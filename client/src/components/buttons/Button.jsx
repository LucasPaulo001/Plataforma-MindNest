
export const Button = ({type, text}) => {
    return(
        <button className="buttonStyle"
            type={type}
        >
            {text}
        </button>
    )
}