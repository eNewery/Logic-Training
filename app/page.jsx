"use client"
import { useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ToDoMain from "./components/ToDoMain";
import Modal from "./components/Modal";
import MiContexto, { MiContextoProvider } from "./components/context";
import SignUp from "./components/SignUp";
import { app } from "./firebase";  // Importa tu instancia de Firebase si no lo has hecho
import Loading from "./components/Loading";

export default function Home() {
  const context = useContext(MiContexto);
  const [user, setUser] = useState(null); // Aquí almacenamos la información del usuario

  // Obtener la instancia de Firebase Auth
  const auth = getAuth(app);

  // Configurar el listener para cambios en la autenticación
  useEffect(() => {
    context.setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario autenticado:", user);
        setUser(user);  // Actualiza el estado con el usuario autenticado
        context.setLoading(false)
        context.setUser(user);
      } else {
        console.log("No hay usuario autenticado");
        setUser(null);  // Si no hay usuario, ponemos el estado a null
        context.setUser(null);
        context.setLoading(false)
      }
      
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, [auth]);  // Solo se ejecuta cuando `auth` cambia, aunque en este caso no es necesario

  // Puedes usar el estado `user` para mostrar contenido diferente según el estado de autenticación
  console.log("Usuario en estado:", user?.uid);

  return (
    <div className="container">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet"/>
{context.loading === true ? <Loading/> : ""}
      {/* Aquí puedes condicionar la visualización de otros componentes basados en el estado de autenticación */}
      {user ? (
        <ToDoMain/>  // Mostrar la lista de tareas solo si el usuario está autenticado
      ) : (
        <SignUp />  // Mostrar la pantalla de registro/login si no hay un usuario autenticado
      )}

      {context.modal === false ? "" : <Modal />}
    </div>
  );
}
