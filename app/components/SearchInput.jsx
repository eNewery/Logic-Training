import { getAuth, signOut } from "firebase/auth";
import Avatar from "./Avatar";

export default function ({ searchText, setSearchText }) {
    const handleChange = (event) => {
      setSearchText(event.target.value); // Actualiza el texto de búsqueda
    };
  const auth = getAuth()
    return (
      <div className="searchContainer">
        <Avatar/>
        <input
          type="text"
          className="toDoInput"
          value={searchText}
          onChange={handleChange} // Llama a handleChange cuando el usuario escribe
          placeholder="Buscar tarea..."
        />
        <button onClick={() => signOut(auth)} className="logOutBtn">Cerrar Sesión</button>
      </div>
    );
  }
  