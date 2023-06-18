import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from 'react-router-dom';
import Homepage from "./components/Homepage";
import Categories from "./components/Categories";
import Randommeal from "./components/Randommeal";
import Meals from "./components/Meals";
import IndividualCategory from "./components/IndividualCategory";

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/randommeal" element={<Randommeal/>}/>
        <Route path="/meals/:id" element={<Meals />} />
        <Route path="/category/:id" element={<IndividualCategory />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
