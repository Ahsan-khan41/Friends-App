import React from "react";
import "./App.css";
import RoutesLoggedIn from "./routes/RoutesLoggedIn.js";
import RoutesNotLoggedIn from "./routes/RoutesNotLoggedIn";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./components/firebase";
import CurentUserContext from "./components/context/CurrentUserContext";

function App() {
  const [firebaseAuth, setFirebaseAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
 

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setFirebaseAuth(true);
      setCurrentUser(user)

    });

  }, [])

  return (
    <div>
      <CurentUserContext.Provider value={currentUser}>
        {firebaseAuth ? <RoutesLoggedIn /> : <RoutesNotLoggedIn />}
      </CurentUserContext.Provider>
    </div>
  );
}

export default App;
