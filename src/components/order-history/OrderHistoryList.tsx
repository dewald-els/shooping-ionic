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
import OrderHistoryListItem from "./OrderHistoryListItem";

type OrderHistoryListProps = {
  orders: Order[];
};

const ORDER_DISPLAY_LIMIT = 5;

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
          return (
            <OrderHistoryListItem
              key={order.id}
              order={order}
              onOrderClick={(order) => {
                router.push(
                  `/tabs/you/order-history/${order.id}`,
                  "forward",
                  "push"
                );
              }}
            />
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
