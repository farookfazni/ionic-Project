import {
  IonPopover,
  IonList,
  IonItem,
  IonIcon,
  IonChip,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import {
  logOut as logoutIcon,
  settings as settingIcon,
  person as profileIcon,
  homeSharp as homeIcon,
  personAddSharp as addAdminIcon,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { auth, firestore } from "../firebase";

const PopoverComponent: React.FC = () => {
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });
  const { userId } = useAuth();
  const [entries, setEntries] = useState([]);

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

  const buttonclicked = async (e) => {
    setShowPopover({ open: false, event: e.nativeEvent });
  };

  const logout = async (e) =>{
    auth.signOut();
    setShowPopover({ open: false, event: undefined });
  };

  return (
    <>
      <IonPopover
        cssClass="pop-over"
        isOpen={showPopover.open}
        event={showPopover.event}
        onDidDismiss={(e) => setShowPopover({ open: false, event: undefined })}
      >
        <IonList lines="full">
          <IonItem button routerLink="/my/dashboard" onClick={buttonclicked}>
            <IonIcon slot="start" icon={homeIcon} />
            Dashboard
          </IonItem>
          {entries.map((entry) => (
            <IonItem
              key={entry.id}
              button
              routerLink={`/my/profilepage/${entry.id}`}
              onClick={buttonclicked}
            >
              <IonIcon slot="start" icon={profileIcon} /> Profile
            </IonItem>
          ))}

          <IonItem button routerLink="/my/register" onClick={buttonclicked}>
            <IonIcon slot="start" icon={addAdminIcon} />
            Register New Admin
          </IonItem>

          <IonItem button routerLink="/my/account" onClick={buttonclicked}>
            <IonIcon slot="start" icon={settingIcon} />
            Settings
          </IonItem>

          <IonItem button onClick={logout}>
            <IonIcon slot="start" icon={logoutIcon} />
            LogOut
          </IonItem>
        </IonList>
      </IonPopover>

      <IonChip
        slot="end"
        onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}
      >
        <IonAvatar>
          {entries.map((entry)=>(<img key={entry.id} src={entry.PictureUrl} alt="" />))}
        </IonAvatar>
        {entries.map((entry)=>(<IonLabel key={entry.id}>{entry.full_name}</IonLabel>))}
      </IonChip>
    </>
  );
};

export default PopoverComponent;
