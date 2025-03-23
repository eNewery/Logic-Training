import { useState, useEffect, useContext } from "react"
import { app } from "../firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore/lite";
import { db } from "../firebase";
import MiContexto from "./context";

export default function() {
  const [option, setOption] = useState(true)
  const [email, setEmail] = useState("")  
  const [username, setUsername] = useState("")  
  const [password, setPassword] = useState("")  
const context = useContext(MiContexto)
  const auth = getAuth(app);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleUsername = (e) => {
    setUsername(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  function changeOption() {
    const signCard = document.querySelector(".signCard");
    signCard.style.animation = "loginSpinOut 0.5s both";
    setTimeout(() => {
      setOption(!option);
      // Vaciar los campos manualmente
      setEmail(""); // Asegúrate de que se vacíen las entradas
      setPassword(""); // Asegúrate de que se vacíen las entradas
      signCard.style.animation = "loginSpinIn 0.5s both";
    }, 1000);
  }

  // Registrar un nuevo usuario con correo y contraseña
  const registerUser = async (email, password) => {
    context.setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: username
      })
      await setDoc(doc(db, 'users', userCredential.user?.uid), {
       tasks: [],
       userId: userCredential.user.uid,
       email: userCredential.user.email,
       username: userCredential.user.displayName
      });

      console.log('Usuario registrado:', userCredential.user);
      alert("usuario creado");
      setOption(false); // Cambiar a la pantalla de login
      context.setLoading(false)
    } catch (error) {
      console.error(error.message);
      alert("error");
      context.setLoading(false)
    }
  };

  // Iniciar sesión con correo y contraseña
  const loginUser = async (email, password) => {
    context.setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario logueado:', userCredential.user);
      context.setLoading(false)
    } catch (error) {
      console.error(error.message);
      context.setLoading(false)
    }
  };

  // Asegurarse de que los campos estén correctamente vacíos si se cambia la pantalla
  useEffect(() => {
    if (option === false) {
      setEmail("");  
      setPassword("");  
    }
  }, [option]);  // Ejecutar solo cuando `option` cambia

  return (
    <div className="signUpContainer">
      {option === true ? (
        <div className="signCard signUpContainer">
          <h1 className="signCardTitle">Registrarse</h1>
          <div className="signInputs">
          <input
              onChange={handleUsername}
              placeholder="Username"
              type="text"
              value={username || ""}  // Vincula el valor del input al estado de email, y asegura que no sea `undefined`
            />
            <input
              onChange={handleEmail}
              placeholder="E-mail"
              type="text"
              value={email || ""}  // Vincula el valor del input al estado de email, y asegura que no sea `undefined`
            />
            <input
              onChange={handlePassword}
              placeholder="Contraseña"
              type="password"
              value={password || ""}  // Vincula el valor del input al estado de password, y asegura que no sea `undefined`
            />
          </div>
          <div className="signBtnContainer">
            <button onClick={() => registerUser(email, password)} className="signBtn">Registrarse</button>
            <p onClick={changeOption} className="changeScreenSign">¿Ya tienes una cuenta?</p>
          </div>
        </div>
      ) : option === false ? (
        <div className="signCard signInContainer">
          <h1 className="signCardTitle">Iniciar Sesión</h1>
          <div className="signInputs">
            <input
              onChange={handleEmail}
              placeholder="E-mail"
              type="text"
              value={email || ""}  // Vincula el valor del input al estado de email, y asegura que no sea `undefined`
            />
            <input
              onChange={handlePassword}
              placeholder="Contraseña"
              type="password"
              value={password || ""}  // Vincula el valor del input al estado de password, y asegura que no sea `undefined`
            />
          </div>
          <div className="signBtnContainer">
            <button onClick={() => loginUser(email, password)} className="signBtn">Entrar</button>
            <p onClick={changeOption} className="changeScreenSign">¿Necesitas registrarte?</p>
          </div>
        </div>
      ) : ""}
    </div>
  );
}
