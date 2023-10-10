import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import { DeliveryOption } from "../../models/delivery-option";
import formatCurrency from "../../utils/formatCurrency";
import { carOutline, cubeOutline } from "ionicons/icons";

type DeliveryOptionsProps = {
  deliveryOptions: DeliveryOption[];
  onDeliveryOptionChange: (option: DeliveryOption) => void;
};

const DeliveryOptions: React.FC<DeliveryOptionsProps> = (props) => {
  const { deliveryOptions = [], onDeliveryOptionChange } = props;

  const handleRadioChange = (event: CustomEvent) => {
    const option = deliveryOptions.find(
      (option) => option.id === event.detail.value
    );

    option && onDeliveryOptionChange(option);
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          <span className="flex items-center">
            <IonIcon icon={cubeOutline} slot="start" />
            <span className="block margin-right-1">Delivery options</span>
          </span>
        </IonCardTitle>
        <IonCardSubtitle>Choose at least one</IonCardSubtitle>
      </IonCardHeader>
      <IonRadioGroup onIonChange={handleRadioChange}>
        {deliveryOptions.map((option) => {
          const itemCurrencyPrice = formatCurrency(option.price);
          return (
            <IonItem key={"delivery-option-" + option.id}>
              <IonRadio
                mode="md"
                labelPlacement="end"
                justify="start"
                value={option.id}
              >
                {option.name}
              </IonRadio>
              <span slot="end">{itemCurrencyPrice}</span>
            </IonItem>
          );
        })}
      </IonRadioGroup>
    </IonCard>
  );
};

export default DeliveryOptions;
