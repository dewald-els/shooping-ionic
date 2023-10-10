import { IonItem, IonIcon, IonLabel, IonText } from "@ionic/react";
import { cashOutline } from "ionicons/icons";

type OrderHistoryDetailTotalProps = {
  orderTotalCurrency: string;
};

const OrderHistoryDetailTotal: React.FC<OrderHistoryDetailTotalProps> = (
  props
) => {
  const { orderTotalCurrency } = props;
  return (
    <IonItem>
      <IonIcon slot="start" icon={cashOutline} data-testid="cash-icon" />
      <IonLabel>
        <IonText>Total:</IonText>
      </IonLabel>
      <IonLabel slot="end">
        <h3>{orderTotalCurrency}</h3>
      </IonLabel>
    </IonItem>
  );
};

export default OrderHistoryDetailTotal;
