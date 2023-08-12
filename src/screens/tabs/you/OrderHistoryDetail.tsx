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
import useOrderHistoryDetail from "../../../hooks/useOrderHistoryDetail";
import { AppRoutes } from "../../../consts/routes";

import formatCurrency from "../../../utils/formatCurrency";
import { format } from "date-fns";
import OrderStatusToColorMap from "../../../utils/orderStatusToColorMap";
import { OrderStatus } from "../../../models/order";

import { updateOrderStatus } from "../../../services/orders";
import useAppStore from "../../../store/store";
import { useState } from "react";
import {
  selectProductOptionStock,
  updateProductOptionStock,
} from "../../../services/product-options";
import {
  calendarClearOutline,
  cashOutline,
  receiptOutline,
} from "ionicons/icons";
import OrderHistoryDetailProducts from "../../../components/orders/order-history-detail/OrderHistoryDetailProducts";
import CancelOrderButton from "../../../components/orders/order-history-detail/CancelOrderButton";

interface OrderHistoryDetailProps
  extends RouteComponentProps<{
    orderId: string;
  }> {}

const OrderHistoryDetail: React.FC<OrderHistoryDetailProps> = ({ match }) => {
  const router = useIonRouter();
  const { params } = match;
  const { orderId } = params;
  const [errors, setErrors] = useState<string[]>([]);

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

    // Cancel the order.
    const { data, error } = await updateOrderStatus(
      order.id!,
      OrderStatus.Cancelled
    );

    // If order couldnt cancel, stop and dont update the stock.
    if (error) {
      setErrors([...errors, error]);
      return;
    }

    // Find the current stock values
    const productOptionIds = order.product_options.map((option) => option.id);
    const { data: currentStock, error: currentStockError } =
      await selectProductOptionStock(productOptionIds);

    // Map the order stock values to have stock of current stock + order quantity.
    const productOptionsWithCurrentStock = order.product_options.map(
      (option) => {
        const currentOption = currentStock.find((o) => option.id === o.id);
        return {
          ...option,
          stock: (currentOption?.stock ?? 0) + option.quantity,
        };
      }
    );

    // Execute update for each product option
    const results = await updateProductOptionStock(
      productOptionsWithCurrentStock.map((option) => ({
        ...option,
        stock: option.stock,
      }))
    );

    const hasStockUpdateError = results.some(
      (result) => result.status === "rejected"
    );

    updateOrderHistoryItem({
      ...order,
      status: OrderStatus.Cancelled,
    });

    router.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Order #{order?.id}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={AppRoutes.YouTabScreen} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
          <IonBadge slot="end" color={statusColor}>
            {order?.status}
          </IonBadge>
        </IonItem>

        <OrderHistoryDetailProducts products={products} />

        <IonItem>
          <IonIcon slot="start" icon={cashOutline} />
          <IonLabel>
            <IonText>Total:</IonText>
          </IonLabel>
          <IonLabel slot="end">
            <h3>{orderTotalCurrency}</h3>
          </IonLabel>
        </IonItem>

        {order && order.status === OrderStatus.Created && (
          <CancelOrderButton onCancelConfirm={handleOrderCancelConfirm} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default OrderHistoryDetail;
