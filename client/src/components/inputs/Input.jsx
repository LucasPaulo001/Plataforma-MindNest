
export const Input = ({type, placeholder, value, onChange, onKeyDown, style}) => {
    return(
        <input 
        style={style}
        className="inputStyle"
            type={type} 
            placeholder={placeholder} 
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    )
}