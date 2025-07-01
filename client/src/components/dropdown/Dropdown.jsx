
export const Dropdown = ({ list, setEdit }) => {
    return(
        <div className="dropdown">
            <span onClick={() => 
                setEdit((prev) => (prev === list ? null : list))} className="optionDrop">Editar</span>
        </div>
    )
}