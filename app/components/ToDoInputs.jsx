"use client"
import { useEffect, useState } from "react";
import ToDoButton from "./ToDoButton";

export default function({toDos, setToDos, input, setInput}){
    const [selectedNumber, setSelectedNumber] = useState(0); // Estado para almacenar el número seleccionado
    useEffect(() => {
    const styledSelect = document.querySelector(".styled-select")
    selectedNumber === "1" ? styledSelect.style.color = "white" : selectedNumber === "2" ? styledSelect.style.color = "black" : ""
selectedNumber === "1" ? styledSelect.style.animation = "pri1 1s both" : selectedNumber === "2" ? styledSelect.style.animation = "pri2 1s both" : selectedNumber === "3" ? styledSelect.style.animation = "pri3 1s both" : ""
console.log(selectedNumber)
}, [selectedNumber])
    function onChangeInput(e) {
setInput(e)
}
const handleChange = (event) => {
    setSelectedNumber(event.target.value); // Actualiza el estado con el valor seleccionado
  };
    return(
        <div className="toDoInputsContainer">
            <img src="./book.png" alt="" />
            <input onChange={(e) => onChangeInput(e.target.value)} placeholder="Type Here . . ." className="toDoInput" type="text" name="" id="" />
            <div className="select-container">
      <select value={selectedNumber} onChange={handleChange} className="styled-select">
        <option value="">Seleccionar prioridad</option>
        <option value={1}>3</option>
        <option value={2}>2</option>
        <option value={3}>1</option>
      </select>
    </div>
<ToDoButton toDos={toDos} setToDos={setToDos} inputText={input} selectedNumber={selectedNumber}/>

        </div>
    )
}