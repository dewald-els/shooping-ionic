import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import "./Home.css";
import { AppRoutes } from "../../consts/routes";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  hourglassOutline,
  informationCircleOutline,
  starOutline,
} from "ionicons/icons";
import useAppStore from "../../store/store";

const HomeScreen: React.FC = () => {
  const router = useIonRouter();
  const clearCart = useAppStore((state) => state.clearCart);
  const { session } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const handleCreateAccountClick = () => {
    router.push(AppRoutes.CreateAccount);
  };

  useEffect(() => {
    clearCart();
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (isReady && session) {
      router.push(AppRoutes.Tabs, "root", "replace");
    }
  }, [isReady, session]);

  const handleLoginClick = () => {
    router.push(AppRoutes.Login);
  };

  const handleTermsClick = () => {
    router.push(AppRoutes.TermsAndConditions);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Everything Edible</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!isReady && (
          <div className="ion-padding ion-text-center">
            <IonList>
              <IonListHeader>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>
              </IonListHeader>
              <IonItem>
                <IonLabel>
                  <h3>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "80%" }}
                    ></IonSkeletonText>
                  </h3>
                  <p>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "60%" }}
                    ></IonSkeletonText>
                  </p>
                  <p>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "30%" }}
                    ></IonSkeletonText>
                  </p>
                </IonLabel>
              </IonItem>
            </IonList>
            <IonItem>
              <IonIcon color="medium" icon={hourglassOutline} slot="start" />
              <IonText color="medium">
                <p>Firing up...</p>
              </IonText>
            </IonItem>
          </div>
        )}
        {isReady && !session && (
          <div className="ion-padding ion-text-center">
            <div>
              <IonImg
                src="home-logo.png"
                alt="Logo"
                style={{
                  width: "200px",
                  display: "block",
                  margin: "0 auto",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                }}
              />
            </div>

            <IonText>
              <h1>Everything Edible</h1>
            </IonText>

            <IonText color="medium">
              <h2 className="margin-top-0">Private Club</h2>
            </IonText>

            <IonButton onClick={handleCreateAccountClick}>
              <IonIcon slot="start" icon={starOutline} />
              Join the club
            </IonButton>

            <IonButton
              fill="outline"
              onClick={handleLoginClick}
              disabled={!isReady}
            >
              Already a member? Login here
            </IonButton>
          </div>
        )}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <div className="flex justify-center">
            <IonButton fill="clear" onClick={handleTermsClick}>
              <IonIcon icon={informationCircleOutline} slot="start" />
              Terms and conditions
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default HomeScreen;
