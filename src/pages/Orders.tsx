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
import { useAuth } from "../auth";
import { auth, firestore } from "../firebase";

const Orders: React.FC = () => {
  const {userId} = useAuth();
  const [orders, setorder] = useState([]);
  const [customers, setcustomer] = useState([]);

  useEffect(() => {
    const orderRef = firestore.collection('users').doc(userId).collection("Orders");
    orderRef.get().then((snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setorder(orders);
    });
  }, [userId]);

  useEffect(() => {
    const customerRef = firestore.collection('users').doc(userId).collection("Customers").limit(1);
    customerRef.get().then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setcustomer(customers);
    });
  }, [userId]);

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
                        <IonCol>Customer ID</IonCol>
                        <IonCol>Product Name</IonCol>
                        <IonCol>Category</IonCol>
                        <IonCol>Price</IonCol>
                        <IonCol>Quantity</IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonListHeader>
                  <IonList>
                    <IonGrid>
                      {orders.map((entry) => (
                        <IonRow key={entry.id}>
                          <IonCol>{entry.id}</IonCol>

                          <IonCol>{entry.Customer_id}</IonCol>

                          <IonCol>{entry.Product_name}</IonCol>

                          <IonCol>{entry.Category}</IonCol>

                          <IonCol>{entry.Price}</IonCol>

                          <IonCol>{entry.Quantity}</IonCol>
                        </IonRow>
                      ))}
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
