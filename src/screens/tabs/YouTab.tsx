import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { supabase } from "../../services/supabase";
import { AppRoutes } from "../../consts/routes";
import { useState } from "react";
import ProfileDetails from "../../components/profile/ProfileDetails";
import useProfile from "../../hooks/useProfile";
import { useAuth } from "../../context/AuthContext";

const YouTabScreen: React.FC = () => {
  const router = useIonRouter();
  const { session } = useAuth();
  const { profile, error } = useProfile(session?.user.id);

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
        <ProfileDetails profile={profile} user={session?.user} />

        <IonButton
          color="danger"
          fill="clear"
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
