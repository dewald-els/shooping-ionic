import {
  IonBadge,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { receiptOutline } from "ionicons/icons";
import formatCurrency from "../../utils/formatCurrency";
import { Order } from "../../models/order";
import { format } from "date-fns";
import OrderStatusToColorMap from "../../utils/orderStatusToColorMap";

type OrderHistoryListProps = {
  orders: Order[];
};

const ORDER_DISPLAY_LIMIT = 3;

const OrderHistoryList: React.FC<OrderHistoryListProps> = (props) => {
  const { orders = [] } = props;
  const router = useIonRouter();
  return (
    <>
      <IonList>
        <IonItem>
          <IonIcon slot="start" icon={receiptOutline} />
          <IonLabel>
            <h1>Order history</h1>
          </IonLabel>
        </IonItem>

        {orders.length === 0 && (
          <IonItem>You haven't completed any orders</IonItem>
        )}

        {orders.slice(0, ORDER_DISPLAY_LIMIT).map((order: Order) => {
          const orderTotalCurrency = formatCurrency(order.total);
          const orderDate = format(new Date(order.created_at!), "dd-MM-yyyy");
          const orderStatusColor = OrderStatusToColorMap[order.status];
          return (
            <IonItem
              key={order.id}
              button
              detail={true}
              onClick={() => {
                router.push("/tabs/you/order-history/1234", "forward", "push");
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
        })}
      </IonList>
      {orders.length > ORDER_DISPLAY_LIMIT && (
        <div className="ion-padding-top ion-text-center">
          <IonButton fill="outline">Show all</IonButton>
        </div>
      )}
    </>
  );
};

export default OrderHistoryList;
