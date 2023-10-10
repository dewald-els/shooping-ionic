export interface DeliveryOption {
  id: number;
  name: string;
  description?: string;
  price: number;
  active: boolean;
  order: number;
  requires_address: boolean;
}
