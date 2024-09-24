import clearIcon from "../assets/clear.png";

/* eslint-disable react/prop-types */
const CurrencyBlock = ({currencyData, currencyAmount, onCurrencyDataChange, onCurrencyAmountChange}) => {
  
  const currencyList = [
    { code: "EUR", name: "Євро" },
    { code: "USD", name: "Долари" },
    { code: "UAH", name: "Гривні" },
  ];

  return (
    <div className="currency-block">
      Оберіть валюту
      <select value={currencyData} onChange={(e) => onCurrencyDataChange(e.target.value)}>
        {currencyList.map((currencyItem) => (
          <option key={currencyItem.code} value={currencyItem.code}>
            {currencyItem.name}
          </option>
        ))}
      </select>
      <label>
        <input
          value={currencyAmount}
          onChange={(e) => onCurrencyAmountChange(e.target.value)}
          type="number"
          placeholder="Введіть кількість..."
        />
        {currencyAmount && (
          <button className="clear" onClick={() => onCurrencyAmountChange(1)}>
            <img src={clearIcon} alt="clear field" />
          </button>
        )}
      </label>
    </div>
  );
};

export default CurrencyBlock;
