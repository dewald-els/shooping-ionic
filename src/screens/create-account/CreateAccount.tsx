import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const CreateAccountScreen: React.FC = () => {
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
        <div className="ion-padding-bottom">
          <IonInput
            mode="md"
            id="emailAddress"
            name="emailAddress"
            label="Email address"
            fill="outline"
            labelPlacement="floating"
            placeholder="example@email.com"
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
          />
        </div>

        <IonButton type="submit">Create account</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccountScreen;
