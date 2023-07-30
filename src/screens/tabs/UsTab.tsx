import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
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

        <br />

        <IonList>
          <IonItem button onClick={handleTermsClick} detail={true}>
            Terms and conditions
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default UsTabScreen;
