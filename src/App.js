import Header from "./component/Header";
import Cards from "./component/Cards";
import { Route, Routes } from "react-router-dom";
import AddMovie from "./component/AddMovie";
import Detail from "./component/Detail";
import { createContext, useEffect, useContext, useState } from "react";
import Login from "./component/Login";
import Signup from "./component/Signup";

const Appstate = createContext();

function App() {

  const [login, setLogin] = useState(false);

  const [userName, setUserName] =useState("");


  return (
<Appstate.Provider value={{login,userName,setLogin, setUserName}} >
    <div className="App relative">
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/addmovie" element={<AddMovie />}/>
        <Route path="/detail/:id" element={<Detail />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>

      </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};