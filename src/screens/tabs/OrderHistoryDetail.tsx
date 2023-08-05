import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import useOrderHistoryDetail from "../../hooks/useOrderHistoryDetail";
import { AppRoutes } from "../../consts/routes";
import OrderHistoryDetailProducts from "../../components/order-history-detail/OrderHistoryDetailProducts";
import formatCurrency from "../../utils/formatCurrency";
import { format } from "date-fns";
import OrderStatusToColorMap from "../../utils/orderStatusToColorMap";
import { OrderStatus } from "../../models/order";
import CancelOrderButton from "../../components/order-history-detail/CancelOrderButton";
import { updateOrderStatus } from "../../services/orders";
import useAppStore from "../../store/store";

interface OrderHistoryDetailProps
  extends RouteComponentProps<{
    orderId: string;
  }> {}

const OrderHistoryDetail: React.FC<OrderHistoryDetailProps> = ({ match }) => {
  const router = useIonRouter();
  const { params } = match;
  const { orderId } = params;

  const updateOrderHistoryItem = useAppStore(
    (state) => state.updateOrderHistoryItem
  );

  const { order, error } = useOrderHistoryDetail(Number(orderId));

  const products = order ? order.product_options : [];

  const orderTotalCurrency = formatCurrency(order?.total ?? 0);
  const dateFormatted = format(new Date(order?.created_at ?? 0), "dd-MM-yyyy");
  const statusColor =
    OrderStatusToColorMap[order?.status ?? OrderStatus.Unknown];

  const handleOrderCancelConfirm = async () => {
    if (!order) return;

    const { data, error } = await updateOrderStatus(
      order.id!,
      OrderStatus.Cancelled
    );

    if (!error) {
      updateOrderHistoryItem({
        ...order,
        status: OrderStatus.Cancelled,
      });

      router.goBack();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Order Detail</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={AppRoutes.YouTabScreen} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>
            <h2>Order #{order?.id}</h2>
            <h3>Order date: {dateFormatted}</h3>
            <IonBadge color={statusColor}>{order?.status}</IonBadge>
          </IonLabel>
          <IonLabel slot="end">
            <p>Total:</p>
            <h3>{orderTotalCurrency}</h3>
          </IonLabel>
        </IonItem>

        <OrderHistoryDetailProducts products={products} />

        {order && order.status === OrderStatus.Created && (
          <CancelOrderButton onCancelConfirm={handleOrderCancelConfirm} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default OrderHistoryDetail;
