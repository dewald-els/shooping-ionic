import { escapeCurrencyText } from "./testUtils";

const formatter = new Intl.NumberFormat("en-ZA", {
  currency: "ZAR",
  style: "currency",
});

const formatCurrency = (amount: number): string => {
  return escapeCurrencyText(formatter.format(amount));
};

export default formatCurrency;
