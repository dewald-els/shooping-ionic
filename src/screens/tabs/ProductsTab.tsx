import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";

import ProductList from "../../components/product-list/ProductList";
import useProducts from "../../hooks/useProducts";
import { useRef } from "react";
import ProductOptionsModal from "../../components/product-options-modal/ProductOptionsModal";
import { Product } from "../../models/product";
import useAppStore from "../../store/store";

const ProductsTabScreen: React.FC = () => {
  const { products } = useProducts();
  const setSelectedProduct = useAppStore((state) => state.setSelectedProduct);
  const clearSelectedProduct = useAppStore(
    (state) => state.clearSelectedProduct
  );
  const pageRef = useRef();

  const [presentProductOptions, dismissProductOptions] = useIonModal(
    ProductOptionsModal,
    {
      onDismiss: () => dismissProductOptions(),
    }
  );

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    presentProductOptions({
      presentingElement: pageRef.current,
      onDidDismiss: () => {
        console.log("Dismissing?");
        clearSelectedProduct();
      },
    });
  };

  return (
    <IonPage ref={pageRef}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProductList products={products} onProductClick={handleProductClick} />
      </IonContent>
    </IonPage>
  );
};

export default ProductsTabScreen;
