import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  SearchbarChangeEventDetail,
  useIonModal,
} from "@ionic/react";

import ProductList from "../../components/products/product-list/ProductList";
import useProducts from "../../hooks/useProducts";
import { useRef, useState } from "react";
import { Product } from "../../models/product";
import useAppStore from "../../store/store";
import CartToolbarButton from "../../components/cart/CartToolbarButton";
import ProductOptionsModal from "../../modals/product-options/ProductOptionsModal";

const ProductsTabScreen: React.FC = () => {
  const pageRef = useRef();

  const { products } = useProducts();
  const setSelectedProduct = useAppStore((state) => state.setSelectedProduct);
  const clearSelectedProduct = useAppStore(
    (state) => state.clearSelectedProduct
  );

  const [presentProductOptions, dismissProductOptions] = useIonModal(
    ProductOptionsModal,
    {
      onDismiss: () => dismissProductOptions(),
    }
  );

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    presentProductOptions({
      presentingElement: pageRef.current,
      onDidDismiss: () => clearSelectedProduct(),
    });
  };

  const handleSearchInputChange = (
    event: CustomEvent<SearchbarChangeEventDetail>
  ) => {
    setSearchTerm(event.detail.value ?? "");
  };

  const loweredSearchTerm = searchTerm.toLowerCase();
  const filteredProducts =
    searchTerm.trim() === ""
      ? products
      : products.filter((product) => {
          return (
            product.name.toLowerCase().includes(loweredSearchTerm) ||
            product.category.toLowerCase().includes(loweredSearchTerm) ||
            product.description.toLowerCase().includes(loweredSearchTerm)
          );
        });

  return (
    <IonPage ref={pageRef}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Products</IonTitle>
          <CartToolbarButton />
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar onIonInput={handleSearchInputChange} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProductList
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductsTabScreen;
