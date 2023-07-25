import { IonIcon, IonItem, IonLabel, IonList, IonText } from "@ionic/react";
import useOpeningHours from "../../hooks/useOpeningHours";
import { timeOutline } from "ionicons/icons";

const OpeningHours: React.FC = () => {
  const { openingHours, error } = useOpeningHours();
  return (
    <IonList>
      <IonItem>
        <IonIcon icon={timeOutline} slot="start" />
        <IonLabel>
          <h1>Opening hours</h1>
        </IonLabel>
      </IonItem>
      {openingHours.map((openingHour) => {
        return (
          <IonItem key={openingHour.id}>
            <IonText>{openingHour.day}</IonText>
            <IonText slot="end">
              <span>{openingHour.hours}</span>
            </IonText>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default OpeningHours;
