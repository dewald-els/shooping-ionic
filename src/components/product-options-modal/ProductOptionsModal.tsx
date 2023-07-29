import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
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

type ProductOptionsModalProps = {
  onDismiss: () => void;
};

enum QuantityAction {
  Add,
  Remove,
}

const ProductOptionsModal: React.FC<ProductOptionsModalProps> = (props) => {
  const { onDismiss } = props;
  const [presentToast, dismissToast] = useIonToast();
  const selectedProduct = useAppStore((state) => state.selectedProduct);
  const addToCart = useAppStore((state) => state.addToCart);
  const [selectedProductOption, setSelectedProductOption] =
    useState<ProductOption | null>(null);
  const { productOptions = [], error } = useProductOptions(selectedProduct);
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (action: QuantityAction) => {
    switch (action) {
      case QuantityAction.Add:
        setQuantity((qty) =>
          qty < (selectedProductOption?.stock || 0) ? qty + 1 : qty
        );
        break;
      case QuantityAction.Remove:
        setQuantity((qty) => (qty > 0 ? qty - 1 : 0));
        break;
      default:
        return;
    }
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
          <IonTitle>Product options</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {productOptions.length === 0 && <ProductOptionsLoader />}

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
      </IonContent>
      <IonFooter slot="bottom">
        <IonToolbar>
          <div className="flex justify-between items-center ion-padding-start ion-padding-end">
            <div className="flex items-center gap-1">
              <IonButton
                fill="outline"
                onClick={() => handleQuantityChange(QuantityAction.Remove)}
              >
                -
              </IonButton>
              <IonText className="font-bold text-lg">
                <span>{quantity}</span>
              </IonText>
              <IonButton
                onClick={() => handleQuantityChange(QuantityAction.Add)}
              >
                +
              </IonButton>
            </div>
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
