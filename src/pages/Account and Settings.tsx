import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React from "react";
import "../theme/dashboard.css";
import {
  logOut as logoutIcon,
  settings as settingIcon,
} from "ionicons/icons";

import { auth } from "../firebase";

const Account: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="toolbar">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
          <IonItem
            button
            slot="end"
            color="toolbar"
            onClick={() => auth.signOut()}
          >
            <IonIcon icon={logoutIcon} />
            <IonLabel>LogOut</IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonToolbar>
          <IonTitle className="ion-align-self-center title">
            <IonIcon icon={settingIcon} /> Account and Settings
          </IonTitle>
        </IonToolbar>
        
              <IonCard className="ion-align-self-center" color="cardcolor">
                <IonCardHeader color="cardcolor">
                  <IonCardTitle className="ion-text-center card-title">
                    Customer details of the related order
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                </IonCardContent>
              </IonCard>
            
      </IonContent>
    </IonPage>
  );
};

export default Account;
