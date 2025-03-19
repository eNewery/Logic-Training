import { useState } from "react"

export default function() {
const [option, setOption] = useState(true)
function changeOption() {
    const signCard = document.querySelector(".signCard")
    signCard.style.animation = "loginSpinOut 0.5s both"
    setTimeout(() => {
        setOption(!option)
    signCard.style.animation = "loginSpinIn 0.5s both"

    }, 1000);
}
    return(
        <div className="signUpContainer">
            {option === true ? 
            <div className="signCard signUpContainer">
<h1 className="signCardTitle">Registrarse</h1>
<div className="signInputs">
<input type="text" /><input type="text" />
</div>
<div className="signBtnContainer">
    <button>Registrarse</button>
    <p onClick={() => changeOption()} className="changeScreenSign">Si deseas iniciar sesión</p>
</div>
            </div> : option === false ? 
            <div className="signCard signInContainer">
<h1 className="signCardTitle">Iniciar Sesión</h1>
<div className="signInputs">
<input type="text" /><input type="text" />
</div>
<div className="signBtnContainer">
    <button>Entrar</button>
    <p onClick={() => changeOption()} className="changeScreenSign">Si deseas registrarte</p>
</div>
            </div> : ""}
            
        </div>
    )
}