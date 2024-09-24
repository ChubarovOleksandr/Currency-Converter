import { useEffect, useState } from "react";
import { getCourse } from "../api/getCourseAPI";
import CurrencyBlock from "./CurrencyBlock";
import "../scss/components/App.scss";

function App() {
  const [firstCurrencyData, setFirstCurrencyData] = useState("EUR");
  const [firstCurrencyAmount, setFirstCurrencyAmount] = useState("");
  const [secondCurrencyData, setSecondCurrencyData] = useState("UAH");
  const [secondCurrencyAmount, setSecondCurrencyAmount] = useState("");

  const [exchangeRate, setExchangeRate] = useState([]);

  const calculateRate = (fromCurrency, toCurrency, amount, currencyNumber) => {
    const fromRate = exchangeRate.find((rate) => rate.ccy === fromCurrency);
    const toRate = exchangeRate.find((rate) => rate.ccy === toCurrency);

    let result;

    if (fromCurrency === "UAH") {
      result = amount / toRate.buy;
    } else if (toCurrency === "UAH") {
      result = amount * fromRate.sale;
    } else {
      result = (amount * fromRate.sale) / toRate.buy;
    }

    currencyNumber === "first" ? setFirstCurrencyAmount(amount) : setSecondCurrencyAmount(amount);

    return result.toFixed(2);
  };

  const onCurrencyDataChange = (newCode, currencyNumber) => {
    if (currencyNumber === "first" && newCode != secondCurrencyData) {
      setFirstCurrencyData(newCode);
      setFirstCurrencyAmount(
        calculateRate(firstCurrencyData, newCode, firstCurrencyAmount, currencyNumber)
      );
    } else if (currencyNumber === "second" && newCode != firstCurrencyData) {
      setSecondCurrencyData(newCode);
      setSecondCurrencyAmount(
        calculateRate(firstCurrencyData, newCode, firstCurrencyAmount, currencyNumber)
      );
    }
  };

  const onCurrencyAmountChange = (newValue, currencyNumber) => {
    currencyNumber === "first"
      ? setSecondCurrencyAmount(
          calculateRate(firstCurrencyData, secondCurrencyData, newValue, currencyNumber)
        )
      : setFirstCurrencyAmount(
          calculateRate(secondCurrencyData, firstCurrencyData, newValue, currencyNumber)
        );
  };

  useEffect(() => {
    getCourse().then((result) => {      
      setExchangeRate(result.data);
    });
  }, []);

  return (
    <div className="wrapper">
      <CurrencyBlock
        currencyData={firstCurrencyData}
        currencyAmount={firstCurrencyAmount}
        onCurrencyDataChange={(value) => onCurrencyDataChange(value, "first")}
        onCurrencyAmountChange={(value) => onCurrencyAmountChange(value, "first")}
      />
      <span>-</span>
      <CurrencyBlock
        currencyData={secondCurrencyData}
        currencyAmount={secondCurrencyAmount}
        onCurrencyDataChange={(value) => onCurrencyDataChange(value, "second")}
        onCurrencyAmountChange={(value) => onCurrencyAmountChange(value, "second")}
      />
    </div>
  );
}

export default App;
