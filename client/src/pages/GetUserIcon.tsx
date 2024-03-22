import React, { useState, useEffect } from "react";

function GetUserIcon(props: { user: any }) {
  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getInitials = (name: string) => {
    let initials;
    const nameSplit = name.split(" ");
    const nameLength = nameSplit.length;
    if (nameLength > 1) {
      initials =
        nameSplit[0].substring(0, 1) +
        nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
      initials = nameSplit[0].substring(0, 1);
    } else return;

    return initials.toUpperCase();
  };

  const createImageFromInitials = (
    size: number,
    name: string | null,
    color: string | CanvasGradient | CanvasPattern
  ) => {
    if (name == null) return;
    name = getInitials(name) || "";
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = canvas.height = size;

    if (context !== null) {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, size, size);

      context.fillStyle = `${color}50`;
      context.fillRect(0, 0, size, size);

      context.fillStyle = color;
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.font = `${size / 2}px Arial`;
      context.fillText(name, size / 2, size / 2);
    }
    console.log(canvas.toDataURL);
    return canvas.toDataURL();
  };

  return (
    <div>
      {props.user != null && (
        <img
          src={createImageFromInitials(35, props.user.name, "#007FFF")}
          alt=""
          className="rounded-3xl border-2 border-blue-500"
        />
      )}
    </div>
  );
}

export default GetUserIcon;
