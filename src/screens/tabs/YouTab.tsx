import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { supabase } from "../../services/supabase";
import { AppRoutes } from "../../consts/routes";
import { useState } from "react";

const YouTabScreen: React.FC = () => {
  const router = useIonRouter();
  const [logoutError, setLogoutError] = useState<string | undefined>();

  const handleLogoutClick = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      const errorText = error.cause ? (error.cause as string) : error.message;
      setLogoutError(errorText);
    } else {
      router.push(AppRoutes.Welcome, "root", "replace");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>You</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton
          color="danger"
          fill="outline"
          expand="block"
          onClick={handleLogoutClick}
        >
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default YouTabScreen;
