import mockData from "./__mocks__/currency.json";

type CurrencyData = typeof mockData;

export const getDailyCurrencies = async (): Promise<CurrencyData> => {
  return Promise.resolve(mockData);
  // const url = new URL("https://www.jsonkeeper.com/b/561I");
  // const headers = new Headers({
  //   "Content-Type": "application/json",
  // });
  // const response = await fetch(url, {
  //   headers,
  // });
  // if (response.ok) {
  //   return await response.json();
  // }
  // return Promise.reject(response);
};

export const getCurrencyNames = (data: CurrencyData = []) => {
  return Object.keys(data?.[0])
    .map((key) => {
      if (key === "Date") {
        return "";
      }
      return key;
    })
    .filter(Boolean);
};

export const getCurrencyValueByName = (
  currencyName: string,
  item: any
): number => {
  if (typeof item?.[currencyName] === "number") {
    return item?.[currencyName];
  }
  return NaN;
};
