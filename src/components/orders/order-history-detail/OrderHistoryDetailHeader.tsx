import { IonItem, IonIcon, IonLabel, IonBadge } from "@ionic/react";
import { receiptOutline, calendarClearOutline } from "ionicons/icons";
import { Order, OrderStatus } from "../../../models/order";
import { format } from "date-fns";
import OrderStatusToColorMap from "../../../utils/orderStatusToColorMap";

type OrderHistoryDetailHeaderProps = {
  order: Order | null;
};

const OrderHistoryDetailHeader: React.FC<OrderHistoryDetailHeaderProps> = (
  props
) => {
  const { order } = props;
  const dateFormatted = format(new Date(order?.created_at ?? 0), "dd-MM-yyyy");
  const statusColor =
    OrderStatusToColorMap[order?.status ?? OrderStatus.Unknown];
  return (
    <>
      <IonItem>
        <IonIcon slot="start" icon={receiptOutline} />
        <IonLabel>
          <h2>Order #{order?.id}</h2>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonIcon slot="start" icon={calendarClearOutline} />
        <IonLabel>Order date:</IonLabel>
        <IonLabel slot="end">{dateFormatted}</IonLabel>
      </IonItem>
      <IonItem>
        Status:{" "}
        <IonBadge
          slot="end"
          color={statusColor}
          data-testid="order-status-color"
        >
          {order?.status}
        </IonBadge>
      </IonItem>
    </>
  );
};

export default OrderHistoryDetailHeader;
