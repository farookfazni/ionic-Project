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
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonList,
  IonListHeader, 
  IonItem
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../theme/dashboard.css";
import { briefcaseSharp as orderIcon } from "ionicons/icons";
import { useAuth } from "../auth";
import { firestore } from "../firebase";
import PopoverComponent from "./PopoverComponent";

const Orders: React.FC = () => {
  const { userId } = useAuth();
  const [orders, setorder] = useState([]);

  useEffect(() => {
    const orderRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders");
    orderRef.get().then((snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setorder(orders);
    });
  }, [userId]);

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
            <IonIcon icon={orderIcon} /> Orders
          </IonTitle>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard className="ion-align-self-center">
                <IonCardHeader color="cardcolor">
                  <IonCardTitle className="ion-text-center card-title">
                    My orders
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonListHeader color="medium">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="1">Product Name</IonCol>
                        <IonCol size="1">Category</IonCol>
                        <IonCol size="1">Price</IonCol>
                        <IonCol size="1">Quantity</IonCol>
                        <IonCol size="1">Customer Name</IonCol>
                        <IonCol size="1">Address</IonCol>
                        <IonCol size="1">Contact No</IonCol>
                        <IonCol size="2">Email</IonCol>
                        <IonCol size="2">Deliver the product at</IonCol>
                        <IonCol size="1">Status</IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonListHeader>
                  <IonList>
                    <IonGrid>
                      {orders.map((entry) => (
                        <IonRow key={entry.id}>
                          

                          <IonCol size="1">{entry.Product_name}</IonCol>

                          <IonCol size="1">{entry.Category}</IonCol>

                          <IonCol size="1">{entry.Price}</IonCol>

                          <IonCol size="1">{entry.Quantity}</IonCol>
                          <IonCol size="1">{entry.Customer_name}</IonCol>
                          <IonCol size="1">{entry.Address}</IonCol>
                          <IonCol size="1">{entry.Contact_no}</IonCol>
                          <IonCol size="2">{entry.Email}</IonCol>
                          <IonCol size="2">{new Date(
                            entry.Date_Time.seconds * 1000
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })}</IonCol>
                          <IonCol size="1"><IonItem lines="none" button routerLink={`/my/singleorder/${entry.id}`}>{entry.Status}</IonItem></IonCol>
                        </IonRow>
                      ))}
                    </IonGrid>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Orders;
