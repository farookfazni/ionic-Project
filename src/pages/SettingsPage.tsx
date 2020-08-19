import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButton,
  IonMenuButton,
  IonButtons,
} from "@ionic/react";
import React from "react";
import { auth } from "../firebase";

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons className="ion-align-self-start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle className="ion-align-self-center">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton color="medium" expand="block" onClick={() => auth.signOut()}>
          LogOut
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
