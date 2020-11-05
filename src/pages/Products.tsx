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
  IonLoading,
} from "@ionic/react";
import React, { useState, useEffect, useRef } from "react";
import "../theme/dashboard.css";
import {
  fastFoodSharp as productIcon,
  ellipse as listicon,
} from "ionicons/icons";
import { firestore,storage } from "../firebase";
import { useHistory } from "react-router";
import { useAuth } from "../auth";
import PopoverComponent from "./PopoverComponent";

async function savePicture(blobUrl){
  const pictureRef = storage.ref(`/products/pictures/${Date.now()}`);
  const responce = await fetch(blobUrl);
  const blob = await responce.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log('saved Picture:',url);
  return url;
}

const Products: React.FC = () => {
  const {userId} = useAuth();
  const history = useHistory();
  const [products, setproducts] = useState([]);
  const [Product_name, setProductName] = useState("");
  const [PictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>();
  const today = new Date();
  const [loading, setloadng] = useState(false);

  useEffect(() => {
    const productRef = firestore
    .collection('users').doc(userId).collection("Product")
      .orderBy("date", "desc")
      .limit(1);
    productRef.get().then((snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setproducts(products);
    });
  }, [userId]);
  useEffect(() => ()=>{
    if(PictureUrl.startsWith('blob:')){
      URL.revokeObjectURL(PictureUrl);
      
    }
  },[PictureUrl]);

  const handlefilechange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    if(event.target.files.length > 0){
      const file = event.target.files.item(0);
      const PictureUrl = URL.createObjectURL(file);
      setPictureUrl(PictureUrl);
    }
  };

  const handleAddProduct = async () => {
    const addproductRef = firestore.collection('users').doc(userId).collection("Product");
    const productData = {
      Product_name,
      Category,
      Price,
      Quantity,
      Description,
      date:today,
      PictureUrl,
    };
    setloadng(true);
    if(PictureUrl.startsWith('blob:')){
        productData.PictureUrl = await savePicture(PictureUrl);
    }
    const productRef = await addproductRef.add(productData);
    console.log("saved: ", productRef.id);
    setloadng(false);
    history.go(0);
  };

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
                    {products.map((entry) => (
                      <IonItem color="cardcolor" key={entry.id}>
                        <IonLabel position="stacked">Image</IonLabel>
                        <img src={entry.PictureUrl} alt=""/>
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
                      <IonLabel position="stacked">Picture</IonLabel>
                      <input type="file" accept="image/*" hidden ref={fileInputRef}
                      onChange={handlefilechange}
                      />
                      <img src={PictureUrl} alt="" style={{cursor:'pointer'}}
                        onClick={()=>fileInputRef.current.click()}
                      />
                    </IonItem>
                    <IonLoading isOpen={loading}/>
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
