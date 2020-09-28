import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../theme/dashboard.css";
import {
  barChart as chartIcon,
  briefcaseSharp as orderIcon,
  peopleSharp as customerIcon,
  chatboxEllipsesSharp as feedbackIcon,
  ellipse as listicon,
  informationCircleSharp as infoIcon,
} from "ionicons/icons";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import PopoverComponent from "./PopoverComponent";

const Dashboard: React.FC = () => {
  const { userId } = useAuth();
  const [entrie, setEntrie] = useState([]);
  const [Customers, setCustomers] = useState([]);
  const [customersize, setcustomersize] = useState<any>();
  const [Ordersize, setOrdersize] = useState<any>();

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
  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Customers")
      .limit(1);
    entriesRef.get().then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customers);
    });
  }, [userId]);

  useEffect(()=>{
    const customersize = firestore.collection("users").doc(userId).collection("Customers");
    customersize.get().then(snap =>{
      const customersize = snap.size;
      setcustomersize(customersize);
    })
  }, [userId]);

  useEffect(()=>{
    const Ordersize = firestore.collection("users").doc(userId).collection("Orders");
    Ordersize.get().then(snap =>{
      const Ordersize = snap.size;
      setOrdersize(Ordersize);
    })
  }, [userId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="toolbar">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} menu="mainmenu"></IonMenuButton>
          </IonButtons>
          <PopoverComponent />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonToolbar>
          <IonTitle className="ion-align-self-center title">
            <IonIcon icon={chartIcon} /> Dashboard
          </IonTitle>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonCard color="cardcolor">
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="4">
                        <IonIcon className="icon" icon={orderIcon}></IonIcon>
                      </IonCol>
                      <IonCol size="8">
                        <IonRow>
                          <IonLabel className="title-sub">
                            Todays Orders
                            <IonButton
                              mode="ios"
                              routerLink="/my/orders"
                              fill="clear"
                            >
                              <IonIcon
                                slot="icon-only"
                                icon={infoIcon}
                                className="info-icon"
                              />
                            </IonButton>
                          </IonLabel>
                        </IonRow>
                        <IonRow>
                          <IonLabel className="ion-text-center">{Ordersize}</IonLabel>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard color="cardcolor">
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="4">
                        <IonIcon className="icon" icon={customerIcon}></IonIcon>
                      </IonCol>
                      <IonCol size="8">
                        <IonRow>
                          <IonLabel className="title-sub">
                            Customers
                            <IonButton
                              mode="ios"
                              routerLink="/my/customers"
                              fill="clear"
                            >
                              <IonIcon
                                slot="icon-only"
                                icon={infoIcon}
                                className="info-icon"
                              />
                            </IonButton>
                          </IonLabel>
                        </IonRow>
                        <IonRow>
                          <IonLabel className="ion-text-center">{customersize}</IonLabel>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard color="cardcolor">
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="4">
                        <IonIcon className="icon" icon={feedbackIcon}></IonIcon>
                      </IonCol>
                      <IonCol size="8">
                        <IonRow>
                          <IonLabel className="title-sub">
                            Feedback
                            <IonButton
                              mode="ios"
                              routerLink="/my/orders"
                              fill="clear"
                            >
                              <IonIcon
                                slot="icon-only"
                                icon={infoIcon}
                                className="info-icon"
                              />
                            </IonButton>
                          </IonLabel>
                        </IonRow>
                        <IonRow>
                          <IonLabel className="ion-text-center">1</IonLabel>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              {entrie.map((entry) => (
                <IonCard
                  key={entry.id}
                  className="ion-align-self-center"
                  color="cardcolor"
                >
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-start card-title">
                      Latest Order{" "}
                      <IonButton
                        mode="ios"
                        routerLink={`/my/singleorder/${entry.id}`}
                        fill="clear"
                      >
                        <IonIcon icon={infoIcon} className="info-icon" />
                      </IonButton>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent color="cardcolor">
                    <IonList inset={true} mode="ios">
                      <IonItem color="cardcolor">
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Product Name</IonLabel>
                        <IonLabel>{entry.Product_name}</IonLabel>
                      </IonItem>
                      <IonItem color="cardcolor">
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Order ID</IonLabel>
                        <IonLabel>{entry.id}</IonLabel>
                      </IonItem>
                      <IonItem color="cardcolor">
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Category</IonLabel>
                        <IonLabel>{entry.Category}</IonLabel>
                      </IonItem>
                      <IonItem color="cardcolor">
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Price</IonLabel>
                        <IonLabel>{entry.Price}</IonLabel>
                      </IonItem>
                      <IonItem color="cardcolor">
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Quantity</IonLabel>
                        <IonLabel>{entry.Quantity}</IonLabel>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonCol>

            <IonCol size="6">
              {Customers.map((entry) => (
                <IonCard
                  key={entry.id}
                  className="ion-align-self-center"
                  color="cardcolor"
                >
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-start card-title">
                      Latest Customer
                      <IonButton
                        mode="ios"
                        routerLink={`/my/singlecustomer/${entry.id}`}
                        fill="clear"
                      >
                        <IonIcon icon={infoIcon} className="info-icon" />
                      </IonButton>
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
                        <IonLabel>{entry.Customer_name}</IonLabel>
                      </IonItem>
                      <IonItem color="cardcolor">
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Customer ID</IonLabel>
                        <IonLabel>{entry.id}</IonLabel>
                      </IonItem>
                      <IonItem color="cardcolor">
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Address</IonLabel>
                        <IonLabel>{entry.Address}</IonLabel>
                      </IonItem>
                      <IonItem color="cardcolor">
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Contact No</IonLabel>
                        <IonLabel>{entry.Contact_no}</IonLabel>
                      </IonItem>
                      <IonItem color="cardcolor">
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonLabel>{entry.Email}</IonLabel>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
