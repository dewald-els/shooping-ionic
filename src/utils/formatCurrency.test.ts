import formatCurrency from "./formatCurrency";
import { escapeCurrencyText } from "./testUtils";

describe("formatCurrency", () => {
  it("formats positive currency correctly", () => {
    const result = formatCurrency(1234.56);
    expect(result).toBe("R 1 234,56");
  });

  it("formats negative currency correctly", () => {
    const result = formatCurrency(-1234.56);

    expect(result).toBe("-R 1 234,56");
  });

  it("formats zero currency correctly", () => {
    const result = formatCurrency(0);
    expect(result).toBe("R 0,00");
  });
});
