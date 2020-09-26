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
} from "@ionic/react";
import React from "react";
import "../theme/dashboard.css";
import {
  settings as settingIcon,
} from "ionicons/icons";

import PopoverComponent from "./PopoverComponent";

const Account: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="toolbar">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
          <PopoverComponent/>
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
                    General Settings
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
