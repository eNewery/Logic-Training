"use client"
import ToDoInputs from "./ToDoInputs";
import ToDoButton from "./ToDoButton";
import ToDoCard from "./ToDoCard";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";


export default function() {
const [toDos, setToDos] = useState([])
const [input, setInput] = useState();

useEffect(() => {
let arrayRecuperado = JSON.parse(localStorage.getItem('Array'));
if (arrayRecuperado === null) {
setToDos([])
}
else{
    setToDos(arrayRecuperado)
}
}, [])
const deleteToDo = (cardKey) => {
    const filteredToDos = toDos.filter(item => item.cardKey !== cardKey);
    console.log("Filtrado", filteredToDos, "card Key especificado:", cardKey)
    setToDos(filteredToDos);  // Actualizar el estado con la lista filtrada
    localStorage.setItem('Array', JSON.stringify(filteredToDos));
};
    return(
        <div className="toDoContainer">
            <SearchInput/>
<div className="toDoCardsContainer">
{toDos.map(item => <ToDoCard 
                    key={item.cardKey}  // No pasar 'key' como prop, React maneja esto
                    cardText={item.cardText} 
                    cardKey={item.cardKey}  // Pasar el cardKey correctamente
                    deleteToDo={deleteToDo}  // Pasar la función de eliminación
                    input={input}
                    setInput={setInput}
                    />)}
</div>
                    <ToDoInputs input={input} setInput={setInput}  toDos={toDos} setToDos={setToDos}/>
        </div>
    )
}