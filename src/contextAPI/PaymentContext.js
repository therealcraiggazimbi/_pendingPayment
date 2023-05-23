import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../customHooks/useLocalStorage";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [loading, setIsLoading] = useLocalStorage("loading", false);
  const [status, setStatus] = useLocalStorage("status", "");
  const [attempts, setAttempts] = useLocalStorage("attempts", 0);
  const [seconds, setSeconds] = useLocalStorage("timer", 120);
  const [remainingTime, setRemainingTime] = useLocalStorage("remaining", 120);

  useEffect(() => {
    if (attempts > 1) {
      setSeconds(180);
      setRemainingTime(180);
    }
  }, [attempts]);

  /*
     PROCESS PAYMENT
  */
  const processPayment = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/api/status");
      setStatus(response.data.status);
      setIsLoading(false);
    } catch (error) {
      setAttempts((prev) => prev + 1);
      setStatus("failed");

      setTimeout(() => {
        processPayment();
      }, seconds * 1000);
    }
  };

  console.log(seconds);
  return (
    <PaymentContext.Provider
      value={{ loading, processPayment, status, seconds, remainingTime }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
