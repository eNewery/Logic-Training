"use client"
import { useContext, useState } from "react"
import MiContexto from "./context"
export default function(){
    const [isOpen, setIsOpen] = useState(false)
    const context = useContext(MiContexto)
    function alternateIsOpen() {
        const menu = document.querySelector(".menu")
if (isOpen === false) {
    setIsOpen(true)
}
else{
    menu.style.animation = "ScaleAn2 0.3s both"
    setTimeout(() => {
        setIsOpen(false)
    }, 300);
}
    }
    return(
        <div onClick={() => alternateIsOpen()} className="avatarContainer">
<img src="./avatar.png" alt="" />
{isOpen && (
        <div className="menu">
          <p>Email: {context.user.email}</p>
          <p>Username: {context.user.displayName}</p>
        </div>
      )}
        </div>
    )
}