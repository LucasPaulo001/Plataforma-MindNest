
export const Input = ({type, placeholder, value, onChange}) => {
    return(
        <input 
        className="inputStyle"
            type={type} 
            placeholder={placeholder} 
            value={value}
            onChange={onChange}
        />
    )
}