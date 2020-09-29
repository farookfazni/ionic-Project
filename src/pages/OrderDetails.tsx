import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonButtons,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../theme/dashboard.css";
import {} from "ionicons/icons";

import PopoverComponent from "./PopoverComponent";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { useHistory, useParams } from "react-router";

interface RouteParams {
  id: string;
}

const OrderDetails: React.FC = () => {
  const { userId } = useAuth();
  const [entrie, setEntrie] = useState([]);
  const [Status, setStatus] = useState();
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [error, setError] = useState(false);

  const handleStatus = async () => {
    try {
      const StatusData = {
        Status,
      };
      await firestore
        .collection("users")
        .doc(userId)
        .collection("Orders")
        .doc(id)
        .update(StatusData);
      setError(false);
      history.goBack();
    } catch (err) {
      setError(true);
    }
  };

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
        <IonCard color="menu">
          <IonCardHeader>
            <IonToolbar>
              <IonCardTitle className="ion-align-self-center title">
                OrderDetails
              </IonCardTitle>
            </IonToolbar>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {entrie.map((entry) => (
                <IonItem key={entry.id}>
                  <IonLabel>Order ID</IonLabel>
                  <IonLabel>{entry.id}</IonLabel>
                </IonItem>
              ))}
              {entrie.map((entry) => (
                <IonItem key={entry.id}>
                  <IonLabel>Category</IonLabel>
                  <IonLabel>{entry.Category}</IonLabel>
                </IonItem>
              ))}
              {entrie.map((entry) => (
                <IonItem key={entry.id}>
                  <IonLabel>Product Name</IonLabel>
                  <IonLabel>{entry.Product_name}</IonLabel>
                </IonItem>
              ))}
              {entrie.map((entry) => (
                <IonItem key={entry.id}>
                  <IonLabel>Quantity</IonLabel>
                  <IonLabel>{entry.Quantity}</IonLabel>
                </IonItem>
              ))}
              {entrie.map((entry) => (
                <IonItem key={entry.id}>
                  <IonLabel>Price</IonLabel>
                  <IonLabel>{entry.Price}</IonLabel>
                </IonItem>
              ))}

              <IonItem>
                <IonLabel>Set Status</IonLabel>
                <IonSelect
                  interface="popover"
                  value={Status}
                  placeholder="select-one"
                  onIonChange={(event) => setStatus(event.detail.value)}
                >
                  <IonSelectOption value="Waiting">Waiting</IonSelectOption>
                  <IonSelectOption value="On Process">
                    On Process
                  </IonSelectOption>
                  <IonSelectOption value="Sent">Sent</IonSelectOption>
                </IonSelect>
              </IonItem>
              {error && <IonText color="danger">Select Status</IonText>}
              <IonButton onClick={handleStatus}>Proceed</IonButton>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default OrderDetails;
