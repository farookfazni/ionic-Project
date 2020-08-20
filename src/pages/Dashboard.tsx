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
import React from "react";
import "../theme/dashboard.css";
import {
  barChart as chartIcon,
  briefcaseSharp as orderIcon,
  peopleSharp as customerIcon,
  chatboxEllipsesSharp as feedbackIcon,
  ellipse as listicon,
  informationCircleSharp as infoIcon,
} from "ionicons/icons";

import { auth } from "../firebase";

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="toolbar">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} menu="mainmenu"></IonMenuButton>
          </IonButtons>
          <IonButton color="medium" slot="end" onClick={() => auth.signOut()}>
          LogOut
        </IonButton>
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
                            <IonIcon icon={infoIcon} className="info-icon" />
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
                            <IonIcon icon={infoIcon} className="info-icon" />
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
                            <IonIcon icon={infoIcon} className="info-icon" />
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
              <IonCard className="ion-align-self-center" color="cardcolor">
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
                      <IonLabel />
                    </IonItem>
                    <IonItem color="cardcolor">
                      <IonIcon
                        icon={listicon}
                        className="list-icon"
                        color="tertiary"
                      />
                      <IonLabel position="stacked">Product ID</IonLabel>
                      <IonLabel />
                    </IonItem>
                    <IonItem color="cardcolor">
                      <IonIcon
                        icon={listicon}
                        className="list-icon"
                        color="tertiary"
                      />
                      <IonLabel position="stacked">Order ID</IonLabel>
                      <IonLabel />
                    </IonItem>
                    <IonItem color="cardcolor">
                      <IonIcon
                        icon={listicon}
                        className="list-icon"
                        color="tertiary"
                      />
                      <IonLabel position="stacked">Category</IonLabel>
                      <IonLabel />
                    </IonItem>
                    <IonItem color="cardcolor">
                      <IonIcon
                        icon={listicon}
                        className="list-icon"
                        color="tertiary"
                      />
                      <IonLabel position="stacked">Price</IonLabel>
                      <IonLabel />
                    </IonItem>
                    <IonItem color="cardcolor">
                      <IonIcon
                        icon={listicon}
                        className="list-icon"
                        color="tertiary"
                      />
                      <IonLabel position="stacked">Quantity</IonLabel>
                      <IonLabel />
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <IonCard className="ion-align-self-center" color="cardcolor">
                <IonCardHeader>
                  <IonCardTitle  className="ion-text-start card-title">Latest Customer
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

export default Dashboard;
