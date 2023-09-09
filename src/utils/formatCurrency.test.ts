import formatCurrency from "./formatCurrency";

const escapeResult = (result: string) =>
  result.replace(/\s/g, " ").replace("R", "R");

describe("formatCurrency", () => {
  it("formats positive currency correctly", () => {
    const result = formatCurrency(1234.56);
    const fixed = escapeResult(result);
    expect(fixed).toBe("R 1 234,56");
  });

  it("formats negative currency correctly", () => {
    const result = formatCurrency(-1234.56);
    const fixed = escapeResult(result);
    expect(fixed).toBe("-R 1 234,56");
  });

  it("formats zero currency correctly", () => {
    const result = formatCurrency(0);
    const fixed = escapeResult(result);
    expect(fixed).toBe("R 0,00");
  });
});
