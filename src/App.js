// import logo from "./logo.svg";
import "./App.css";
import AppRouter from "../src/components/Router";
import Modal from "react-bootstrap/Button";
import Header from "./components/Header";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App">
      {/* <h1>App</h1> */}

      <AppRouter />
    </div>
  );
}

export default App;
