import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import {
  checkmarkCircleOutline,
  helpCircleOutline,
  receiptOutline,
} from "ionicons/icons";
import "./CartConfirmOrderSuccess.css";
import { useEffect, useRef } from "react";

type CartConfirmOrderSuccessProps = {
  onViewOrderClick: () => void;
};

const CartConfirmOrderSuccess: React.FC<CartConfirmOrderSuccessProps> = (
  props
) => {
  const { onViewOrderClick } = props;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.classList.add("progress");
    setTimeout(() => {
      svg.classList.toggle("progress");
      svg.classList.toggle("ready");
    }, 1500);
  }, []);

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Your order has been successful!</IonCardTitle>
          <IonCardSubtitle>
            Nice! The store will confirm the delivery.
          </IonCardSubtitle>
        </IonCardHeader>
        <div className="flex flex-col items-center justify-center ion-padding">
          <div>
            <svg
              ref={svgRef}
              id="check"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
            >
              <circle id="circle" cx="50" cy="50" r="25" fill="transparent" />
              <polyline
                id="tick"
                points="37,50 47,59 63,43"
                fill="transparent"
              />
            </svg>
          </div>
        </div>

        <IonCardContent>
          <IonItem lines="none">
            <IonLabel>
              <h2>What's next?</h2>
              <p>The store will confirm delivery and get in touch with you.</p>
            </IonLabel>
          </IonItem>

          <div className="flex-col justify-center ion-padding">
            <IonButton onClick={onViewOrderClick}>
              <IonIcon slot="start" icon={receiptOutline} />
              View the Order
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>

      <IonItem button detail>
        <IonIcon slot="start" icon={helpCircleOutline} color="primary" />
        <IonLabel>Do you have more questions?</IonLabel>
      </IonItem>
    </>
  );
};

export default CartConfirmOrderSuccess;
