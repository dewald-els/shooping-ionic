import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import CartConfirmOrderSuccess from "../../components/cart/CartConfirmOrderSuccess";
import { AppRoutes } from "../../consts/routes";

const CartConfirmSuccessScreen: React.FC = () => {
  const router = useIonRouter();

  const handleViewOrderClick = () => {
    router.push(
      AppRoutes.Tabs + "/" + AppRoutes.YouTabScreen,
      "root",
      "replace"
    );
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Success</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CartConfirmOrderSuccess onViewOrderClick={handleViewOrderClick} />
      </IonContent>
    </IonPage>
  );
};

export default CartConfirmSuccessScreen;
