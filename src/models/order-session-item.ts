import { ProductOption } from "./product-option";

export interface OrderSessionItem {
  id: number | null;
  productOption: ProductOption;
  quantity: number;
}
