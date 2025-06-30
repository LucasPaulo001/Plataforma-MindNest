
export const Button = ({type, text, onClick}) => {
    return(
        <button className="buttonStyle"
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    )
}