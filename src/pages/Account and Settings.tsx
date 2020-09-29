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
  IonInput,
  IonButton,
} from "@ionic/react";
import React, { useState } from "react";
import "../theme/dashboard.css";
import { settings as settingIcon } from "ionicons/icons";
import PopoverComponent from "./PopoverComponent";
import { auth } from "firebase";

const Account: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<any>();
  const [newPassword, setNewPassword] = useState<any>();

  const changePassword = async () => {
    const user = auth().currentUser;
    // reauthenticating
    const cred = auth.EmailAuthProvider.credential(user.email, oldPassword);
    user.reauthenticateWithCredential(cred).then(() => {
        // updating password
        user.updatePassword(newPassword);
        alert("Password changed Successfully");
    }).catch((err)=> {
      alert(err);
      console.log(err);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="toolbar">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
          <PopoverComponent />
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
            <IonLabel color="dark">Change Password</IonLabel>
            <IonItem>
              <IonInput
                value={oldPassword}
                placeholder="Current Password"
                onIonChange={(e) => setOldPassword(e.detail.value)}
              ></IonInput>
              <IonInput
                value={newPassword}
                placeholder="New Password"
                onIonChange={(e) => setNewPassword(e.detail.value)}
              ></IonInput>
              <IonButton onClick={changePassword}>Submit</IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Account;
