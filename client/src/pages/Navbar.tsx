import React from "react";

function Navbar() {
  return (
    <nav className="sticky top-0 bg-white border-b-2 border-slate-300 p-3 ">
      <div className="container mx-auto flex items-center">
      <img className="gdsc_logo" src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png" width="50" height="50" /> 
        <h1 className="text-[#868686] text-lg pl-5">GDSC VNRVJIET.</h1>
      </div>
    </nav>
  );
}

export default Navbar;
