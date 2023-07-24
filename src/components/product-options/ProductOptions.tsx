import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Product } from "../../models/product";

type ProductOptionsModalProps = {
  onDismiss: () => void;
};

const ProductOptionsModal: React.FC<ProductOptionsModalProps> = (props) => {
  const { onDismiss } = props;
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
      <IonContent></IonContent>
      <IonFooter slot="bottom">
        <IonToolbar>alsjdlasjkd</IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ProductOptionsModal;
