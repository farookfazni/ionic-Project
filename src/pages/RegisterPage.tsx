import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonButton,
  IonLabel,
  IonItem,
  IonList,
  IonInput,
  IonText,
  IonLoading,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonFooter,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import React, { useState } from "react";
import { auth } from "../firebase";
import '../theme/login.css';
import PopoverComponent from "./PopoverComponent";

const RegisterPage: React.FC = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setstatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {
    try {
      setstatus({ loading: true, error: false });
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("credential:", credential);
      setstatus({loading:false,error:false});
      alert("Registered Succsessfully");
    } catch (error) {
      setstatus({ loading: false, error: true });
      console.log("error :", error);
      alert(error);
    }
  };

 
  return (
    <IonPage className="bg-img">
      <IonHeader>
      <IonToolbar color="toolbar">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} menu="mainmenu"></IonMenuButton>
          </IonButtons>
          <PopoverComponent />
        </IonToolbar>
      </IonHeader>
      <IonCard className="ion-align-self-center login-card">
        <IonCardHeader color="tertiary">
          <IonCardTitle className="ion-text-center">Register</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(event) => setemail(event.detail.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(event) => setPassword(event.detail.value)}
              />
            </IonItem>
          </IonList>
          {status.error && (
            <IonText color="danger">Registration Failed</IonText>
          )}
          <IonButton expand="block" onClick={handleRegister}>
            Create Account
          </IonButton>
          <IonLoading isOpen={status.loading} />
        </IonCardContent>
      </IonCard>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default RegisterPage;
