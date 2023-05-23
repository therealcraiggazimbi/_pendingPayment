import React, { useContext, useEffect, useState } from "react";
import "../css/Loading.css";
import LOADING from "../assets/GIF/loading.gif";
import PaymentContext from "../contextAPI/PaymentContext";

const Loading = () => {
  const { status, remainingTime } = useContext(PaymentContext);
  const [countdown, setCountdown] = useState(remainingTime);

  useEffect(() => {
    let timer;
    if (status === "failed" && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Update countdown every second
    } else if (status === "failed" && countdown === 0) {
      setCountdown(180);
    }

    return () => clearTimeout(timer);
  }, [status, countdown]);

  return (
    <div className="loading">
      <div className="loading-child">
        <h2>Processing Payment</h2>
        <div>
          <img src={LOADING} alt="Loading" />
        </div>

        {status === "failed" && countdown > 0 && (
          <div>
            <h3>Payment failed, retrying in {countdown} seconds</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;
