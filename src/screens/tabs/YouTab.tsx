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
import useProfile from "../../hooks/useProfile";
import { useAuth } from "../../context/AuthContext";
import OrderHistoryList from "../../components/order-history/OrderHistoryList";
import ProfileSummary from "../../components/profile/ProfileSummary";

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
      <IonContent>
        <ProfileSummary profile={profile} user={session?.user} />
        <OrderHistoryList />

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
