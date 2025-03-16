"use client"
import { useContext } from "react"
import MiContexto from "./context"
import EditCardModal from "./EditCardModal"

export default function() {
    const context = useContext(MiContexto)
    return(
        <div className="modalContainer">
            <div className="modalContent">{context.modalContent === "edit" ? <EditCardModal/> : ""}</div>
        </div>
    )
}