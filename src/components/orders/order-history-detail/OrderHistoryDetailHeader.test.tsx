import { render } from "@testing-library/react";
import { Order, OrderStatus } from "../../../models/order";
import OrderHistoryDetailHeader from "./OrderHistoryDetailHeader";

describe("OrderHistoryDetailHeader", () => {
  const order = {
    id: 123,
    created_at: new Date("2022-01-01T00:00:00.000Z").toString(),
    status: OrderStatus.Created,
    profile_id: "123",
    product_options: [],
    total: 123,
    updated_at: new Date("2022-01-01T00:00:00.000Z").toString(),
  } as Order;

  it("displays the correct order ID", () => {
    const { getByText } = render(<OrderHistoryDetailHeader order={order} />);
    expect(getByText("Order #123")).toBeInTheDocument();
  });

  it("displays the correct order date", () => {
    const { getByText } = render(<OrderHistoryDetailHeader order={order} />);
    expect(getByText("Order date:")).toBeInTheDocument();
    expect(getByText("01-01-2022")).toBeInTheDocument();
  });

  it("displays correct created order status color", () => {
    const { getByTestId } = render(<OrderHistoryDetailHeader order={order} />);
    expect(getByTestId("order-status-color")).toHaveAttribute(
      "color",
      "medium"
    );
  });

  it("displays correct cancelled order status color", () => {
    const { getByTestId } = render(
      <OrderHistoryDetailHeader
        order={{
          ...order,
          status: OrderStatus.Cancelled,
        }}
      />
    );
    expect(getByTestId("order-status-color")).toHaveAttribute(
      "color",
      "danger"
    );
  });

  it("displays correct completed order status color", () => {
    const { getByTestId } = render(
      <OrderHistoryDetailHeader
        order={{
          ...order,
          status: OrderStatus.Completed,
        }}
      />
    );
    expect(getByTestId("order-status-color")).toHaveAttribute(
      "color",
      "success"
    );
  });
});
