import axios from "axios";

export const getCourse = async () => {

  // Через помилку запитів до API ПриватБанку (CORS), я вирішив зберегти дані заздалегідь. У випадку, коли
  // потрібно отримати актуальні дані та обійти CORS, я знайшов вихід, використовуючи сервіс CORS Anywhere.
  // Щоб ним скористатися, необхідно перейти за посиланням та ввімкнути тимчасове використання, та убрати 
  // коментарі на строчці запросу

  // Перейти за - cors-anywhere.herokuapp.com/corsdemo

  try {
    let requestData = {
      data: [
        { ccy: "EUR", base_ccy: "UAH", buy: "45.55000", sale: "46.55000" },
        { ccy: "USD", base_ccy: "UAH", buy: "41.00000", sale: "41.60000" },
      ],
    };

    // requestData = await axios.get(
    //   "https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5"
    // );
    
    return requestData;
  } catch (error) {
    console.log(error);
  }
};
