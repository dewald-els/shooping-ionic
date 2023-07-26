import {
  IonBadge,
  IonFab,
  IonFabButton,
  IonIcon,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import useAppStore from "../../store/store";
import { AppRoutes } from "../../consts/routes";

const CartFab: React.FC = () => {
  const router = useIonRouter();
  const cart = useAppStore((state) => state.cart);

  if (!cart) return null;

  const handleCartClick = () => {
    router.push(AppRoutes.CartTabScreen);
  };

  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <div className="flex items-center">
        <div>
          <IonBadge color="dark">15:00</IonBadge>
        </div>
        <IonFabButton color={"success"} onClick={handleCartClick}>
          <IonIcon icon={cartOutline} />
        </IonFabButton>
      </div>
    </IonFab>
  );
};

export default CartFab;
