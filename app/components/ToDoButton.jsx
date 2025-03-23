import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';
import { useContext } from 'react';
import MiContexto from './context';
export default function({inputText, toDos, setToDos, selectedNumber}){
    const context = useContext(MiContexto)
    setTimeout(() => {
        console.log("USUARIO:", context.user.uid)
    }, 1000);
    const createCard = async () => {
        const newTask = { cardPriority: selectedNumber, cardText: inputText, cardKey: uuidv4() };
    const toDoButton = document.querySelector(".ToDoButton")
        toDoButton.style.animation ="toDoButtonAc 1s both"
        try {
          const userDocRef = doc(db, 'users', context.user.uid);
    
          // Usamos updateDoc para agregar la nueva tarea al array sin sobrescribir el existente
          await updateDoc(userDocRef, {
            tasks: arrayUnion(newTask)  // Agrega la tarea al array 'tasks'
          });
    
          // Actualizar el estado local con el nuevo array de tareas
          setToDos((prevToDos) => [...prevToDos, newTask]);
        } catch (error) {
          console.error('Error al agregar tarea:', error);
        }
      };
    
    return(
        <div className="ToDoButtonContainer">
<button onClick={createCard} className="ToDoButton">Send</button>

        </div>
    )
}