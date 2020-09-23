import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButton,
  IonMenuButton,
  IonButtons,
  IonPopover,
  IonList,
  IonItem,
  IonChip,
  IonAvatar,
  IonLabel,
  IonIcon, 
  IonLoading
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { auth, firestore, storage } from "../firebase";
import {
  logOut as logoutIcon,
  settings as settingIcon,
  person as profileIcon,
} from "ionicons/icons";
import { useAuth } from "../auth";
import { useHistory, useParams } from "react-router";
import "../theme/dashboard.css";

async function savePicture(blobUrl) {
  const pictureRef = storage.ref(`/profilepic/pictures/${Date.now()}`);
  const responce = await fetch(blobUrl);
  const blob = await responce.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log("saved Picture:", url);
  return url;
}

interface RouteParams {
  id: string;
}

const ProfilePage: React.FC = () => {
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });
  const [editImg, setEditImg] = useState<any>(false);
  const [labelImg, setlabelImg] = useState<any>(true);
  const [loading, setloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>();
  const [PictureUrl, setPictureUrl] = useState("/assets/placeholder.png");
  const { userId } = useAuth();
  const history = useHistory();
  const [entries, setEntries] = useState([]);
  const { id } = useParams<RouteParams>();

  const handlefilechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const PictureUrl = URL.createObjectURL(file);
      setPictureUrl(PictureUrl);
      setEditImg(true);
      setlabelImg(false);
    }
  };
  const editimage = async () => {
    const pictRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Details")
      .doc(id);
    const picData = {
      PictureUrl,
    };
    setloading(true);
    if (PictureUrl.startsWith("blob:")) {
      picData.PictureUrl = await savePicture(PictureUrl);
    }
    const addpic = await pictRef.update(picData);
    console.log("added: ", addpic);
    setloading(false);
    history.go(0);
  };
  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Details");
    entriesRef.get().then((snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(entries);
    });
  }, [userId]);
  useEffect(
    () => () => {
      if (PictureUrl.startsWith("blob:")) {
        URL.revokeObjectURL(PictureUrl);
      }
    },
    [PictureUrl]
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="toolbar">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} menu="mainmenu"></IonMenuButton>
          </IonButtons>
          <IonPopover
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
                disabled
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
          <IonTitle className="ion-align-self-center title">
            <IonIcon icon={profileIcon} /> Profile
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      {labelImg && (
          <div className="profile-img">
            {entries.map((entry) => (
              <img
                key={entry.id}
                className="avatr-img"
                src={entry.PictureUrl}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => fileInputRef.current.click()}
              />
            ))}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handlefilechange}
            />
          </div>
        )}

        {editImg && (
          <div className="profile-img">
            
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handlefilechange}
              />
              <img className="avatr-img"
                src={PictureUrl}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => fileInputRef.current.click()}
              />
            
            <IonButton fill="clear" onClick={editimage}>
              save
            </IonButton>
            <IonLoading isOpen={loading} />
          </div>
        )}
        
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
