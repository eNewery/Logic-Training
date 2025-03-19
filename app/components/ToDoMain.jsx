"use client";
import ToDoInputs from "./ToDoInputs";
import ToDoButton from "./ToDoButton";
import ToDoCard from "./ToDoCard";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";

export default function () {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [searchText, setSearchText] = useState(""); // Nuevo estado para el texto de búsqueda

  useEffect(() => {
    let arrayRecuperado = JSON.parse(localStorage.getItem("Array"));
    if (arrayRecuperado === null) {
      setToDos([]);
    } else {
      setToDos(arrayRecuperado);
    }
  }, []);

  const deleteToDo = (cardKey) => {
    const filteredToDos = toDos.filter((item) => item.cardKey !== cardKey);
    console.log("Filtrado", filteredToDos, "card Key especificado:", cardKey);
    setToDos(filteredToDos); // Actualizar el estado con la lista filtrada
    localStorage.setItem("Array", JSON.stringify(filteredToDos));
  };

  // Ordenamos toDos por cardPriority de mayor a menor
  const sortedToDos = [...toDos].sort((a, b) => b.cardPriority - a.cardPriority);

  // Filtrar los ToDos basados en el texto de búsqueda
  const filteredToDos = sortedToDos.filter((item) =>
    item.cardText.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="toDoContainer">
      <SearchInput searchText={searchText} setSearchText={setSearchText} /> {/* Pasa el estado y la función */}
      <div className="toDoCardsContainer">
        {filteredToDos.map((item) => (
          <ToDoCard
            key={item.cardKey} // No pasar 'key' como prop, React maneja esto
            cardText={item.cardText}
            cardKey={item.cardKey} // Pasar el cardKey correctamente
            deleteToDo={deleteToDo} // Pasar la función de eliminación
            input={input}
            setInput={setInput}
            cardPriority={item.cardPriority}
          />
        ))}
      </div>
      <ToDoInputs input={input} setInput={setInput} toDos={toDos} setToDos={setToDos} />
    </div>
  );
}
