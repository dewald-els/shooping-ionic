import { IonItem, IonIcon, IonButton } from "@ionic/react";
import { informationCircleOutline, basketOutline } from "ionicons/icons";

type CartOrderEmptyProps = {
  onGoShoppingClick: () => void;
};

const CartOrderEmpty: React.FC<CartOrderEmptyProps> = (props) => {
  const { onGoShoppingClick } = props;
  return (
    <>
      <IonItem>
        <IonIcon slot="start" icon={informationCircleOutline} />
        Nothing in your cart.
      </IonItem>
      <div className="ion-text-center ion-padding">
        <IonButton onClick={onGoShoppingClick}>
          <IonIcon slot="start" icon={basketOutline} />
          Go shopping
        </IonButton>
      </div>
    </>
  );
};

export default CartOrderEmpty;
