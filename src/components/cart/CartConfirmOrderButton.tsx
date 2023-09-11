import { IonFooter, IonToolbar, IonButton, IonIcon } from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";

type CartConfirmOrderButtonProps = {
  cartTotalCurrency: string;
  onCartConfirmed: () => void;
};

const CartConfirmOrderButton: React.FC<CartConfirmOrderButtonProps> = (
  props
) => {
  const { cartTotalCurrency, onCartConfirmed } = props;

  return (
    <IonFooter>
      <IonToolbar>
        <div className="flex justify-center">
          <IonButton color="success" onClick={onCartConfirmed}>
            <IonIcon
              slot="start"
              icon={checkmarkCircleOutline}
              data-testid="checkmark-circle-icon"
            />
            Confirm Order {cartTotalCurrency}
          </IonButton>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default CartConfirmOrderButton;
