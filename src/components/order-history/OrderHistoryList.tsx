import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { receiptOutline } from "ionicons/icons";

type OrderHistoryListProps = {
  orders: any[];
};

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
        <IonItem
          button
          detail={true}
          onClick={() => {
            router.push("/tabs/you/order-history/1234", "forward", "push");
          }}
        >
          <IonLabel>
            <h2>Order #1234</h2>
            <p>23 July 2023</p>
          </IonLabel>
          <IonText slot="end" color="medium">
            <span>R450</span>
          </IonText>
        </IonItem>
        <IonItem button detail={true}>
          <IonLabel>
            <h2>Order #1235</h2>
            <p>R200</p>
          </IonLabel>
          <IonText slot="end" color="medium">
            <span>R300</span>
          </IonText>
        </IonItem>
        <IonItem button detail={true}>
          <IonLabel>
            <h2>Order #1224</h2>
            <p>R120</p>
          </IonLabel>
          <IonText slot="end" color="medium">
            <span>R65</span>
          </IonText>
        </IonItem>
      </IonList>
      <div className="ion-padding-top ion-text-center">
        <IonButton fill="outline">Show all</IonButton>
      </div>
    </>
  );
};

export default OrderHistoryList;
