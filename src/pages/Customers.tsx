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
  ellipse as listicon,
  logOut as logoutIcon,
  peopleSharp as customerIcon,
} from "ionicons/icons";

import { auth, firestore } from "../firebase";

const Customers: React.FC = () => {
  const[Customers, setcustomer]=useState([]);

  useEffect(() => {
    const customerRef = firestore
      .collection("Customers");
      customerRef.get().then((snapshot) => {
      const Customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setcustomer(Customers);
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
            <IonIcon icon={customerIcon} /> Customers
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
                        <IonCol>Customer Name</IonCol>
                        <IonCol>Customer ID</IonCol>
                        <IonCol>Address</IonCol>
                        <IonCol>Contact No</IonCol>
                        <IonCol>Email</IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonListHeader>
                  <IonList>
                    <IonGrid>
                      <IonRow>
                      {Customers.map((entry) => (<IonCol key={entry.id}>{entry.Customer_name}</IonCol>))}
                      {Customers.map((entry) => (<IonCol key={entry.id}>{entry.id}</IonCol>))}
                      {Customers.map((entry) => (<IonCol key={entry.id}>{entry.Address}</IonCol>))}
                      {Customers.map((entry) => (<IonCol key={entry.id}>{entry.Contact_no}</IonCol>))}
                      {Customers.map((entry) => (<IonCol key={entry.id}>{entry.Email}</IonCol>))}
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
                    Latest Customer 
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
                      <IonLabel />
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

export default Customers;
