import formatCurrency from "./formatCurrency";

describe("formatCurrency", () => {
  it("formats positive currency correctly", () => {
    expect(formatCurrency(1234.56)).toBe("R1,234.56");
  });

  it("formats negative currency correctly", () => {
    expect(formatCurrency(-1234.56)).toBe("-R1,234.56");
  });

  it("formats zero currency correctly", () => {
    expect(formatCurrency(0)).toBe("R0.00");
  });
});
