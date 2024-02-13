import react, {useState, useEffect} from "react";

import { auth } from './src/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

import Login from "./src/Login";
import Shop from "./src/Shop";

const App = () => {

  const [isUser, setIsUser] = useState(false)

  const handleAuthStateChange = async(authUser) => {
    if (authUser) {
      setIsUser(true)
    } else {
      setIsUser(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return unsubscribe;
  },[])

  return (
    <>
      {
        isUser ? (<Shop />) : (<Login />)
      }
    </>
  );
};

export default App;
