import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { starOutline } from "ionicons/icons";

const CreateAccountScreen: React.FC = () => {
  const router = useIonRouter();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    router.push("/tabs", "forward", "replace");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Create your account</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleFormSubmit}>
          <IonText>
            <h4>Account</h4>
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
            />
          </div>
          <div className="ion-padding-bottom">
            <IonInput
              mode="md"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              fill="outline"
              labelPlacement="floating"
              placeholder="******"
              type="password"
            />
          </div>

          <IonText>
            <h4>Contact</h4>
          </IonText>

          <div className="ion-padding-bottom">
            <IonInput
              mode="md"
              id="fullName"
              name="fullName"
              label="Full name"
              fill="outline"
              labelPlacement="floating"
              placeholder="John Doe"
              type="text"
            />
          </div>

          <div className="ion-padding-bottom">
            <IonInput
              mode="md"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone number"
              fill="outline"
              labelPlacement="floating"
              placeholder="071 123 4567"
              type="tel"
            />
          </div>

          <IonText>
            <h4>Address</h4>
          </IonText>

          <div className="ion-padding-bottom">
            <IonInput
              mode="md"
              id="street"
              name="street"
              label="Street"
              fill="outline"
              labelPlacement="floating"
              placeholder="Street 123"
              type="text"
            />
          </div>

          <div className="ion-padding-bottom">
            <IonInput
              mode="md"
              id="city"
              name="city"
              label="City"
              fill="outline"
              labelPlacement="floating"
              placeholder="City"
              type="text"
            />
          </div>

          <div className="ion-padding-bottom">
            <IonInput
              mode="md"
              id="postCode"
              name="postCode"
              label="Post code"
              fill="outline"
              labelPlacement="floating"
              placeholder="Post code"
              type="tel"
            />
          </div>

          <div className="ion-padding-bottom">
            <IonCheckbox labelPlacement="end" justify="start">
              I am at least 18 years old
            </IonCheckbox>
          </div>

          <IonButton type="submit" expand="block">
            <IonIcon icon={starOutline} slot="start" />
            Create account
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccountScreen;
