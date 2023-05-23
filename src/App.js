import "./App.css";
import Loading from "./components/Loading";
import { useContext } from "react";
import PaymentContext from "./contextAPI/PaymentContext";

function App() {
  const { loading, processPayment } = useContext(PaymentContext);

  return (
    <div className="App">
      <div className="payment-form">
        <button
          className="btn btn-primary"
          onClick={() => {
            processPayment();
          }}
        >
          Complete Purchase
        </button>
      </div>
      {loading === true ? <Loading /> : null}
    </div>
  );
}

export default App;
