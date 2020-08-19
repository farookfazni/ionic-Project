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
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonIcon,
} from "@ionic/react";
import React from "react";
import "../theme/dashboard.css";
import { fastFoodSharp as productIcon } from "ionicons/icons";

//import { auth } from "../firebase";

const Products: React.FC = () => {
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
            <IonIcon icon={productIcon} /> Products
          </IonTitle>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard className="ion-align-self-center">
                <IonCardHeader color="cardcolor">
                  <IonCardTitle className="ion-text-center card-title">
                    Latest Products
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>details</IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="ion-align-self-center">
                <IonCardHeader color="cardcolor">
                  <IonCardTitle className="ion-text-center card-title">
                    Add Products
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList inset={true} mode="ios">
                    <IonItem>
                      <IonLabel position="stacked">Product Name</IonLabel>
                      <IonInput />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Product ID</IonLabel>
                      <IonInput type="number" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Manufacture</IonLabel>
                      <IonInput />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Category</IonLabel>
                      <IonInput />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Price</IonLabel>
                      <IonInput />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Quantity</IonLabel>
                      <IonInput type="number" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Description</IonLabel>
                      <IonTextarea />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Import Image</IonLabel>
                      <IonInput accept="file" />
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

export default Products;
