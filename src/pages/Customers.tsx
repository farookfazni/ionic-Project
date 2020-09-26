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
  peopleSharp as customerIcon,
} from "ionicons/icons";

import { firestore } from "../firebase";
import { useAuth } from "../auth";
import PopoverComponent from "./PopoverComponent";

const Customers: React.FC = () => {
  const[Customers, setcustomer]=useState([]);
  const {userId} = useAuth();

  useEffect(() => {
    const customerRef = firestore
      .collection('users').doc(userId).collection("Customers");
      customerRef.get().then((snapshot) => {
      const Customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setcustomer(Customers);
    });
  }, [userId]);

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
            <IonIcon icon={customerIcon} /> Customers
          </IonTitle>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="8">
              <IonCard className="ion-align-self-center">
                <IonCardHeader color="cardcolor">
                  <IonCardTitle className="ion-text-center card-title">
                    My Customers
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
                      {Customers.map((entry)=> (<IonRow key={entry.id}>
                      <IonCol>{entry.Customer_name}</IonCol>
                      <IonCol>{entry.id}</IonCol>
                      <IonCol>{entry.Address}</IonCol>
                      <IonCol>{entry.Contact_no}</IonCol>
                      <IonCol>{entry.Email}</IonCol>
                      </IonRow>))}
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
