import React, { useState, useEffect } from "react";
interface props {
  message: string;
  isVisible: boolean;
}
function Popup({ isVisible, message }: props) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {}, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible]);
  console.log(isVisible);
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isVisible
          ? "opacity-100 transition-opacity duration-500"
          : "opacity-0 pointer-events-none transition-opacity duration-500"
      }`}
    >
      <div className="bg-gray-800 text-white p-4 rounded shadow-md">
        <p className="text-center">{message}</p>
      </div>
    </div>
  );
}

export default Popup;
