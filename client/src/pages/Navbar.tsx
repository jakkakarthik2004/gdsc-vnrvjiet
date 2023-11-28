import React from "react";


function Navbar() {

  
  return (
    <nav className="sticky top-0 bg-white border-b-2 border-slate-300 p-3 ">
      <div className="container mx-auto flex items-center">
        <a href="/">
        <img className="gdsc_logo" src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png" width="50" height="50"/>
        </a>
        <a href="/">
        <h1 className="text-[#868686] text-lg pl-5">GDSC VNRVJIET.</h1>
        </a>
        <div className="flex ml-auto text-slate-600 ">
        <button className="pl-5" >
          <a href="/Upcoming-events">Upcoming Events</a>
        </button>
        <button className="pl-5">
          <a href="/Past-events">Past events</a>
        </button>
        <button className="pl-5">
          <a href="/Forum" >Forum</a>
        </button>
          <button className="pl-5">
            <a href="/Login">Login</a>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
