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
import useAppStore from "../../store/store";
import { Cart } from "../../models/cart";

type CartOrderItemsProps = {
  cart: Cart | null;
};

const CartOderItems: React.FC<CartOrderItemsProps> = (props) => {
  const [presentAlert] = useIonAlert();

  const removeProductOptionFromCart = useAppStore(
    (state) => state.removeProductOptionFromCart
  );
  // const cart = useAppStore((state) => state.cart);
  const { cart } = props;
  const productOptions = cart?.product_options || [];

  const handleRemoveItemFromCart = (productOptionId: number) => {
    const option = productOptions.find((o) => o.id === productOptionId);
    presentAlert({
      header: "Remove from cart?",
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
            <IonItem key={"item-" + option.id}>
              <IonLabel>
                <h2>
                  {option.quantity} x {option.name}
                </h2>
                <p data-testid="unit-price">{unitPrice}</p>
              </IonLabel>
              <IonLabel slot="end">
                <h2 data-testid="line-price">{linePrice}</h2>
              </IonLabel>
              <IonButton
                data-testid="remove-item-from-cart"
                role="button"
                slot="end"
                color="danger"
                onClick={() => handleRemoveItemFromCart(option.id)}
              >
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            </IonItem>
          </IonItemGroup>
        );
      })}
    </IonList>
  );
};

export default CartOderItems;
