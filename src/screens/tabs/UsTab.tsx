import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import OpeningHours from "../../components/opening-hours/OpeningHours";
import { AppRoutes } from "../../consts/routes";
import { bookOutline } from "ionicons/icons";

const UsTabScreen: React.FC = () => {
  const router = useIonRouter();
  const handleTermsClick = () => {
    router.push(AppRoutes.TermsAndConditionsTabScreen);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <OpeningHours />

        <br />

        <IonList>
          <IonItem button onClick={handleTermsClick} detail={true}>
            <IonIcon slot="start" icon={bookOutline} /> Terms and conditions
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default UsTabScreen;
