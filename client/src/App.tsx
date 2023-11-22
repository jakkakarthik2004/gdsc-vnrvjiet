import React from "react";
import logo from "./logo.svg";
import Root from "./Root";
import "./output.css";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <div className="bg-[#191919] min-h-screen text-white">
      <Navbar />
      <Root />
    </div>
  );
}

export default App;
