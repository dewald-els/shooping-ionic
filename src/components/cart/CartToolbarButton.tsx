import {
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  useIonRouter,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import { AppRoutes } from "../../consts/routes";
import useAppStore from "../../store/store";

const CartToolbarButton = () => {
  const router = useIonRouter();
  const cart = useAppStore((state) => state.cart);

  if (!cart) return null;

  const itemCount = cart.product_options.length ?? 0;

  const handleCartClick = () => {
    router.push(AppRoutes.CartScreen);
  };

  return (
    <IonButtons slot="end">
      <IonButton onClick={handleCartClick}>
        <IonIcon slot="end" icon={cartOutline} />
        <IonBadge color={"dark"}>{itemCount}</IonBadge>
      </IonButton>
    </IonButtons>
  );
};

export default CartToolbarButton;
