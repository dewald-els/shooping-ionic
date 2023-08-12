import {
  IonAlert,
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
import OrderHistoryList from "../../components/orders/order-history/OrderHistoryList";
import ProfileSummary from "../../components/profile/ProfileSummary";
import useOrderHistory from "../../hooks/useOrderHistory";

const YouTabScreen: React.FC = () => {
  const router = useIonRouter();
  const { session } = useAuth();
  const { profile, error } = useProfile(session?.user.id);
  const { orders, error: ordersError } = useOrderHistory(profile?.id);
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

  const handleShowAllOrderHistoryClick = () => {
    router.push(AppRoutes.YouTabScreen + "/" + AppRoutes.OrderHistoryScreen);
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
        <OrderHistoryList
          orders={orders}
          onShowAllClick={handleShowAllOrderHistoryClick}
        />

        <div className="flex justify-center ion-padding">
          <IonButton color="danger" fill="clear" id="prompt-logout">
            Logout
          </IonButton>
        </div>

        <IonAlert
          header="Logout?"
          message="Are you sure"
          trigger="prompt-logout"
          buttons={[
            {
              text: "No",
              role: "cancel",
            },
            {
              text: "Yes, Logout",
              role: "confirm",
              handler: () => {
                handleLogoutClick();
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default YouTabScreen;
