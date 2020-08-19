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
import React from "react";
import "../theme/dashboard.css";
import { briefcaseSharp as orderIcon, ellipse as listicon, } from "ionicons/icons";

//import { auth } from "../firebase";

const Orders: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="toolbar">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
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
                        <IonCol>Product ID</IonCol>
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
                          <IonCol>asd</IonCol>
                          <IonCol>aaa</IonCol>
                          <IonCol>aa</IonCol>
                          <IonCol>xx</IonCol>
                          <IonCol>ff</IonCol>
                          <IonCol>ee</IonCol>
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

export default Orders;
