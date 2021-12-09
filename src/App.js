import logo from "./logo.svg";
import "./App.css";
import RoutesLoggedIn from "./routes/RoutesLoggedIn.js";
import RoutesNotLoggedIn from "./routes/RoutesNotLoggedIn";
import AuthContext from "./components/context/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./components/firebase";
import CurentUserContext from "./components/context/CurrentUserContext";

function App() {
  const [firebseAuth, setFirebaseAuth] = useState({ isLoggedIn: false });
  const [currentUser, setCurrentUser] = useState()
  console.log(currentUser)

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setFirebaseAuth({ isLoggedIn: true });
      console.log(user);
      setCurrentUser(user)
      // const uid = user.uid;
      // localStorage.setItem('user', JSON.stringify(user))
      // ...
    });

  }, [])

  return (

    <AuthContext.Provider value={firebseAuth}>
      <CurentUserContext.Provider value={currentUser}>
        {currentUser ? <RoutesLoggedIn /> : <RoutesNotLoggedIn />}

      </CurentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
