import { CartProductOption } from "./cart";
import { ProductOption } from "./product-option";

export interface Order {
  id?: number;
  created_at?: string;
  updated_at?: string;
  profile_id: string;
  product_options: CartProductOption[];
  total: number;
  status: OrderStatus;
  delivery_option_id: number;
}

export enum OrderStatus {
  Created = "Created",
  Accepted = "Accepted",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Unknown = "Unknown",
}
