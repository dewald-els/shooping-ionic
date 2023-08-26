import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from "@ionic/react";
import {
  basketOutline,
  storefrontOutline,
  personOutline,
  basket,
  storefront,
  person,
} from "ionicons/icons";
import { Redirect, Route } from "react-router";
import ProductsTabScreen from "./ProductsTab";
import YouTabScreen from "./YouTab";
import UsTabScreen from "./UsTab";
import useProductSubscription from "../../hooks/useProductSubscription";
import useProductOptionSubscription from "../../hooks/useProductOptionSubscription";
import { AppRoutes } from "../../consts/routes";
import TermsAndConditionsScreen from "../terms-and-conditions/TermsAndConditions";
import OrderHistoryDetail from "./you/OrderHistoryDetail";
import OrderHistoryScreen from "./you/OrderHistory";

const TabScreen: React.FC = () => {
  useProductSubscription();
  useProductOptionSubscription();

  const { routeInfo } = useIonRouter();

  const tabIcons = {
    products:
      routeInfo.pathname === "/tabs" || routeInfo.pathname.includes("products")
        ? basket
        : basketOutline,
    you: routeInfo.pathname.includes("you") ? person : personOutline,
    us: routeInfo.pathname.includes("us") ? storefront : storefrontOutline,
  };

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs">
          <Redirect to="/tabs/products" />
        </Route>

        <Route path="/tabs/products" component={ProductsTabScreen} />
        <Route exact path="/tabs/you" component={YouTabScreen} />
        <Route
          exact
          path="/tabs/you/order-history"
          component={OrderHistoryScreen}
        />
        <Route
          path="/tabs/you/order-history/:orderId"
          component={OrderHistoryDetail}
        />
        <Route path="/tabs/us" component={UsTabScreen} />
        <Route
          path={AppRoutes.TermsAndConditionsTabScreen}
          component={TermsAndConditionsScreen}
        />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="products" href="/tabs/products">
          <IonIcon icon={tabIcons.products} />
          <IonLabel>Products</IonLabel>
        </IonTabButton>

        <IonTabButton tab="you" href="/tabs/you">
          <IonIcon icon={tabIcons.you} />
          <IonLabel>You</IonLabel>
        </IonTabButton>

        <IonTabButton tab="us" href="/tabs/us">
          <IonIcon icon={tabIcons.us} />
          <IonLabel>Us</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabScreen;
