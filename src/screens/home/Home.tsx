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
import { AppRoutes } from "../../consts/routes";
import { useAuth } from "../../context/AuthContext";
import { Redirect } from "react-router";

const HomeScreen: React.FC = () => {
  const { session } = useAuth();

  if (session && session.user) {
    return <Redirect to={AppRoutes.Tabs} />;
  }

  const router = useIonRouter();
  const handleCreateAccountClick = () => {
    router.push(AppRoutes.CreateAccount);
  };

  const handleLoginClick = () => {
    router.push(AppRoutes.Login);
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

          <IonButton onClick={handleCreateAccountClick}>
            Join the club
          </IonButton>

          <IonButton fill="outline" onClick={handleLoginClick}>
            Already a member? Login here
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomeScreen;
