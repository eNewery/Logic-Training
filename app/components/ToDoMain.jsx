"use client";
import ToDoInputs from "./ToDoInputs";
import ToDoButton from "./ToDoButton";
import ToDoCard from "./ToDoCard";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import SearchInput from "./SearchInput";
import { db } from "../firebase";
import MiContexto from "./context";

export default function ToDoPage() {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [searchText, setSearchText] = useState(""); // Nuevo estado para el texto de búsqueda

  const context = useContext(MiContexto);

  // Si el context no está cargado o no contiene un usuario, no hacemos nada
  if (!context || !context.user) {
    return <div>Cargando...</div>;
  }

  const fetchTasks = async () => {
    try {
      const userDocRef = doc(db, 'users', context.user.uid);  // Referencia al documento del usuario
      const docSnap = await getDoc(userDocRef);  // Obtener el documento

      if (docSnap.exists()) {
        const tasksFromFirestore = docSnap.data().tasks || [];  // Obtener el array de tareas
        setToDos(tasksFromFirestore);  // Guardar las tareas en el estado
        console.log("FUNCION REALIZADA CORRECTAMENTE");
      } else {
        console.log('No hay datos en el documento');
        setToDos([]);  // En caso de que no haya tareas, dejamos el estado vacío
      }
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  useEffect(() => {
    // Solo hacer la llamada a fetchTasks si context.user está disponible
    if (context.user) {
      fetchTasks();
    }
  }, [context.user]); // Dependemos de context.user para ejecutar este efecto solo cuando esté disponible

  const deleteToDo = async (cardKey) => {
    const filteredToDos = toDos.filter((item) => item.cardKey !== cardKey);
    console.log("Filtrado", filteredToDos, "card Key especificado:", cardKey);
    setToDos(filteredToDos); // Actualizar el estado con la lista filtrada
    const docRef = doc(db, "users", context.user.uid);
    await updateDoc(docRef, {
      tasks: filteredToDos
    });
  };

  // Ordenamos toDos por cardPriority de mayor a menor
  const sortedToDos = [...toDos].sort((a, b) => b.cardPriority - a.cardPriority);

  // Filtrar los ToDos basados en el texto de búsqueda
  const filteredToDos = sortedToDos.filter((item) =>
    item.cardText.toLowerCase().includes(searchText.toLowerCase())
  );

  const welcomeCard = document.querySelector(".welcomeCard");
  if (welcomeCard) {
    setTimeout(() => {
      welcomeCard.style.display = "none";
    }, 2000);
  }

  return (
    <div className="toDoContainer">
      <div className="welcomeCard"><p className="welcomeTitle">Bienvenid@ de nuevo {context.user.displayName}</p></div>
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
