import { render, fireEvent, screen } from "@testing-library/react";
import CartOrderItems from "./CartOrderItems";
import { Cart, CartProductOption } from "../../models/cart";

describe("CartOrderItems", () => {
  const cart = {
    product_options: [
      {
        id: 1,
        name: "Product 1",
        unit_price: 15.0,
        quantity: 2,
      },
      {
        id: 2,
        name: "Product 2",
        unit_price: 20.0,
        quantity: 1,
      },
    ] as CartProductOption[],
  } as Cart;

  it("displays the correct product name and unit price", async () => {
    const { getByText, getByTestId, findAllByTestId } = render(
      <CartOrderItems cart={cart} />
    );
    const linePrices = await findAllByTestId("line-price");
    const unitPrices = await findAllByTestId("unit-price");

    expect(getByText("2 x Product 1")).toBeInTheDocument();
    expect(getByText("1 x Product 2")).toBeInTheDocument();

    expect(unitPrices[0].textContent).toBe("R 15,00");
    expect(unitPrices[1].textContent).toBe("R 20,00");

    expect(linePrices[0].textContent).toBe("R 30,00");
    expect(linePrices[1].textContent).toBe("R 20,00");
  });
});
