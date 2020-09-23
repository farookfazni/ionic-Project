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
  IonChip,
  IonAvatar,
  IonPopover,
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
  logOut as logoutIcon,
  settings as settingIcon,
  person as profileIcon,
} from "ionicons/icons";
import { auth, firestore } from "../firebase";
import { useAuth } from "../auth";
import { Entry, toEntry } from "../model";

const Dashboard: React.FC = () => {
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [entrie, setEntrie] = useState([]);
  const [Customers, setCustomers] = useState([]);
  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Details");
    return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);

  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders").limit(1);
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
      .collection("Customers").limit(1);
    entriesRef.get().then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customers);
    });
  }, [userId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="toolbar">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} menu="mainmenu"></IonMenuButton>
          </IonButtons>
          {entries.map((entry) => (
            <IonPopover
              key={entry.id}
              cssClass="pop-over"
              isOpen={showPopover.open}
              event={showPopover.event}
              onDidDismiss={(e) =>
                setShowPopover({ open: false, event: undefined })
              }
            >
              <IonList>
                <IonItem
                  button
                  routerLink={`/my/profilepage/${entry.id}`}
                  onClick={(e) =>
                    setShowPopover({ open: false, event: e.nativeEvent })
                  }
                >
                  <IonIcon icon={profileIcon} /> Profile
                </IonItem>
                <IonItem button>
                  <IonIcon icon={settingIcon} />
                  Settings
                </IonItem>
                <IonItem button onClick={() => auth.signOut()}>
                  <IonIcon icon={logoutIcon} />
                  LogOut
                </IonItem>
              </IonList>
            </IonPopover>
          ))}
          <IonChip
            slot="end"
            onClick={(e) =>
              setShowPopover({ open: true, event: e.nativeEvent })
            }
          >
            <IonAvatar>
              <img src="./assets/1.jpg" alt="" />
            </IonAvatar>
            <IonLabel>Farook Fazni</IonLabel>
          </IonChip>
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
                          <IonLabel className="ion-text-center">1</IonLabel>
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
                          <IonLabel className="ion-text-center">1</IonLabel>
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
                <IonCard key={entry.id} className="ion-align-self-center" color="cardcolor">
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-start card-title">
                      Latest Order{" "}
                      <IonIcon icon={infoIcon} className="info-icon" />
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
                        <IonLabel position="stacked">Product ID</IonLabel>
                        <IonLabel>{entry.Product_id}</IonLabel>
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
            {Customers.map((entry) => (<IonCard key={entry.id} className="ion-align-self-center" color="cardcolor">
                <IonCardHeader>
                  <IonCardTitle className="ion-text-start card-title">
                    Latest Customer
                    <IonIcon icon={infoIcon} className="info-icon" />
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
              </IonCard>))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
