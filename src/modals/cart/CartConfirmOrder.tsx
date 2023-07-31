import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAuth } from "../../context/AuthContext";
import useProfile from "../../hooks/useProfile";
import {
  checkmarkCircleOutline,
  locationOutline,
  personOutline,
} from "ionicons/icons";
import { useState } from "react";

const CartConfirmOrderModal = () => {
  const { session } = useAuth();
  const { profile } = useProfile(session?.user.id);
  const [acceptCorrectInformation, setAcceptCorrectInformation] =
    useState<boolean>(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Delivery information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {profile && (
          <>
            <IonItem>
              <IonIcon slot="start" icon={personOutline} color="primary" />
              <IonLabel>Delivery for</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel color="medium">Name</IonLabel>
              <IonLabel slot="end">{profile.full_name}</IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel color="medium">Phone number</IonLabel>
              <IonLabel slot="end">{profile.phone_number}</IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon slot="start" icon={locationOutline} color="primary" />
              <IonLabel>Delivery address</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>{profile.street}</IonLabel>
            </IonItem>
            <IonItem>{profile.city}</IonItem>
            <IonItem>{profile.postCode}</IonItem>

            <IonItem>
              <IonCheckbox
                mode="ios"
                labelPlacement="end"
                justify="start"
                onIonChange={() =>
                  setAcceptCorrectInformation((accepted) => !accepted)
                }
              >
                I confirm the above information is correct
              </IonCheckbox>
            </IonItem>

            <div className="flex justify-center ion-padding">
              <IonButton color="success" disabled={!acceptCorrectInformation}>
                <IonIcon slot="start" icon={checkmarkCircleOutline} />
                Complete order
              </IonButton>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CartConfirmOrderModal;
