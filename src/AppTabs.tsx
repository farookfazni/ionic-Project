import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { home as HomeIcon, settings as SettingIcon } from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EntryPage from "./pages/EntryPage";
import SettingsPage from "./pages/SettingsPage";
import { useAuth } from "./auth";
import AddEntryPage from "./pages/AddEntryPage";


const AppTabs: React.FC = () => {
  const {loggedIn} = useAuth();
  if(!loggedIn){
    return <Redirect to="/login"/>;
  }
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/home">
          <HomePage /> 
        </Route>
        <Route exact path="/my/entries/add">
          <AddEntryPage />
        </Route>
        <Route exact path="/my/entries/view/:id">
          <EntryPage />
        </Route>
        <Route exact path="/my/settings">
          <SettingsPage />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/home">
          <IonIcon icon={HomeIcon} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={SettingIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
