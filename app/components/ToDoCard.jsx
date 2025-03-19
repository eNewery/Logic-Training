import React, { useContext, useRef } from 'react';
import MiContexto from './context';

export default function ToDoCard({input, setInput, deleteToDo, cardText, cardKey, cardPriority }) {
    const cardRef = useRef(null);  
    const trashRef = useRef(null);  
    // Crear la referencia para este card específico
const context = useContext(MiContexto)
const trashIcon = document.querySelector(".trashIcon")
    const handleEdit = () => {
context.setModal(!context.modal)
    }

    const handleDelete = () => {
        if (cardRef.current) {
            // Aplicar la animación a la tarjeta específica
            cardRef.current.style.animation = "cardDiss 0.5s both";
            trashRef.current.style.animation = "trashDelete 0.5s both"
            // Después de la animación, eliminar el ToDo
            setTimeout(() => {
                deleteToDo(cardKey);
            }, 2000); // Sincronizado con la duración de la animación
        }
    };

    return (
        <div className={`toDoCardContainer ${cardPriority === "1" ? "priority1Card" : cardPriority === "2" ? "priority2Card" : cardPriority === "3" ? "priority3Card" : ""}`} ref={cardRef}>
            {cardText}
            <div className="cardBtnContainer">
                <img src="./completed.png" alt="Edit" />
                <img ref={trashRef} className='trashIcon' onClick={handleDelete} src="./remove.png" alt="Remove" />
            </div>
        </div>
    );
}
