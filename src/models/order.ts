import { ProductOption } from "./product-option";

export interface Order {
  id: number;
  created_at: string;
  profile_id: number;
  product_options: ProductOption[];
  total: number;
}
