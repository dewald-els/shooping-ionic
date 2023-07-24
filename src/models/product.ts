import { Category } from "./category";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  show: boolean;
  categories: Category;
}
