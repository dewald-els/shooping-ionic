import { useState } from "react";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonItem,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToolbar,
  RadioGroupChangeEventDetail,
  useIonToast,
} from "@ionic/react";
import useProductOptions from "../../hooks/useProductOptions";
import useAppStore from "../../store/store";
import { ProductOption } from "../../models/product-option";
import formatCurrency from "../../utils/formatCurrency";
import ProductOptionsLoader from "./ProductOptionsLoader";
import { basketOutline } from "ionicons/icons";
import QuantityButtons from "../quantity-buttons/QuantityButtons";
import ProductOptionsModalTitle from "./ProductOptionsModalTitle";
import ProductOptionsModalImage from "./ProductOptionsModalImage";

type ProductOptionsModalProps = {
  onDismiss: () => void;
};

const ProductOptionsModal: React.FC<ProductOptionsModalProps> = (props) => {
  const { onDismiss } = props;
  const [presentToast, dismissToast] = useIonToast();
  const selectedProduct = useAppStore((state) => state.selectedProduct);
  const addToCart = useAppStore((state) => state.addToCart);
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
      setQuantity(0);
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

    await presentToast({
      icon: basketOutline,
      message: `Added ${quantity} x ${selectedProductOption.name} to order`,
      duration: 5000,
      color: "dark",
      position: "top",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            dismissToast();
          },
        },
      ],
    });
  };

  const priceToAdd = formatCurrency(
    selectedProductOption ? selectedProductOption.price * quantity : 0
  );

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
            <IonRadioGroup onIonChange={handleOptionChange}>
              {productOptions.map((option: ProductOption) => {
                const optionDisplayPrice = formatCurrency(option.price);
                return (
                  <IonItem key={option.id}>
                    <IonRadio
                      mode="md"
                      labelPlacement="end"
                      justify="start"
                      value={option.id}
                      disabled={option.stock <= 0}
                    >
                      {option.name}
                    </IonRadio>
                    {option.stock > 0 && (
                      <span slot="end">{optionDisplayPrice}</span>
                    )}
                    {option.stock <= 0 && (
                      <IonText color="danger" slot="end">
                        <span>Out of stock</span>
                      </IonText>
                    )}
                  </IonItem>
                );
              })}
            </IonRadioGroup>
          </>
        )}
      </IonContent>
      <IonFooter slot="bottom">
        <IonToolbar>
          <div className="flex justify-between items-center ion-padding-start ion-padding-end">
            <QuantityButtons
              limit={selectedProductOption?.stock || 0}
              onQuantityChange={handleQuantityChange}
            />
            <div>
              <div>
                <IonButton onClick={handleAddClick}>
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
