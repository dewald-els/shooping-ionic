import { OrderStatus } from "../models/order";

const OrderStatusToColorMap: Record<OrderStatus, string> = {
  [OrderStatus.Accepted]: "primary",
  [OrderStatus.Cancelled]: "danger",
  [OrderStatus.Completed]: "success",
  [OrderStatus.Created]: "medium",
};

export default OrderStatusToColorMap;
