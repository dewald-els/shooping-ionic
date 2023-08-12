import { Color } from "@ionic/core";
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/react";

type AlertBoxProps = {
  message: string;
  icon: string;
  color: Color;
};

const AlertBox: React.FC<AlertBoxProps> = (props) => {
  const { message, icon, color } = props;

  if (!message) {
    return <></>;
  }

  return (
    <IonCard color={color}>
      <IonCardContent>
        <IonItem color={color} lines="none">
          {icon && <IonIcon icon={icon} slot="start" />}
          <IonLabel>{message}</IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default AlertBox;
