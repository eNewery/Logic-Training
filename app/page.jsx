"use client"
import ToDoMain from "./components/ToDoMain";
import Modal from "./components/Modal";
import MiContexto, { MiContextoProvider } from "./components/context";
import { useContext } from "react";

export default function Home() {
  const context = useContext(MiContexto)
  console.log("Contexto: ", context)
  return (
    <div className="container">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet"/>
<ToDoMain/>
{context.modal === false ? "" : <Modal/>}
  
    </div>
  );
}
