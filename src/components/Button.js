"use client";
import React from "react";

const Button = ({ name, value, className, ...props }) => {
  return (
    <input
      className={`p-2 ${className} border rounded-xl cursor-pointer`}
      type="button"
      name={name}
      defaultValue={value}
      {...props}
    />
  );
};

export default Button;
