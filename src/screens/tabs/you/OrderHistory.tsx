import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import OrderHistoryList from "../../../components/orders/order-history/OrderHistoryList";
import useOrderHistory from "../../../hooks/useOrderHistory";
import { useAuth } from "../../../context/AuthContext";
import AlertBox from "../../../components/shared/alert-box/AlertBox";
import { warningOutline } from "ionicons/icons";

const OrderHistoryScreen: React.FC = () => {
  const { session } = useAuth();
  const { orders, error } = useOrderHistory(session?.user.id);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Order history</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {error && (
          <AlertBox message={error} icon={warningOutline} color="danger" />
        )}
        <OrderHistoryList orders={orders} orderHistoryLimit={orders.length} />
      </IonContent>
    </IonPage>
  );
};

export default OrderHistoryScreen;
