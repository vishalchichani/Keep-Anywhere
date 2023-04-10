import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/noteState";


function App() {
  return (
    <div className="App">
      <NoteState>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} /> 
        <Route exact path="/about" element ={<About />} />
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
