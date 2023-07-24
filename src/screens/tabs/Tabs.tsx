import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {
  basketOutline,
  storefrontOutline,
  personOutline,
} from "ionicons/icons";
import { Redirect, Route } from "react-router";
import ProductsTabScreen from "./ProductsTab";
import YouTabScreen from "./YouTab";
import UsTabScreen from "./UsTab";

const TabScreen: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs">
          <Redirect to="/tabs/products" />
        </Route>

        <Route path="/tabs/products" component={ProductsTabScreen} />
        <Route path="/tabs/you" component={YouTabScreen} />
        <Route path="/tabs/us" component={UsTabScreen} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="products" href="/tabs/products">
          <IonIcon icon={basketOutline} />
          <IonLabel>Products</IonLabel>
        </IonTabButton>

        <IonTabButton tab="you" href="/tabs/you">
          <IonIcon icon={personOutline} />
          <IonLabel>You</IonLabel>
        </IonTabButton>

        <IonTabButton tab="us" href="/tabs/us">
          <IonIcon icon={storefrontOutline} />
          <IonLabel>Us</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabScreen;
