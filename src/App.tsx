import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomeScreen from "./screens/home/Home";
import CreateAccountScreen from "./screens/create-account/CreateAccount";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import TabScreen from "./screens/tabs/Tabs";
import PrivateRoute from "./components/shared/private-route/PrivateRoute";
import LoginScreen from "./screens/login/Login";
import { AppRoutes } from "./consts/routes";
import TermsAndConditionsScreen from "./screens/terms-and-conditions/TermsAndConditions";
import CartScreen from "./screens/cart/Cart";
import CartConfirmScreen from "./screens/cart/CartConfirm";
import CartConfirmSuccessScreen from "./screens/cart/CartConfirmSuccess";

setupIonicReact({
  innerHTMLTemplatesEnabled: true,
});

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path={AppRoutes.Welcome} component={HomeScreen} />
        <Route path={AppRoutes.CreateAccount} component={CreateAccountScreen} />
        <Route path={AppRoutes.Login} component={LoginScreen} />
        <Route
          path={AppRoutes.TermsAndConditions}
          component={TermsAndConditionsScreen}
        />
        <Route
          path="/tabs"
          render={() => (
            <PrivateRoute>
              <TabScreen />
            </PrivateRoute>
          )}
        />
        <Route
          path={AppRoutes.CartScreen}
          exact={true}
          render={() => (
            <PrivateRoute>
              <CartScreen />
            </PrivateRoute>
          )}
        />
        <Route
          exact
          path={AppRoutes.CartConfirmScreen}
          render={() => (
            <PrivateRoute>
              <CartConfirmScreen />
            </PrivateRoute>
          )}
        />
        <Route
          path={AppRoutes.CartConfirmSuccessScreen}
          render={() => (
            <PrivateRoute>
              <CartConfirmSuccessScreen />
            </PrivateRoute>
          )}
        />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
