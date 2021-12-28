import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./components/firebase";
import RoutesLoggedIn from "./routes/RoutesLoggedIn.js";
import RoutesNotLoggedIn from "./routes/RoutesNotLoggedIn";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, firebaseConfig } from "./components/firebase";
import CurentUserContext from "./components/context/CurrentUserContext";
import './App.css'

function App() {
  const [firebaseAuth, setFirebaseAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseAuth(true);
        setCurrentUser(user)
        onSnapshot(doc(db, "users",`${user.uid}`), (doc) => {
          setCurrentUser(doc.data());
        });

      }

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
