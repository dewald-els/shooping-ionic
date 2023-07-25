import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRouterLink,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import OpeningHours from "../../components/opening-hours/OpeningHours";
import { AppRoutes } from "../../consts/routes";

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

        <IonButton onClick={handleTermsClick}>Terms and conditions</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UsTabScreen;
