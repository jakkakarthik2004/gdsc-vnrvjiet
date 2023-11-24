import React, { useState, useEffect } from "react";

function Hero() {
    const heroStyle = {
        backgroundImage: `url('https://gdsctaruc.github.io/images/homeBackground.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '500px', 
      };

  return (
    <div className="HeroSection flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat m-4"  style={heroStyle}>
        <div className="mx-auto text-center mb-5">
            <img className="gdsc_logo mx-auto p-3" src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png" width="250"/> 
            <h1 className="text-gray-700 text-5xl">Google Developer Student Clubs</h1>
            <h1 className="text-gray-500 text-xl">Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering &Technology.</h1>
        </div>
        <button className="transition ease-in-out delay-70 hover:-translate-y-1 hover:scale-110 duration-300 bg-[#0F71F2] p-2 px-5 m-3 rounded ring-offset-2 ring-4 ring-[#F2A20C]">Join us.</button>
    </div>
  );
}

export default Hero;
