import { IonButton, IonIcon, IonItem, IonText } from "@ionic/react";
import { checkmarkCircleOutline, receiptOutline } from "ionicons/icons";

type CartConfirmOrderSuccessProps = {
  onViewOrderClick: () => void;
};

const CartConfirmOrderSuccess: React.FC<CartConfirmOrderSuccessProps> = (
  props
) => {
  const { onViewOrderClick } = props;
  return (
    <>
      <div className="flex flex-col items-center justify-center ion-padding">
        <IonIcon
          slot="start"
          icon={checkmarkCircleOutline}
          size="large"
          color="success"
        />
        <IonText>
          <h2>Your order has been succesful!</h2>
        </IonText>
      </div>

      <div className="flex justify-center ion-padding">
        <IonButton onClick={onViewOrderClick}>
          <IonIcon slot="start" icon={receiptOutline} />
          View the Order
        </IonButton>
      </div>
    </>
  );
};

export default CartConfirmOrderSuccess;
