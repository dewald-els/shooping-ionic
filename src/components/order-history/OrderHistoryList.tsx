import { IonButton, IonItem, IonLabel, IonList, IonText } from "@ionic/react";

const OrderHistoryList: React.FC = () => {
  return (
    <>
      <IonList>
        <IonItem>
          <IonLabel>
            <h1>Order history</h1>
          </IonLabel>
        </IonItem>
        <IonItem button>
          <IonLabel>
            <h2>Order #1234</h2>
            <p>23 July 2023</p>
          </IonLabel>
          <IonText slot="end" color="medium">
            <span>R450</span>
          </IonText>
        </IonItem>
        <IonItem button>
          <IonLabel>
            <h2>Order #1235</h2>
            <p>R200</p>
          </IonLabel>
          <IonText slot="end" color="medium">
            <span>R300</span>
          </IonText>
        </IonItem>
        <IonItem button>
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
