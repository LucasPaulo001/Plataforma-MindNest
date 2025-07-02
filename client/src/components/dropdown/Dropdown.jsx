export const Dropdown = ({ list, setEdit, handleDelete }) => {
  return (
    <div className="dropdown">
      <span
        onClick={() => setEdit((prev) => (prev === list ? null : list))}
        className="optionDrop"
      >
        Editar
      </span>
      <span
        onClick={ async () => {
          if (window.confirm("Tem certeza que deseja deletar esta página?")) {
            await handleDelete();
          }
        }}
        className="optionDrop"
      >
        Excluir
      </span>
    </div>
  );
};
