import formatCurrency from "./formatCurrency";

describe("formatCurrency", () => {
  it("formats positive currency correctly", () => {
    const result = formatCurrency(1234);
    const expected = "R 1 234,00";
    console.log(result.trim(), expected);

    expect(result).toBe(expected);
  });

  it("formats negative currency correctly", () => {
    expect(formatCurrency(-1234.56)).toBe("-R 1 234,56");
  });

  it("formats zero currency correctly", () => {
    expect(formatCurrency(0)).toBe("R 0,00");
  });
});
