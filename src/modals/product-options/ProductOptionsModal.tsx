import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToolbar,
  RadioGroupChangeEventDetail,
  useIonAlert,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import useProductOptions from "../../hooks/useProductOptions";
import useAppStore from "../../store/store";
import { ProductOption } from "../../models/product-option";
import formatCurrency from "../../utils/formatCurrency";
import ProductOptionsLoader from "./ProductOptionsLoader";
import { basketOutline, cartOutline } from "ionicons/icons";
import ProductOptionsModalTitle from "./ProductOptionsModalTitle";
import ProductOptionsModalImage from "./ProductOptionsModalImage";
import QuantityButtons from "../../components/shared/quantity-buttons/QuantityButtons";

type ProductOptionsModalProps = {
  onDismiss: () => void;
};

const ProductOptionsModal: React.FC<ProductOptionsModalProps> = (props) => {
  const { onDismiss } = props;
  const [presentAlert] = useIonAlert();
  const selectedProduct = useAppStore((state) => state.selectedProduct);
  const addToCart = useAppStore((state) => state.addToCart);
  const cart = useAppStore((state) => state.cart);
  const [selectedProductOption, setSelectedProductOption] =
    useState<ProductOption | null>(null);
  const { productOptions = [], error } = useProductOptions(selectedProduct);
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleOptionChange = (e: CustomEvent<RadioGroupChangeEventDetail>) => {
    const id: number | null = e.detail?.value ?? null;
    const productOption = productOptions.find((option) => option.id === id);
    if (productOption) {
      setSelectedProductOption(productOption);
      setQuantity(1);
    }
  };

  const handleAddClick = async () => {
    if (!selectedProduct || !selectedProductOption || quantity === 0) return;

    addToCart({
      id: selectedProductOption.id,
      name: selectedProductOption.name,
      unit_price: selectedProductOption.price || 0,
      quantity,
      stock: selectedProductOption.stock,
      image: selectedProduct?.image,
    });

    // Update local stock.

    presentAlert({
      message: `Successfully added ${quantity} ${selectedProductOption.name} to the order`,
      buttons: ["Ok"],
      onDidDismiss: () => {
        setQuantity(0);
      },
    });
  };

  const priceToAdd = formatCurrency(
    selectedProductOption ? selectedProductOption.price * quantity : 0
  );

  let selectedProductOptionAvailableStock = selectedProductOption?.stock;
  if (selectedProductOption) {
    const orderProductOption = cart?.product_options.find(
      (option) => option.id === selectedProductOption?.id
    );
    if (orderProductOption) {
      selectedProductOptionAvailableStock =
        selectedProductOption.stock - orderProductOption.quantity;
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{selectedProduct?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {productOptions.length === 0 && <ProductOptionsLoader />}

        {selectedProduct && productOptions.length > 0 && (
          <>
            <ProductOptionsModalImage product={selectedProduct} />
            <ProductOptionsModalTitle product={selectedProduct} />
            <IonList>
              <IonRadioGroup onIonChange={handleOptionChange}>
                {productOptions.map((option: ProductOption) => {
                  const optionDisplayPrice = formatCurrency(option.price);

                  let optionAvailableStock = option?.stock;

                  const orderProductOption = cart?.product_options.find(
                    (orderOption) => option.id === orderOption.id
                  );

                  if (orderProductOption) {
                    optionAvailableStock =
                      option.stock - orderProductOption.quantity;
                  }

                  return (
                    <IonItem key={option.id}>
                      <IonRadio
                        mode="md"
                        labelPlacement="end"
                        justify="start"
                        value={option.id}
                        disabled={optionAvailableStock <= 0}
                      >
                        {option.name}
                      </IonRadio>
                      {optionAvailableStock > 0 && (
                        <span slot="end">{optionDisplayPrice}</span>
                      )}
                      {optionAvailableStock <= 0 && (
                        <IonText color="danger" slot="end">
                          <span>Out of stock</span>
                        </IonText>
                      )}
                    </IonItem>
                  );
                })}
              </IonRadioGroup>
            </IonList>
          </>
        )}
      </IonContent>
      <IonFooter slot="bottom">
        <IonToolbar>
          <div className="flex justify-between items-center ion-padding-start ion-padding-end">
            <QuantityButtons
              quantity={quantity}
              limit={selectedProductOptionAvailableStock || 0}
              onQuantityChange={handleQuantityChange}
            />
            <div>
              <div>
                <IonButton onClick={handleAddClick} disabled={quantity === 0}>
                  <div className="flex gap-1 items-center">
                    <span>Add</span>
                    <span>{priceToAdd}</span>
                  </div>
                </IonButton>
              </div>
            </div>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ProductOptionsModal;
