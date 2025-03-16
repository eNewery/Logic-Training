import { useContext } from "react"
import MiContexto from "./context"

export default function() {
    const context = useContext(MiContexto)
    return(
        <div className="editContainer">
            <button onClick={() => context.setModal(false)} className="closeEditBtn">X</button>
            <input className="editInput" type="text" />
            <button onClick={() => context.setModal(false)} className="editBtn">Edit</button>
        </div>
    )
}