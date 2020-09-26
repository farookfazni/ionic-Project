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
  IonBackButton, 
  IonButton
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../theme/dashboard.css";
import {  } from "ionicons/icons";

import PopoverComponent from "./PopoverComponent";
import { firestore } from "../firebase";
import { useAuth } from "../auth";

const OrderDetails: React.FC = () => {
  const { userId } = useAuth();
  const [entrie, setEntrie] = useState([]);

  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
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
             OrderDetails
          </IonTitle>
        </IonToolbar>
        <IonList>
          {entrie.map((entry) => (
            <IonItem>
              <IonLabel>Order ID</IonLabel>
              <IonLabel>{entry.id}</IonLabel>
            </IonItem>
          ))}
          {entrie.map((entry) => (
          <IonItem>
            <IonLabel>Category</IonLabel>
            <IonLabel>{entry.Category}</IonLabel>
          </IonItem>
          ))}
          {entrie.map((entry) => (
          <IonItem>
            <IonLabel>Product Name</IonLabel>
            <IonLabel>{entry.Product_name}</IonLabel>
          </IonItem>
          ))}
          {entrie.map((entry) => (
          <IonItem>
            <IonLabel>Quantity</IonLabel>
            <IonLabel>{entry.Quantity}</IonLabel>
          </IonItem>
          ))}
          {entrie.map((entry) => (
          <IonItem>
            <IonLabel>Price</IonLabel>
            <IonLabel>{entry.Price}</IonLabel>
          </IonItem>
          ))}
          <IonButton>Proceed</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default OrderDetails;
