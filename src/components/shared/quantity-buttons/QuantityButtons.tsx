import { IonButton, IonText } from "@ionic/react";
import { useState } from "react";

type QuantityButtonsProps = {
  limit: number;
  startQuantity?: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

enum QuantityAction {
  Add,
  Remove,
}

const QuantityButtons: React.FC<QuantityButtonsProps> = (props) => {
  const { startQuantity = 0, quantity, limit = 0, onQuantityChange } = props;

  // const [quantity, setQuantity] = useState(startQuantity);

  const handleQuantityChange = (action: QuantityAction) => {
    let newQuantity = 0;
    switch (action) {
      case QuantityAction.Add:
        newQuantity = quantity < limit ? quantity + 1 : quantity;
        break;
      case QuantityAction.Remove:
        newQuantity = quantity > 0 ? quantity - 1 : 0;
        break;
      default:
        return;
    }

    //setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <div className="flex items-center gap-1">
      <IonButton
        fill="outline"
        onClick={() => handleQuantityChange(QuantityAction.Remove)}
      >
        -
      </IonButton>
      <IonText className="font-bold text-lg">
        <span>{quantity}</span>
      </IonText>
      <IonButton onClick={() => handleQuantityChange(QuantityAction.Add)}>
        +
      </IonButton>
    </div>
  );
};

export default QuantityButtons;
