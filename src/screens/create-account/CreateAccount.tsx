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
import CreateAccount from "../../components/create-account/CreateAccount";
import CreateAccountContact from "../../components/create-account/CreateAccountContact";
import CreateAccountAddress from "../../components/create-account/CreateAccountAddress";
import { useState } from "react";

enum CreateAccountStep {
  Account,
  Contact,
  Address,
  Complete,
}

const CreateAccountScreen: React.FC = () => {
  const router = useIonRouter();

  const [step, setStep] = useState<CreateAccountStep>(
    CreateAccountStep.Contact
  );

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
          {step === CreateAccountStep.Account && <CreateAccount />}
          {step === CreateAccountStep.Contact && <CreateAccountContact />}
          {step === CreateAccountStep.Address && <CreateAccountAddress />}

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
