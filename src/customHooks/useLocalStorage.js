import React, { useEffect, useState } from "react";

const getSavedValue = (key, initialValue) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue !== null) {
    try {
      return JSON.parse(savedValue);
    } catch (error) {
      console.error(`Error parsing saved value for key '${key}':`, error);
    }
  }

  if (typeof initialValue === "function") {
    return initialValue();
  }

  return initialValue;
};

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
