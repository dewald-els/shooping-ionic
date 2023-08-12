import { IonItem, IonLabel, IonText, IonBadge } from "@ionic/react";
import { Order } from "../../../models/order";
import formatCurrency from "../../../utils/formatCurrency";
import { format } from "date-fns";
import OrderStatusToColorMap from "../../../utils/orderStatusToColorMap";

type OrderHistoryListItemProps = {
  order: Order;
  onOrderClick?: (prder: Order) => void;
};

const OrderHistoryListItem: React.FC<OrderHistoryListItemProps> = (props) => {
  const { order, onOrderClick } = props;

  const orderTotalCurrency = formatCurrency(order.total);
  const orderDate = format(new Date(order.created_at!), "dd-MM-yyyy");
  const orderStatusColor = OrderStatusToColorMap[order.status];

  return (
    <IonItem
      button
      detail={true}
      onClick={() => {
        onOrderClick && onOrderClick(order);
      }}
    >
      <IonLabel>
        <h2>Order #{order.id}</h2>
        <p>{orderDate}</p>
      </IonLabel>
      <IonLabel slot="end" className="text-align-right">
        <IonText color="medium">
          <p>{orderTotalCurrency}</p>
        </IonText>
        <IonBadge color={orderStatusColor}>{order.status}</IonBadge>
      </IonLabel>
    </IonItem>
  );
};

export default OrderHistoryListItem;
