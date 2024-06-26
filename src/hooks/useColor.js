"use client";
import React, { useEffect, useState } from "react";

const useColor = () => {
  const [color, setColor] = useState("");

  const generateRandomColor = () => {
    let colorString = "0123456789ABCDEF";
    let colorGenerator = "#";
    for (let i = 0; i < 6; i++) {
      let randomNumber = Math.floor(Math.random() * 16);
      colorGenerator += colorString.charAt(randomNumber);
    }
    setColor(colorGenerator);
  };

  return {
    generateRandomColor,
    color,
  };
};

export default useColor;
