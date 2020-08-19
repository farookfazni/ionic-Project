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
import AppTabs from "./AppTabs";
import { AuthContext, useAuthInit } from "./auth";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import "./theme/dashboard.css";
import {
  barChart as chartIcon,
  fastFoodSharp as productIcon,
  briefcaseSharp as orderIcon,
  settings as settingIcon,
  peopleSharp as customerIcon,
} from "ionicons/icons";

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
            <IonItem color="menu" button detail={true} routerLink="/dashboard">
              <IonIcon icon={chartIcon} className="menu-icon" />
              Dashboard
            </IonItem>
            <IonItem color="menu" button detail={true} routerLink="/products">
              <IonIcon icon={productIcon} className="menu-icon" />
              Products
            </IonItem>
            <IonItem color="menu" button detail={true} routerLink="/orders">
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
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/orders">
              <Orders />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>
            <Redirect exact path="/" to="/my/home" />
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
