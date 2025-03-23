
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: "AIzaSyAKOa4l-wRMByKGOoiMCLyjlBEB04h9mpc",
  authDomain: "users-49101.firebaseapp.com",
  projectId: "users-49101",
  storageBucket: "users-49101.firebasestorage.app",
  messagingSenderId: "1072311967099",
  appId: "1:1072311967099:web:256ecedf277fbbcc77b1de",
  measurementId: "G-L8NF42JSNB"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db, app };
;