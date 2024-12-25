import { IonItem, IonIcon, IonButton, IonImg } from "@ionic/react";
import { informationCircleOutline, basketOutline } from "ionicons/icons";

type CartOrderEmptyProps = {
  onGoShoppingClick: () => void;
};

const CartOrderEmpty: React.FC<CartOrderEmptyProps> = (props) => {
  const { onGoShoppingClick } = props;
  return (
    <>
      <IonImg
        src="empty-cart.jpg"
        alt="Logo"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "200px",
          display: "block",
          margin: "0 auto 16px",
          overflow: "hidden",
        }}
      />
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
