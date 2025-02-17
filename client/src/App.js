import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentScreen from "./components/PaymentScreen";
import PaymentSuccess from "./components/PaymentSuccess";

function App() {
  const amount=1
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PaymentScreen amount={amount}/>} />
          <Route
            path="/payment-success"
            element={<PaymentSuccess amount={amount}/>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
