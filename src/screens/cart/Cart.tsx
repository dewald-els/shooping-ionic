import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import useAppStore from "../../store/store";
import formatCurrency from "../../utils/formatCurrency";
import {
  basketOutline,
  checkmarkCircleOutline,
  closeOutline,
  informationCircleOutline,
  trashBinOutline,
} from "ionicons/icons";
import { CartProductOption } from "../../models/cart";
import QuantityButtons from "../../components/quantity-buttons/QuantityButtons";
import CartClearAllButton from "../../components/cart/CartClearAllButton";

const CartScreen: React.FC = () => {
  const router = useIonRouter();
  const [presentAlert, dismissAlert] = useIonAlert();
  const cart = useAppStore((state) => state.cart);
  const removeProductOptionFromCart = useAppStore(
    (state) => state.removeProductOptionFromCart
  );
  const productOptions: CartProductOption[] = [];

  if (cart) {
    productOptions.push(...cart.product_options);
  }

  const handleRemoveItemFromCart = (productOptionId: number) => {
    const option = productOptions.find((o) => o.id === productOptionId);
    presentAlert({
      header: "Remove item from cart?",
      message: `Remove ${option?.name} from your cart?`,
      buttons: [
        "Cancel",
        {
          text: "Yes, Remove",
          cssClass: "danger",
          role: "destructive",
          handler: () => {
            removeProductOptionFromCart(productOptionId);
          },
        },
      ],
    });
  };

  const handleGoShoppingClick = () => {
    router.goBack();
  };

  const cartTotal = productOptions.reduce(
    (total, option) => total + option.unit_price * option.quantity,
    0
  );

  const cartTotalCurrency = formatCurrency(cartTotal);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/products" />
          </IonButtons>
          <IonTitle>Cart</IonTitle>
          {productOptions.length > 0 && <CartClearAllButton />}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {productOptions.length === 0 && (
          <>
            <IonItem>
              <IonIcon slot="start" icon={informationCircleOutline} />
              Nothing in your cart.
            </IonItem>
            <div className="ion-text-center ion-padding">
              <IonButton onClick={handleGoShoppingClick}>
                <IonIcon slot="start" icon={basketOutline} />
                Go shopping
              </IonButton>
            </div>
          </>
        )}

        <IonList>
          {productOptions.map((option) => {
            const linePrice = formatCurrency(
              option.unit_price * option.quantity
            );
            const unitPrice = formatCurrency(option.unit_price);

            return (
              <IonItemGroup key={option.id}>
                <IonItem key={"item-" + option.id} lines="none">
                  <IonLabel>
                    <h2>{option.name}</h2>
                    <p>{unitPrice}</p>
                  </IonLabel>
                  <IonLabel slot="end">
                    <h2>{linePrice}</h2>
                  </IonLabel>
                  <IonButton
                    slot="end"
                    color="danger"
                    onClick={() => handleRemoveItemFromCart(option.id)}
                  >
                    <IonIcon slot="icon-only" icon={closeOutline} />
                  </IonButton>
                </IonItem>
                <IonItem lines="full" key={"quantity-" + option.id}>
                  <QuantityButtons
                    startQuantity={option.quantity}
                    limit={option.stock}
                    onQuantityChange={() => {}}
                  />
                </IonItem>
              </IonItemGroup>
            );
          })}
        </IonList>
      </IonContent>
      {productOptions.length > 0 && (
        <IonFooter>
          <IonToolbar>
            <div className="flex justify-center">
              <IonButton color="success">
                <IonIcon slot="start" icon={checkmarkCircleOutline} />
                Confirm Order {cartTotalCurrency}
              </IonButton>
            </div>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default CartScreen;
