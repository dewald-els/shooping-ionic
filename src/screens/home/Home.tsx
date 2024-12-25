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
          <IonTitle>Shooping</IonTitle>
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
          <>
            <div>
              <IonImg
                src="home-bg.jpg"
                alt="Logo"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "350px",
                  display: "block",
                  margin: "0 auto",
                  overflow: "hidden",
                }}
              />
            </div>
            <div
              className="ion-padding ion-text-center"
              style={{
                position: "relative",
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
                top: "-58px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                zIndex: 5,
              }}
            >
              <IonText>
                <h1>
                  <b>Welcome to Shooping!</b>
                </h1>
              </IonText>

              <IonText color="medium">
                <p className="margin-top-0">Let's get your groceries ordered</p>
              </IonText>

              <div
                style={{
                  padding: "24px 0",
                }}
              >
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
            </div>
          </>
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
