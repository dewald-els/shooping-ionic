import {
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import useOpeningHours from "../../hooks/useOpeningHours";
import { timeOutline } from "ionicons/icons";

const OpeningHours: React.FC = () => {
  const { openingHours, error } = useOpeningHours();
  return (
    <IonCard>
      <IonList>
        <IonItem>
          <IonIcon icon={timeOutline} slot="start" />
          <IonLabel>Opening hours</IonLabel>
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
    </IonCard>
  );
};

export default OpeningHours;
