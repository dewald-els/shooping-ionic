import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
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
import { Order, OrderStatus } from "../../models/order";
import useProfile from "../../hooks/useProfile";
import { useAuth } from "../../context/AuthContext";
import CartConfirmOrderModal from "../../modals/cart/CartConfirmOrder";
import { useEffect, useRef, useState } from "react";
import { AppRoutes } from "../../consts/routes";

const CartScreen: React.FC = () => {
  const pageRef = useRef();

  const [completedOrder, setCompletedOrder] = useState(false);

  const router = useIonRouter();
  const [presentModal, dismissModal] = useIonModal(CartConfirmOrderModal, {
    onDismiss: (success: boolean, role: string) => {
      setCompletedOrder(success && role === "confirm");
      dismissModal();
    },
  });
  const cart = useAppStore((state) => state.cart);
  const setOrder = useAppStore((state) => state.setOrder);
  const clearCart = useAppStore((state) => state.clearCart);
  const clearOrder = useAppStore((state) => state.clearOrder);
  const { session } = useAuth();
  const { profile } = useProfile(session?.user.id);
  const productOptions: CartProductOption[] = [];

  if (cart) {
    productOptions.push(...cart.product_options);
  }

  useEffect(() => {
    if (completedOrder) {
      clearCart();
      clearOrder();
      router.push(
        AppRoutes.Tabs + "/" + AppRoutes.YouTabScreen,
        "root",
        "replace"
      );
    }
  }, [completedOrder]);

  const handleGoShoppingClick = () => {
    router.goBack();
  };

  const cartTotal = productOptions.reduce(
    (total, option) => total + option.unit_price * option.quantity,
    0
  );

  const cartTotalCurrency = formatCurrency(cartTotal);

  const handleCartConfirmed = async () => {
    const order: Order = {
      product_options: productOptions,
      total: cartTotal,
      profile_id: profile!.id,
      status: OrderStatus.Created,
    };
    setOrder(order);
    presentModal({
      presentingElement: pageRef.current,
    });
  };

  return (
    <IonPage ref={pageRef}>
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
