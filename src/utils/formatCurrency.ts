import { escapeCurrencyText } from "./testUtils";

const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

const formatCurrency = (amount: number): string => {
  return escapeCurrencyText(formatter.format(amount));
};

export default formatCurrency;
