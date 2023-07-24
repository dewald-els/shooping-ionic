import { Category } from "../models/category";
import { Product } from "../models/product";

type CategoryWithProducts = {
  products: Product[];
} & Category;
type ProductCategories = Record<string, CategoryWithProducts>;

const groupProductsByCategory = (products: Product[]): ProductCategories => {
  return products.reduce(
    (productCategories: ProductCategories, product: Product) => {
      if (!productCategories[product.category]) {
        productCategories[product.category] = {
          ...product.categories,
          products: [],
        };
      }

      productCategories[product.category].products.push(product);

      return productCategories;
    },
    {} as ProductCategories
  );
};

export default groupProductsByCategory;
