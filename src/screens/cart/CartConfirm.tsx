import {
  InputChangeEventDetail,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  personOutline,
  locationOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useProfile from "../../hooks/useProfile";
import { insertOrder } from "../../services/orders";
import {
  selectProductOptionStock,
  updateProductOptionStock,
} from "../../services/product-options";
import useAppStore from "../../store/store";
import formatCurrency from "../../utils/formatCurrency";
import { AppRoutes } from "../../consts/routes";
import DeliveryOptions from "../../components/delivery-options/DeliveryOptions";
import useDeliveryOptions from "../../hooks/useDeliveryOptions";
import { DeliveryOption } from "../../models/delivery-option";

const CartConfirmScreen: React.FC = () => {
  const router = useIonRouter();
  const { session } = useAuth();
  const order = useAppStore((state) => state.order);
  const setOrder = useAppStore((state) => state.setOrder);
  const addOrderHistory = useAppStore((state) => state.addOrderHistory);
  const clearCart = useAppStore((state) => state.clearCart);
  const clearOrder = useAppStore((state) => state.clearOrder);
  const { deliveryOptions } = useDeliveryOptions();
  const { profile } = useProfile(session?.user.id);
  const [acceptCorrectInformation, setAcceptCorrectInformation] =
    useState<boolean>(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] =
    useState<DeliveryOption | null>(null);

  const handleConfirmClick = async () => {
    if (!order) {
      console.log("There is no order...");
      return;
    }

    if (!selectedDeliveryOption) {
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
      const orderWithDelivery = {
        ...order,
        total: order.total + selectedDeliveryOption.price,
        delivery_option_id: selectedDeliveryOption?.id,
        product_options: [...order.product_options],
      };

      const { data: updatedOrder, error: orderError } = await insertOrder(
        orderWithDelivery
      );

      if (!orderError && updatedOrder) {
        const results = await updateProductOptionStock(
          productOptionsWithAvailableStock.map((option) => ({
            ...option,
            stock: (option.availableStock ?? 0) - option.quantity,
          }))
        );

        const hasStockUpdateError = results.some(
          (result) => result.status === "rejected"
        );

        if (hasStockUpdateError) {
          console.error("Could not update stock", results);
          return;
        }

        addOrderHistory(updatedOrder);

        clearCart();
        clearOrder();

        router.push(AppRoutes.CartConfirmSuccessScreen, "root", "replace");
      }
    }
  };

  const handleDeliveryOptionChange = (option: DeliveryOption) => {
    setSelectedDeliveryOption(option);
  };

  const totalWithDelivery = order
    ? order.total + (selectedDeliveryOption?.price ?? 0)
    : 0;
  const orderTotalCurrency = formatCurrency(totalWithDelivery);

  console.log("selectedDeliveryOption", selectedDeliveryOption);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Delivery information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {profile && order && (
          <>
            <DeliveryOptions
              deliveryOptions={deliveryOptions}
              onDeliveryOptionChange={handleDeliveryOptionChange}
            />

            {selectedDeliveryOption && (
              <>
                {selectedDeliveryOption &&
                  selectedDeliveryOption.requires_address && (
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>
                          <span className="flex items-center">
                            <IonIcon icon={locationOutline} slot="start" />
                            <span className="block margin-right-1">
                              Address
                            </span>
                            <IonButton
                              slot="end"
                              fill="outline"
                              size="small"
                              className="ml-auto"
                            >
                              Change
                            </IonButton>
                          </span>
                        </IonCardTitle>
                        <IonCardSubtitle>Check your address</IonCardSubtitle>
                      </IonCardHeader>
                      <IonItem lines="none">
                        {profile.street}, {profile.city}, {profile.postCode}
                      </IonItem>
                    </IonCard>
                  )}

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

                <div className="ion-padding">
                  <div className="ion-padding-bottom">
                    <IonTextarea
                      mode="md"
                      id="deliveryInstructions"
                      name="deliveryInstructions"
                      label="Delivery instructions (Optional)"
                      fill="outline"
                      labelPlacement="floating"
                      placeholder="Any special instructions?"
                      rows={3}
                      onIonInput={(
                        event: CustomEvent<InputChangeEventDetail>
                      ) => {}}
                    />
                  </div>
                </div>

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
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CartConfirmScreen;
