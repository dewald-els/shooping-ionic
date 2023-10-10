import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { DeliveryOption } from "../../../models/delivery-option";
import formatCurrency from "../../../utils/formatCurrency";
import { carOutline, cubeOutline } from "ionicons/icons";

type OrderHistoryDetailDeliveryProps = {
  deliveryOption: DeliveryOption | null;
};
const OrderHistoryDetailDelivery: React.FC<OrderHistoryDetailDeliveryProps> = (
  props
) => {
  const { deliveryOption } = props;

  if (!deliveryOption) {
    return null;
  }

  const price = formatCurrency(deliveryOption.price);

  return (
    <IonItem lines="none">
      <IonIcon slot="start" icon={cubeOutline} />
      <IonLabel>
        <h2>Delivery</h2>
        <p>{deliveryOption.name}</p>
      </IonLabel>
      <IonLabel slot="end" color="medium">
        {price}
      </IonLabel>
    </IonItem>
  );
};

export default OrderHistoryDetailDelivery;
