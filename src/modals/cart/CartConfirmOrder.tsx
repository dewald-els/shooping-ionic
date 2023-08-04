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
  useIonRouter,
} from "@ionic/react";
import { useAuth } from "../../context/AuthContext";
import useProfile from "../../hooks/useProfile";
import {
  checkmarkCircleOutline,
  locationOutline,
  personOutline,
} from "ionicons/icons";
import { useState } from "react";
import useAppStore from "../../store/store";
import { selectProductOptionStock } from "../../services/product-options";
import { insertOrder } from "../../services/orders";
import formatCurrency from "../../utils/formatCurrency";
import CartConfirmOrderSuccess from "./CartConfirmOrderSuccess";
import { AppRoutes } from "../../consts/routes";

type CartConfirmOrderModalProps = {
  onDismiss: (data?: boolean, role?: string) => void;
};

const CartConfirmOrderModal: React.FC<CartConfirmOrderModalProps> = (props) => {
  const { onDismiss } = props;

  const [orderCompleted, setOrderCompleted] = useState(false);

  const { session } = useAuth();
  const order = useAppStore((state) => state.order);
  const setOrder = useAppStore((state) => state.setOrder);
  const { profile } = useProfile(session?.user.id);
  const [acceptCorrectInformation, setAcceptCorrectInformation] =
    useState<boolean>(false);

  const handleConfirmClick = async () => {
    if (!order) {
      console.log("There is no order...");
      return;
    }

    const productOptions = order.product_options;

    const cartProductOptionIds = productOptions.map((option) => option.id);
    const { data: availableProductOptions, error } =
      await selectProductOptionStock(cartProductOptionIds);
    const productOptionsWithAvailableStock = productOptions.map((option) => {
      const availableOption = availableProductOptions?.find(
        (o) => o.id === option.id
      );
      if (availableOption) {
        return {
          ...option,
          availableStock: availableOption.stock,
        };
      }
      return option;
    });

    const missingStockItems = productOptionsWithAvailableStock.filter(
      (option) => option.quantity > (option.availableStock ?? 0)
    );

    if (missingStockItems.length > 0) {
    } else {
      const { data, error } = await insertOrder(order!);

      if (!error && data) {
        setOrder(data);
      }

      setOrderCompleted(!error);
    }
  };

  const handleViewOrderClick = () => {
    onDismiss(orderCompleted, orderCompleted ? "confirm" : "cancel");
  };

  const orderTotalCurrency = formatCurrency(order ? order.total : 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Delivery information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {orderCompleted && (
          <CartConfirmOrderSuccess onViewOrderClick={handleViewOrderClick} />
        )}
        {!orderCompleted && profile && order && (
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
              <IonButton
                color="success"
                disabled={!acceptCorrectInformation}
                onClick={handleConfirmClick}
              >
                <IonIcon slot="start" icon={checkmarkCircleOutline} />
                Complete order for {orderTotalCurrency}
              </IonButton>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CartConfirmOrderModal;
