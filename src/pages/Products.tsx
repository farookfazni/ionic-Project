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
  IonButton,
  IonDatetime,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "../theme/dashboard.css";
import {
  fastFoodSharp as productIcon,
  ellipse as listicon,
  logOut as logoutIcon,
} from "ionicons/icons";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { useHistory } from "react-router";

const Products: React.FC = () => {
  const history = useHistory();
  const [products, setproducts] = useState([]);
  const [Product_name, setProductName] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Description, setDescription] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const productRef = firestore
      .collection("Product")
      .orderBy("date", "desc")
      .limit(1);
    productRef.get().then((snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setproducts(products);
    });
  }, []);

  const handleAddProduct = async () => {
    const addproductRef = firestore.collection("Product");
    const productData = {
      Product_name,
      Category,
      Price,
      Quantity,
      Description,
      date,
    };
    const productRef = await addproductRef.add(productData);
    console.log("saved: ", productRef.id);
    history.go(0);
  };

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
            <IonIcon icon={productIcon} /> Products
          </IonTitle>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard className="ion-align-self-center" color="cardcolor">
                <IonCardHeader color="cardcolor">
                  <IonCardTitle className="ion-text-center card-title">
                    Latest Products
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList inset={true} mode="ios">
                    {products.map((entry) => (
                      <IonItem color="cardcolor" key={entry.id}>
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Product Name</IonLabel>
                        <IonLabel>{entry.Product_name}</IonLabel>
                      </IonItem>
                    ))}
                    {products.map((entry) => (
                      <IonItem color="cardcolor" key={entry.id}>
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Product ID</IonLabel>
                        <IonLabel>{entry.id}</IonLabel>
                      </IonItem>
                    ))}
                    {products.map((entry) => (
                      <IonItem color="cardcolor" key={entry.id}>
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Category</IonLabel>
                        <IonLabel>{entry.Category}</IonLabel>
                      </IonItem>
                    ))}
                    {products.map((entry) => (
                      <IonItem color="cardcolor" key={entry.id}>
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Price</IonLabel>
                        <IonLabel>{entry.Price}</IonLabel>
                      </IonItem>
                    ))}
                    {products.map((entry) => (
                      <IonItem color="cardcolor" key={entry.id}>
                        <IonIcon
                          icon={listicon}
                          className="list-icon"
                          color="tertiary"
                        />
                        <IonLabel position="stacked">Quantity</IonLabel>
                        <IonLabel>{entry.Quantity}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="ion-align-self-center">
                <IonCardHeader color="cardcolor">
                  <IonCardTitle className="ion-text-center card-title">
                    Add Products
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent color="light">
                  <IonList inset={true} mode="ios">
                    <IonItem>
                      <IonLabel position="stacked">Product Name</IonLabel>
                      <IonInput
                        value={Product_name}
                        onIonChange={(event) =>
                          setProductName(event.detail.value)
                        }
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Category</IonLabel>
                      <IonInput
                        value={Category}
                        onIonChange={(event) => setCategory(event.detail.value)}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Price</IonLabel>
                      <IonInput
                        value={Price}
                        onIonChange={(event) => setPrice(event.detail.value)}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Quantity</IonLabel>
                      <IonInput
                        type="number"
                        value={Quantity}
                        onIonChange={(event) => setQuantity(event.detail.value)}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Description</IonLabel>
                      <IonTextarea
                        value={Description}
                        onIonChange={(event) =>
                          setDescription(event.detail.value)
                        }
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Date</IonLabel>
                      <IonDatetime
                        value={date}
                        onIonChange={(event) => setDate(event.detail.value)}
                      />
                    </IonItem>
                    <IonButton type="submit" onClick={handleAddProduct}>
                      Add Product
                    </IonButton>
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
