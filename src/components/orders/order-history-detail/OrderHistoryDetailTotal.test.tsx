import { render } from "@testing-library/react";
import OrderHistoryDetailTotal from "./OrderHistoryDetailTotal";

describe("OrderHistoryDetailTotal", () => {
  it("displays the correct currency", () => {
    const { getByText } = render(
      <OrderHistoryDetailTotal orderTotalCurrency="R1,234.56" />
    );
    expect(getByText("R1,234.56")).toBeInTheDocument();
  });

  it("displays the 'Total' label", () => {
    const { getByText } = render(
      <OrderHistoryDetailTotal orderTotalCurrency="R1,234.56" />
    );
    expect(getByText("Total:")).toBeInTheDocument();
  });

  it("displays the cash icon", () => {
    const { getByTestId } = render(
      <OrderHistoryDetailTotal orderTotalCurrency="R1,234.56" />
    );
    expect(getByTestId("cash-icon")).toBeInTheDocument();
  });
});
