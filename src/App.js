import logo from "./logo.svg";
import "./App.css";
import Routes from "./routes/Routes";
import AuthContext from "./components/context/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./components/firebase";
import CurentUserContext from "./components/context/CurrentUserContext";

function App() {
  const [firebseAuth, setFirebaseAuth] = useState({ isLoggedIn: false });
  const [currentUser, setCurrentUser] = useState({})
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
        <Routes />
      </CurentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
