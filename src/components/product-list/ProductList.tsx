import { IonIcon, IonItem, IonLabel, IonList, useIonModal } from "@ionic/react";
import { flowerOutline, sparklesOutline, waterOutline } from "ionicons/icons";
import { Product } from "../../models/product";
import groupProductsByCategory from "../../utils/groupProductsByCategory";
import ProductListItem from "./ProductListItem";
import ProductOptionsModal from "../product-options/ProductOptions";

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = (props) => {
  const { products } = props;
  const [present, dismiss] = useIonModal(ProductOptionsModal, {
    onDismiss: () => {
      dismiss();
    },
  });

  const handleProductClick = (product: Product) => {
    present();
  };

  const productCategories = groupProductsByCategory(products);
  const productCategoryList = Object.keys(productCategories).map(
    (categoryKey: string) => {
      const category = productCategories[categoryKey];
      return (
        <IonList key={category.id}>
          <IonItem
            lines="none"
            style={{
              color: category.color,
            }}
          >
            <IonIcon
              icon={flowerOutline}
              slot="start"
              style={{
                color: category.color,
              }}
            />
            <IonLabel>
              <h1>{category.name}</h1>
            </IonLabel>
          </IonItem>
          {category.products.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
            />
          ))}
        </IonList>
      );
    }
  );

  return (
    <>
      <div>{productCategoryList}</div>
    </>
  );
};

export default ProductList;
