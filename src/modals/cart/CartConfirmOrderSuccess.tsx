import { IonButton, IonIcon, IonItem } from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";

type CartConfirmOrderSuccessProps = {
  onViewOrderClick: () => void;
};

const CartConfirmOrderSuccess: React.FC<CartConfirmOrderSuccessProps> = (
  props
) => {
  const { onViewOrderClick } = props;
  return (
    <>
      <IonItem>
        <IonIcon slot="start" icon={checkmarkCircleOutline} />
        Your order has been succesful!
      </IonItem>

      <IonButton onClick={onViewOrderClick}>View the Order</IonButton>
    </>
  );
};

export default CartConfirmOrderSuccess;
