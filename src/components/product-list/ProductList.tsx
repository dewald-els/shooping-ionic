import { IonIcon, IonItem, IonLabel, IonList, useIonModal } from "@ionic/react";
import { flowerOutline, sparklesOutline, waterOutline } from "ionicons/icons";
import { Product } from "../../models/product";
import groupProductsByCategory from "../../utils/groupProductsByCategory";
import ProductListItem from "./ProductListItem";

type ProductListProps = {
  products: Product[];
  onProductClick: (product: Product) => void;
};

const ProductList: React.FC<ProductListProps> = (props) => {
  const { products, onProductClick } = props;

  const productCategories = groupProductsByCategory(products);
  const productCategoryList = Object.keys(productCategories).map(
    (categoryKey: string) => {
      const category = productCategories[categoryKey];
      return (
        <IonList key={category.id}>
          <IonItem lines="none">
            <IonLabel>
              <h1>{category.name}</h1>
            </IonLabel>
          </IonItem>
          {category.products.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              onProductClick={onProductClick}
            />
          ))}
        </IonList>
      );
    }
  );

  return <div>{productCategoryList}</div>;
};

export default ProductList;
