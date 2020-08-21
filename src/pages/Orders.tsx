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
  IonItem,
  IonLabel,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../theme/dashboard.css";
import {
  briefcaseSharp as orderIcon,
  ellipse as listicon,
  logOut as logoutIcon,
} from "ionicons/icons";

import { auth, firestore } from "../firebase";




const Orders: React.FC = () => {
  const [orders, setorder] = useState<any>([]);
  const [customers, setcustomer] = useState([]);
  

  useEffect(() => {
    const orderRef = firestore
      .collection("Customers")
      .doc()
      .collection("Orders");

    orderRef.get().then((snapshot) => {
      const orders = [];
      snapshot.docs.forEach(document =>{
        const suborders = {
          id: document.id,
          ...document.data(),
        };
        orders.push(suborders);
      });
        setorder(orders);
      });
      
  }, []);

  useEffect(() => {
    const customerRef = firestore.collection("Customers").limit(1);
    customerRef.get().then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setcustomer(customers);
    });
  }, []);

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
            <IonIcon icon={orderIcon} /> Orders
          </IonTitle>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="8">
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
                        <IonCol>Order ID</IonCol>
                        <IonCol>Product Name</IonCol>
                        <IonCol>Category</IonCol>
                        <IonCol>Price</IonCol>
                        <IonCol>Quantity</IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonListHeader>
                  <IonList>
                    <IonGrid>
                      <IonRow>
                        {orders.map(entry => (
                          <IonCol key={entry.id}>{entry.id}</IonCol>
                        ))}
                        {orders.map(entry => (
                          <IonCol key={entry.id}>{entry.Product_name}</IonCol>
                        ))}
                        {orders.map(entry => (
                          <IonCol key={entry.id}>{entry.Category}</IonCol>
                        ))}
                        {orders.map(entry => (
                          <IonCol key={entry.id}>{entry.Price}</IonCol>
                        ))}
                        {orders.map(entry => (
                          <IonCol key={entry.id}>{entry.Quantity}</IonCol>
                        ))}
                      </IonRow>
                    </IonGrid>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="4">
              <IonCard className="ion-align-self-center" color="cardcolor">
                <IonCardHeader color="cardcolor">
                  <IonCardTitle className="ion-text-center card-title">
                    Customer details of the related order
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList inset={true} mode="ios">
                    <IonItem color="cardcolor">
                      <IonIcon
                        icon={listicon}
                        className="list-icon"
                        color="tertiary"
                      />
                      <IonLabel position="stacked">Customer Name</IonLabel>
                      {customers.map((entry) => (
                        <IonLabel key={entry.id}>
                          {entry.Customer_name}
                        </IonLabel>
                      ))}
                    </IonItem>
                    <IonItem color="cardcolor">
                      <IonIcon
                        icon={listicon}
                        className="list-icon"
                        color="tertiary"
                      />
                      <IonLabel position="stacked">Customer ID</IonLabel>
                      <IonLabel />
                    </IonItem>
                    <IonItem color="cardcolor">
                      <IonIcon
                        icon={listicon}
                        className="list-icon"
                        color="tertiary"
                      />
                      <IonLabel position="stacked">Address</IonLabel>
                      <IonLabel />
                    </IonItem>
                    <IonItem color="cardcolor">
                      <IonIcon
                        icon={listicon}
                        className="list-icon"
                        color="tertiary"
                      />
                      <IonLabel position="stacked">Contact No</IonLabel>
                      <IonLabel />
                    </IonItem>
                    <IonItem color="cardcolor">
                      <IonIcon
                        icon={listicon}
                        className="list-icon"
                        color="tertiary"
                      />
                      <IonLabel position="stacked">Email</IonLabel>
                      <IonLabel />
                    </IonItem>
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
