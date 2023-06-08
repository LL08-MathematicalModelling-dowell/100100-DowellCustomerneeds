import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
// import AutoCompleter from "./components/AutoCompleter";
import {DwellClassic} from "./components/DwellClassic";
import {SpreadSheet} from "./components/SpreadSheet";


function App() {
 
  return (
    <>
    <NavBar/>
    <DwellClassic/>
    <SpreadSheet/>
    </>
  );
}

export default App;
