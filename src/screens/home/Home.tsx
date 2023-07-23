import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import "./Home.css";

const HomeScreen: React.FC = () => {
  const router = useIonRouter();
  const onCreateAccountClick = () => {
    router.push("/create-account");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Everything Edible</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding ion-text-center">
          <IonText>
            <h1>Private Club</h1>
          </IonText>

          <IonButton onClick={onCreateAccountClick}>Join the club</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomeScreen;
