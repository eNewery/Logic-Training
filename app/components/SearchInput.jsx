export default function ({ searchText, setSearchText }) {
    const handleChange = (event) => {
      setSearchText(event.target.value); // Actualiza el texto de búsqueda
    };
  
    return (
      <div className="searchContainer">
        <input
          type="text"
          className="toDoInput"
          value={searchText}
          onChange={handleChange} // Llama a handleChange cuando el usuario escribe
          placeholder="Buscar tarea..."
        />
      </div>
    );
  }
  