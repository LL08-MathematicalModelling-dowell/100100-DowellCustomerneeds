import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "./axios";
import NavBar from "./components/NavBar";


function App() {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  const getMyServiceData = async() =>{
    try {
      const res = await axios.get("/services");
      setMyData(res.data)
    } catch (error) {
      setIsError(error.message);
    }
  }

  useEffect(() => {
    getMyServiceData();
  }, []);

  return (
    <>
    <NavBar/>
      <div>
      {isError !== "" && <h2>{isError}</h2>}

      {myData.map((services) => {
        const { id, category, location, product } = services;
        return (
          <div className="flex">
            <li key={services.id}>{category}</li>
            <li key={services.id}>{location}</li>
            <li key={services.id}>{product}</li>
          </div>
          
        );
      })}
      </div>
    </>
  );
}

export default App;
