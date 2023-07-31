import {
  IonList,
  IonItemGroup,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  useIonAlert,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import formatCurrency from "../../utils/formatCurrency";
import QuantityButtons from "../quantity-buttons/QuantityButtons";
import useAppStore from "../../store/store";

const CartOderItems = () => {
  const [presentAlert] = useIonAlert();

  const removeProductOptionFromCart = useAppStore(
    (state) => state.removeProductOptionFromCart
  );
  const cart = useAppStore((state) => state.cart);
  const productOptions = cart?.product_options || [];

  const handleRemoveItemFromCart = (productOptionId: number) => {
    const option = productOptions.find((o) => o.id === productOptionId);
    presentAlert({
      header: "Remove item from cart?",
      message: `Remove ${option?.name} from your cart?`,
      buttons: [
        "Cancel",
        {
          text: "Yes, Remove",
          cssClass: "danger",
          role: "destructive",
          handler: () => {
            removeProductOptionFromCart(productOptionId);
          },
        },
      ],
    });
  };

  return (
    <IonList>
      {productOptions.map((option) => {
        const linePrice = formatCurrency(option.unit_price * option.quantity);
        const unitPrice = formatCurrency(option.unit_price);

        return (
          <IonItemGroup key={option.id}>
            <IonItem key={"item-" + option.id} lines="none">
              <IonLabel>
                <h2>{option.name}</h2>
                <p>{unitPrice}</p>
              </IonLabel>
              <IonLabel slot="end">
                <h2>{linePrice}</h2>
              </IonLabel>
              <IonButton
                slot="end"
                color="danger"
                onClick={() => handleRemoveItemFromCart(option.id)}
              >
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            </IonItem>
            <IonItem lines="full" key={"quantity-" + option.id}>
              <QuantityButtons
                startQuantity={option.quantity}
                limit={option.stock}
                onQuantityChange={() => {}}
              />
            </IonItem>
          </IonItemGroup>
        );
      })}
    </IonList>
  );
};

export default CartOderItems;
