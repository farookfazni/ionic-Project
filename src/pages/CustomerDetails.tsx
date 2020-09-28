import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButtons,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBackButton
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../theme/dashboard.css";
import {} from "ionicons/icons";
import PopoverComponent from "./PopoverComponent";
import { firestore } from "../firebase";
import { useAuth } from "../auth";

const CustomerDetails: React.FC = () => {
  const { userId } = useAuth();
  const [entrie, setEntrie] = useState([]);

  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Customers")
      .limit(1);
    entriesRef.get().then((snapshot) => {
      const entrie = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntrie(entrie);
    });
  }, [userId]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/dashboard" />
          </IonButtons>
          <PopoverComponent />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonToolbar>
          <IonTitle className="ion-align-self-center title">
            CustomerDetails
          </IonTitle>
        </IonToolbar>
        <IonList>
          {entrie.map((entry) => (
            <IonItem key={entry.id}>
              <IonLabel>Customer ID</IonLabel>
              <IonLabel>{entry.id}</IonLabel>
            </IonItem>
          ))}
          {entrie.map((entry) => (
            <IonItem key={entry.id}>
              <IonLabel>Customer Name</IonLabel>
              <IonLabel>{entry.Customer_name}</IonLabel>
            </IonItem>
          ))}
          {entrie.map((entry) => (
            <IonItem key={entry.id}>
              <IonLabel>Address</IonLabel>
              <IonLabel>{entry.Address}</IonLabel>
            </IonItem>
          ))}
          {entrie.map((entry) => (
            <IonItem key={entry.id}>
              <IonLabel>Contact No</IonLabel>
              <IonLabel>{entry.Contact_no}</IonLabel>
            </IonItem>
          ))}
          {entrie.map((entry) => (
            <IonItem key={entry.id}>
              <IonLabel>Email</IonLabel>
              <IonLabel>{entry.Email}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CustomerDetails;
