import React, { useState, useEffect} from "react";
import LogIn from "./components/LogIn";
import Home from "./components/Home";

import firebaseApp from "./credentials";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(firebaseApp);

function App() {
  const [globalUser, setGlobalUser] = useState(null);

  onAuthStateChanged(auth, (firebaseUser)=>{
    if(firebaseUser){
      setGlobalUser(firebaseUser);
    } else{
      setGlobalUser(null);
    }
  })
  return (
    <>
      {globalUser ? <Home userEmail={globalUser.email}/> : <LogIn />}
    </>
  );
}

export default App;
