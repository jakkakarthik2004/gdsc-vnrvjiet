import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const routes = [
    {
      path: "/",
      element: <Home/>,
    },
  ];

  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        {routes.map((e, i) => (
          <Route path={e.path} element={e.element} />
        ))}
      </Routes>
    </React.Fragment>
  );
}

export default App;
