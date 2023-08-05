import { IonButton, IonIcon, useIonAlert } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";

type CancelOrderButtonProps = {
  onCancelConfirm: () => void;
};

const CancelOrderButton: React.FC<CancelOrderButtonProps> = (props) => {
  const { onCancelConfirm } = props;

  const [presentAlert, dismissAlert] = useIonAlert();

  const handleCancelClick = () => {
    presentAlert({
      header: "Cancel order",
      message: "Are you sure you want to cancel this order?",
      buttons: [
        "No",
        {
          text: "Yes, Cancel",
          role: "destructive",
          handler: () => {
            onCancelConfirm();
          },
        },
      ],
    });
  };

  return (
    <div className="flex justify-center ion-padding-top">
      <IonButton fill="outline" color="danger" onClick={handleCancelClick}>
        <IonIcon slot="start" icon={closeCircleOutline} />
        Cancel order
      </IonButton>
    </div>
  );
};

export default CancelOrderButton;
