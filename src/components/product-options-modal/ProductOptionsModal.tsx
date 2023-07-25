import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
  RadioGroupChangeEventDetail,
} from "@ionic/react";
import useProductOptions from "../../hooks/useProductOptions";
import useAppStore from "../../store/store";
import { ProductOption } from "../../models/product-option";
import formatCurrency from "../../utils/formatCurrency";
import { useState } from "react";

type ProductOptionsModalProps = {
  onDismiss: () => void;
};

enum QuantityAction {
  Add,
  Remove,
}

const ProductOptionsModal: React.FC<ProductOptionsModalProps> = (props) => {
  const { onDismiss } = props;
  const selectedProduct = useAppStore((state) => state.selectedProduct);
  const [selectedProductOption, setSelectedProductOption] =
    useState<ProductOption | null>(null);
  const { productOptions = [], error } = useProductOptions(selectedProduct);
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (action: QuantityAction) => {
    switch (action) {
      case QuantityAction.Add:
        setQuantity((qty) => qty + 1);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Product options</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {productOptions.length === 0 && (
          <IonList>
            <IonItem>
              <IonLabel>
                <h3>
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "80%" }}
                  ></IonSkeletonText>
                </h3>
                <p>
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "60%" }}
                  ></IonSkeletonText>
                </p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h3>
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "80%" }}
                  ></IonSkeletonText>
                </h3>
                <p>
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "60%" }}
                  ></IonSkeletonText>
                </p>
              </IonLabel>
            </IonItem>
          </IonList>
        )}

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
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <IonButton
                fill="outline"
                onClick={() => handleQuantityChange(QuantityAction.Remove)}
              >
                -
              </IonButton>
              <IonText>
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
                <IonButton>Add</IonButton>
              </div>
            </div>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ProductOptionsModal;
