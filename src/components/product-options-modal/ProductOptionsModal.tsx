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
} from "@ionic/react";
import useProductOptions from "../../hooks/useProductOptions";
import useAppStore from "../../store/store";
import { ProductOption } from "../../models/product-option";
import formatCurrency from "../../utils/formatCurrency";

type ProductOptionsModalProps = {
  onDismiss: () => void;
};

const ProductOptionsModal: React.FC<ProductOptionsModalProps> = (props) => {
  const { onDismiss } = props;
  const selectedProduct = useAppStore((state) => state.selectedProduct);
  const { productOptions = [], error } = useProductOptions(selectedProduct);
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

        <IonRadioGroup>
          {productOptions.map((option: ProductOption) => {
            const optionDisplayPrice = formatCurrency(option.price);
            return (
              <IonItem key={option.id}>
                <IonRadio mode="md" labelPlacement="end" justify="start">
                  {option.name}
                </IonRadio>
                <span slot="end">{optionDisplayPrice}</span>
              </IonItem>
            );
          })}
        </IonRadioGroup>
      </IonContent>
      <IonFooter slot="bottom">
        <IonToolbar>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <IonButton fill="outline">-</IonButton>
              <IonText>
                <span>0</span>
              </IonText>
              <IonButton>+</IonButton>
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
