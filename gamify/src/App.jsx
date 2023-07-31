import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import HealthBar from "./components/HealthBar";
import Canvas from "./components/Canvas";
import Tickets from "./components/Tickets";
import Nav from "./components/Nav";
import HitField from "./components/HitField";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Nav />
      <Tickets />
    </div>
  );
}

export default App;
