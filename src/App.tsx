import {
  IonApp,
  IonLoading,
  IonContent,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonItem,
  IonAvatar,
  IonLabel,
  IonList,
  IonRouterOutlet,
  IonIcon,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AuthPages from "./AuthPages";
import { AuthContext, useAuthInit } from "./auth";
import NotFoundPage from "./pages/NotFoundPage";
import "./theme/dashboard.css";
import {
  barChart as chartIcon,
  fastFoodSharp as productIcon,
  briefcaseSharp as orderIcon,
  settings as settingIcon,
  peopleSharp as customerIcon,
} from "ionicons/icons";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  
  if (loading) {
    return <IonLoading isOpen />;
  }
  console.log(`rendering App with auth:`, auth);

  return (
    <IonApp>
      <IonMenu side="start" menuId="mainmenu" contentId="main">
        <IonHeader>
          <IonToolbar color="primary">
            <IonItem color="primary">
              <IonAvatar slot="start">
                <img src="./assets/1.jpg" alt="user" />
              </IonAvatar>
              <IonLabel>Farook Fazni</IonLabel>
            </IonItem>
          </IonToolbar>
        </IonHeader>
        <IonContent color="menu">
          <IonList inset={true} mode="ios">
            <IonItem color="menu" button detail={true} routerLink="/my/dashboard">
              <IonIcon icon={chartIcon} className="menu-icon" />
              Dashboard
            </IonItem>
            <IonItem color="menu" button detail={true} routerLink="/my/products">
              <IonIcon icon={productIcon} className="menu-icon" />
              Products
            </IonItem>
            <IonItem color="menu" button detail={true} routerLink="/my/orders">
              <IonIcon icon={orderIcon} className="menu-icon" />
              Orders
            </IonItem>
            <IonItem color="menu" button detail={true}>
            <IonIcon icon={customerIcon} className="menu-icon" />
              Customers
            </IonItem>
            <IonItem color="menu" button detail={true}>
            <IonIcon icon={settingIcon} className="menu-icon" />
              Account and Settings
            </IonItem>
            <IonItem color="menu" button detail={true}>
              Menu Item
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonRouterOutlet id="main"></IonRouterOutlet>

      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <Switch>
          <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route path="/my">
              <AuthPages />
            </Route>
            <Redirect exact path="/" to="/my/dashboard" />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
