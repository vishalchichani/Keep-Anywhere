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
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <NoteState>
      <Router>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Home />} /> 
        <Route exact path="/about" element ={<About />} />
        <Route exact path="/login" element ={<Login />} />
        <Route exact path="/signup" element ={<Signup />} />
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
