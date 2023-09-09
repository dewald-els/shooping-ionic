import { OrderStatus } from "../models/order";

/**
 * Map order status to an Ionic color
 */
const OrderStatusToColorMap: Record<OrderStatus, string> = {
  [OrderStatus.Accepted]: "primary",
  [OrderStatus.Cancelled]: "danger",
  [OrderStatus.Completed]: "success",
  [OrderStatus.Created]: "medium",
  [OrderStatus.Unknown]: "medium",
};

export default OrderStatusToColorMap;
