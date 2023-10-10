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
import { Order } from "../../../models/order";
import OrderHistoryListItem from "./OrderHistoryListItem";

type OrderHistoryListProps = {
  orders: Order[];
  orderHistoryLimit?: number;
  onShowAllClick?: () => void;
};

const ORDER_DISPLAY_LIMIT = 5;

const OrderHistoryList: React.FC<OrderHistoryListProps> = (props) => {
  const {
    orders = [],
    onShowAllClick,
    orderHistoryLimit = ORDER_DISPLAY_LIMIT,
  } = props;
  const router = useIonRouter();
  return (
    <>
      <IonList>
        <IonItem>
          <IonIcon slot="start" icon={receiptOutline} color="primary" />
          <IonLabel>Order history</IonLabel>
        </IonItem>

        {orders.length === 0 && (
          <IonItem>You haven't completed any orders</IonItem>
        )}

        {orders.slice(0, orderHistoryLimit).map((order: Order) => {
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
      {orders.length > orderHistoryLimit && (
        <div className="ion-padding-top ion-text-center">
          <IonButton
            fill="outline"
            onClick={() => {
              onShowAllClick && onShowAllClick();
            }}
          >
            Show all
          </IonButton>
        </div>
      )}
    </>
  );
};

export default OrderHistoryList;
