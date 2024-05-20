import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from "./Pages/Home/Home";
import About from './Pages/About-Us/About';
import Company from './Pages/Company/Company';
import Talent from './Pages/Talent/Talent';
import Contact from './Pages/Contact/Contact';

function App() {
  return (
    
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/Talent" element={<Talent />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;