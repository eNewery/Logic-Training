"use client"
// context.jsx

import React, { createContext, useEffect, useState } from 'react';

// Crear el contexto
const MiContexto = createContext();

// Crear el proveedor del contexto
export const MiContextoProvider = ({ children }) => {
  // Estado que compartiremos con los componentes
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalContent, setModalContent] = useState("edit");
const [user, setUser] = useState({})
useEffect(() => {
    const body = document.querySelector("body")
if (modal === true) {
    body.style.overflow = "hidden"
}
else{
    body.style.overflow = "visible"
}

}, [modal])
  return (
    <MiContexto.Provider value={{ modal, setModal, modalContent, setModalContent, user, setUser, loading, setLoading }}>
      {children}
    </MiContexto.Provider>
  );
};

// Exportar el contexto para usarlo en otros componentes
export default MiContexto;
