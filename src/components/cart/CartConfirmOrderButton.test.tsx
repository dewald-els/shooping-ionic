import { render, fireEvent } from "@testing-library/react";
import { checkmarkCircleOutline } from "ionicons/icons";
import CartConfirmOrderButton from "./CartConfirmOrderButton";

describe("CartConfirmOrderButton", () => {
  const onCartConfirmedMock = vi.fn();

  it("displays the correct cart total currency", () => {
    const { getByText } = render(
      <CartConfirmOrderButton
        cartTotalCurrency="R1 234,56"
        onCartConfirmed={onCartConfirmedMock}
      />
    );
    expect(getByText("Confirm Order R1 234,56")).toBeInTheDocument();
  });

  it("calls the onCartConfirmed callback when clicked", () => {
    const { getByText } = render(
      <CartConfirmOrderButton
        cartTotalCurrency="R1 234,56"
        onCartConfirmed={onCartConfirmedMock}
      />
    );
    fireEvent.click(getByText("Confirm Order R1 234,56"));
    expect(onCartConfirmedMock).toHaveBeenCalled();
  });

  it("displays the checkmark circle icon", () => {
    const { getByTestId } = render(
      <CartConfirmOrderButton
        cartTotalCurrency="R1,234.56"
        onCartConfirmed={onCartConfirmedMock}
      />
    );
    expect(getByTestId("checkmark-circle-icon")).toBeInTheDocument();
  });
});
