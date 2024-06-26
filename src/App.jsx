import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [Exchangerate, setExchangerate] = useState(null);
  useEffect(() => {
    const getExchangerate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const responce = await axios.get(url);
        console.log(responce);
        setExchangerate(responce.data.rates[toCurrency]);
      } catch (error) {
        console.error("Error in fetching the data:", error);
      }
    };
    getExchangerate();
  }, [fromCurrency, toCurrency]);
  useEffect(() => {
    if (Exchangerate !== null) {
      setConvertedAmount((amount * Exchangerate).toFixed(2));
    }
  }, [amount, Exchangerate]);
  const HandleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };
  const HandleToCurrency = (e) => {
    setToCurrency(e.target.value);
  };
  const HandleFromCurrency = (e) => {
    setFromCurrency(e.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="image"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="inputContainer">
            <label htmlFor="amount"> Amount:</label>
            <input
              type="number"
              id="amount"
              placeholder="Enter Amount"
              value={amount}
              onChange={HandleAmountChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="fromCurrency"> From Currency:</label>
            <select
              name="currency"
              id="fromCurrency"
              value={fromCurrency}
              onChange={HandleFromCurrency}
            >
              <option value="USD">USD-United State Dollar</option>
              <option value="EUR">EUR-Euro</option>
              <option value="GBP">GBP-British Pound Sterling</option>
              <option value="JPY">JPY-Japanese Yen</option>
              <option value="AUD">AUD-Australian Dollar</option>
              <option value="CAD">Canadian Dollar</option>
              <option value="CNY">CNY-Chinese Yuan</option>
              <option value="INR">INR-Indian Rupees</option>
              <option value="BRL">BRL-Brazilian Real</option>
              <option value="ZAR">ZAR-South African Rand</option>
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="toCurrency"> To Currency:</label>
            <select
              name="currency"
              id="toCurrency"
              value={toCurrency}
              onChange={HandleToCurrency}
            >
              <option value="USD">USD-United State Dollar</option>
              <option value="EUR">EUR-Euro</option>
              <option value="GBP">GBP-British Pound Sterling</option>
              <option value="JPY">JPY-Japanese Yen</option>
              <option value="AUD">AUD-Australian Dollar</option>
              <option value="CAD">Canadian Dollar</option>
              <option value="CNY">CNY-Chinese Yuan</option>
              <option value="INR">INR-Indian Rupees</option>
              <option value="BRL">BRL-Brazilian Real</option>
              <option value="ZAR">ZAR-South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>
              {amount} {fromCurrency} IS EQUAL TO {convertedAmount} {toCurrency}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
