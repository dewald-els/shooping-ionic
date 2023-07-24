import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const UsTabScreen: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>Opening hours</IonListHeader>
          <IonItem>
            <IonText>Monday</IonText>
            <IonText slot="end">
              <span>12:00 - 18:00</span>
            </IonText>
          </IonItem>
          <IonItem>
            <IonText>Tuesday</IonText>
            <IonText slot="end">
              <span>12:00 - 18:00</span>
            </IonText>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default UsTabScreen;
