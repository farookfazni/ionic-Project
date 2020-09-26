import {
  IonRouterOutlet,

  IonPage,
} from "@ionic/react";
import { } from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./auth";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Account from "./pages/Account and Settings";
import Customers from "./pages/Customers";
import ProfilePage from "./pages/ProfilePage";
import OrderDetails from "./pages/OrderDetails";

const AuthPages: React.FC = () => {
  const {loggedIn} = useAuth();
  if(!loggedIn){
    return <Redirect to="/login"/>;
  }
  return (
    <IonPage>
      <IonRouterOutlet>
            <Route exact path="/my/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/my/profilepage/:id">
              <ProfilePage/>
            </Route>
            <Route exact path="/my/products">
              <Products />
            </Route>
            <Route exact path="/my/orders">
              <Orders />
            </Route>
            <Route exact path="/my/singleorder/:id">
              <OrderDetails />
            </Route>
            <Route exact path="/my/account">
              <Account/>
            </Route>
            <Route exact path="/my/customers">
              <Customers />
            </Route>
      </IonRouterOutlet>
      
    </IonPage>
  );
};

export default AuthPages;
