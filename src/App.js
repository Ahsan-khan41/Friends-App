import logo from "./logo.svg";
import "./App.css";
import Routes from "./routes/Routes";
import AuthContext from "./components/context/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "./components/firebase";

function App() {
  const [firebseAuth, setFirebaseAuth] = useState({ isLoggedIn: false });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setFirebaseAuth({ isLoggedIn: true });
      console.log(user);
      const uid = user.uid;
      // ...
    }
  });

  return (
    <AuthContext.Provider value={firebseAuth}>
      <Routes />
    </AuthContext.Provider>
  );
}

export default App;
