import { OrderSessionItem } from "./order-session-item";

export interface OrderSession {
  id: number;
  profile_id: number;
  expires_at: string;
  orderItems: OrderSessionItem[];
}
