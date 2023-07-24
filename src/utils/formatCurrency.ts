const formatter = new Intl.NumberFormat("en-ZA", {
  currency: "ZAR",
  style: "currency",
});

const formatCurrency = (amount: number): string => {
  return formatter.format(amount);
};

export default formatCurrency;
