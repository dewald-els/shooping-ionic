import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import useAppStore from "../../store/store";
import formatCurrency from "../../utils/formatCurrency";
import { CartProductOption } from "../../models/cart";
import CartClearAllButton from "../../components/cart/CartClearAllButton";
import CartConfirmOrderButton from "../../components/cart/CartConfirmOrderButton";
import CartOrderItems from "../../components/cart/CartOrderItems";
import CartOrderEmpty from "../../components/cart/CartOrderEmpty";
import { selectProductOptionStock } from "../../services/product-options";

const CartScreen: React.FC = () => {
  const router = useIonRouter();
  const cart = useAppStore((state) => state.cart);
  const productOptions: CartProductOption[] = [];
  const [presentAlert] = useIonAlert();

  if (cart) {
    productOptions.push(...cart.product_options);
  }

  const handleGoShoppingClick = () => {
    router.goBack();
  };

  const cartTotal = productOptions.reduce(
    (total, option) => total + option.unit_price * option.quantity,
    0
  );

  const cartTotalCurrency = formatCurrency(cartTotal);

  const handleCartConfirmed = async () => {
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
    }
  };

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
          <CartOrderEmpty onGoShoppingClick={handleGoShoppingClick} />
        )}

        <CartOrderItems />
      </IonContent>
      {productOptions.length > 0 && (
        <CartConfirmOrderButton
          cartTotalCurrency={cartTotalCurrency}
          onCartConfirmed={handleCartConfirmed}
        />
      )}
    </IonPage>
  );
};

export default CartScreen;
