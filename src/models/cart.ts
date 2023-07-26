export interface Cart {
  created_at: string;
  updated_at: string;
  product_options: CartProductOption[];
}

export interface CartProductOption {
  id: number;
  name: string;
  image: string;
  quantity: number;
  unit_price: number;
}
