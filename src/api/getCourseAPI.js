import axios from "axios";

export const getCourse = async () => {
  try {
    const response = await axios.get(
      "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
