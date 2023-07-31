import { CartProductOption } from "./cart";
import { ProductOption } from "./product-option";

export interface Order {
  id?: number;
  created_at?: string;
  profile_id: string;
  product_options: CartProductOption[];
  total: number;
}
