"use client";

import { useEffect, useState } from "react";

const useAnimation = () => {
  const initialValue = {
    bounce: "",
    shake: "",
    fade: "",
    float: "",
  };
  const [them, setThem] = useState(initialValue);
  const [selectedThem, setSelectedThem] = useState("bounce");
  const handlerThemChange = (e) => {
    const { name, value } = e.target;
    setThem((preValue) => {
      return {
        ...initialValue,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    for (const [key, value] of Object.entries(them)) {
      value && setSelectedThem(value);
    }
  }, [them]);
  return {
    selectedThem,
    handlerThemChange,
  };
};

export default useAnimation;
