import { IonButtons, IonButton, IonIcon, useIonAlert } from "@ionic/react";
import { trashBinOutline } from "ionicons/icons";
import useAppStore from "../../store/store";

const CartClearAllButton: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const clearCart = useAppStore((state) => state.clearCart);

  const handleClearCartClick = () => {
    presentAlert({
      header: "Clear cart?",
      message: `Remove all items from your cart?`,
      buttons: [
        "Cancel",
        {
          text: "Yes, Clear",
          cssClass: "danger",
          role: "destructive",
          handler: () => {
            clearCart();
          },
        },
      ],
    });
  };

  return (
    <IonButtons slot="end">
      <IonButton onClick={handleClearCartClick}>
        <IonIcon slot="start" icon={trashBinOutline} />
        Clear
      </IonButton>
    </IonButtons>
  );
};

export default CartClearAllButton;
