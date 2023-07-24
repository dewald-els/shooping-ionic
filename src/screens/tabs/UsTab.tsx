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
import OpeningHours from "../../components/opening-hours/OpeningHours";

const UsTabScreen: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <OpeningHours />
      </IonContent>
    </IonPage>
  );
};

export default UsTabScreen;
