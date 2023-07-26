import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useAppStore from "../../store/store";
import formatCurrency from "../../utils/formatCurrency";
import { closeOutline, trashBinOutline } from "ionicons/icons";

const CartScreen: React.FC = () => {
  const cart = useAppStore((state) => state.cart);
  const productOptions = [];

  if (cart) {
    productOptions.push(...cart.product_options);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/products" />
          </IonButtons>
          <IonTitle>Cart</IonTitle>
          <IonButtons slot="end">
            <IonButton slot="start">
              <IonIcon slot="icon-only" icon={trashBinOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {productOptions.map((option) => {
            const linePrice = formatCurrency(
              option.unit_price * option.quantity
            );
            const unitPrice = formatCurrency(option.unit_price);

            return (
              <IonItem>
                <IonLabel>
                  <h2>
                    {option.quantity} x {option.name}
                  </h2>
                  <p>{unitPrice}</p>
                </IonLabel>
                <IonLabel slot="end">
                  <h2>{linePrice}</h2>
                </IonLabel>
                <IonButton slot="end" color="danger">
                  <IonIcon slot="icon-only" icon={closeOutline} />
                </IonButton>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton slot="end">Confirm Order</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default CartScreen;
