import {
  InputChangeEventDetail,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { AppRoutes } from "../../consts/routes";
import { supabase } from "../../services/supabase";
import { useAuth } from "../../context/AuthContext";
import {
  helpCircleOutline,
  lockOpenOutline,
  logInOutline,
  starOutline,
  warningOutline,
} from "ionicons/icons";
import AlertBox from "../../components/shared/alert-box/AlertBox";

const LoginScreen: React.FC = () => {
  const router = useIonRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoginClick = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      const errorText = error.cause ? (error.cause as string) : error.message;
      setError(errorText);
    } else {
      router.push(AppRoutes.Tabs, "root", "replace");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={AppRoutes.Welcome} />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <>
          <div>
            <IonImg
              src="login-bg.jpg"
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
            className="ion-padding"
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
              <h2>
                <b>Member login</b>
              </h2>
              <p>Use your email and password to start ordering</p>
            </IonText>

            <div className="ion-padding-bottom">
              <IonInput
                mode="md"
                id="emailAddress"
                name="emailAddress"
                label="Email address"
                fill="outline"
                labelPlacement="floating"
                placeholder="example@email.com"
                type="email"
                onIonInput={(event: CustomEvent<InputChangeEventDetail>) =>
                  setEmail(event.detail.value ?? "")
                }
              />
            </div>

            <div className="ion-padding-bottom">
              <IonInput
                mode="md"
                id="password"
                name="password"
                label="Password"
                fill="outline"
                labelPlacement="floating"
                placeholder="******"
                type="password"
                onIonInput={(event: CustomEvent<InputChangeEventDetail>) =>
                  setPassword(event.detail.value ?? "")
                }
              />
            </div>

            <IonButton
              onClick={handleLoginClick}
              expand="block"
              disabled={!email || !password || loading}
            >
              <IonIcon slot="start" icon={logInOutline} />
              Login
            </IonButton>
          </div>

          <div className="ion-padding flex justify-center">
            <IonButton fill="clear">
              <IonIcon slot="start" icon={helpCircleOutline} />
              Forgot your password?
            </IonButton>
          </div>

          {error && (
            <AlertBox message={error} icon={warningOutline} color="danger" />
          )}
        </>
      </IonContent>
    </IonPage>
  );
};

export default LoginScreen;
