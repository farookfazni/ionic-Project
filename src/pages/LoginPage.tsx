import {
  IonHeader,
  IonTitle,
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
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFooter,
} from "@ionic/react";
import React, { useState } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../auth";
import { auth } from "../firebase";
import '../theme/login.css';

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setstatus] = useState({ loading: false, error: false });

  const handleLogin = async () => {
    try {
      setstatus({ loading: true, error: false });
      const credential = await auth.signInWithEmailAndPassword(email, password);
      console.log("credential:", credential);
    } catch (error) {
      setstatus({ loading: false, error: true });
      console.log("error :", error);
      alert(error);
    }
  };

  const forgetPassword = async () => {
     await auth.sendPasswordResetEmail(email).then((user)=>{
      alert('please Check your email')
    }).catch((e)=>{
      console.log(e);
      alert(e);
    })
  }

  if (loggedIn) {
    return <Redirect to="/my/dashboard" />;
  }
  return (
    <IonPage className="bg-img">
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonCard className="ion-align-self-center login-card">
        <IonCardHeader color="tertiary">
          <IonCardTitle className="ion-text-center">Login</IonCardTitle>
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

          {status.error && <IonText color="danger">Invalid credential</IonText>}
          <IonButton expand="block" onClick={handleLogin}>
            Login
          </IonButton>
          <IonButton style={{margin:0}} expand="block" fill="clear" onClick={forgetPassword}>
            <p style={{fontSize:10}}>Forget Password</p>
          </IonButton>
          <IonLoading isOpen={status.loading} />
        </IonCardContent>
      </IonCard>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default LoginPage;
