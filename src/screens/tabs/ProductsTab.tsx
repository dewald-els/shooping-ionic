import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import ProductList from "../../components/product-list/ProductList";
import useProducts from "../../hooks/useProducts";

const ProductsTabScreen: React.FC = () => {
  const { products } = useProducts();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProductList products={products} />
      </IonContent>
    </IonPage>
  );
};

export default ProductsTabScreen;
