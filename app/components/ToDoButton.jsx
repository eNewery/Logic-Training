import { v4 as uuidv4 } from 'uuid';

export default function({inputText, toDos, setToDos, selectedNumber}){
    
    function createCard() {
        const toDoButton = document.querySelector(".ToDoButton")
        toDoButton.style.animation ="toDoButtonAc 1s both"
        setToDos([...toDos, {cardPriority:selectedNumber, cardText:inputText, cardKey:uuidv4()}])
        localStorage.setItem('Array', JSON.stringify([...toDos, {cardPriority:selectedNumber, cardText:inputText, cardKey:uuidv4()}]));
        console.log(toDos)
        setTimeout(() => {
            toDoButton.style.animation = "none"
        }, 1000);
    
    }
    return(
        <div className="ToDoButtonContainer">
<button onClick={createCard} className="ToDoButton">Send</button>

        </div>
    )
}