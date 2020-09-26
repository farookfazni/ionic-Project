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
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { auth, firestore } from "../firebase";
import { Entry, toEntry } from "../model";

const PopoverComponent: React.FC = () => {
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Details");
    return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);

  const buttonclicked = async (e) => {
    setShowPopover({ open: false, event: e.nativeEvent });
  };

  return (
    <>
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
          <IonList lines="full">
            <IonItem button routerLink="/my/dashboard" onClick={buttonclicked}>
              <IonIcon slot="start" icon={homeIcon} />
              Home
            </IonItem>
            <IonItem
              button
              routerLink={`/my/profilepage/${entry.id}`}
              onClick={buttonclicked}
            >
              <IonIcon slot="start" icon={profileIcon} /> Profile
            </IonItem>
            <IonItem button routerLink="/my/account" onClick={buttonclicked}>
              <IonIcon slot="start" icon={settingIcon} />
              Settings
            </IonItem>

            <IonItem button onClick={() => auth.signOut()}>
              <IonIcon slot="start" icon={logoutIcon} />
              LogOut
            </IonItem>
          </IonList>
        </IonPopover>
      ))}
      <IonChip
        slot="end"
        onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}
      >
        <IonAvatar>
          <img src="./assets/1.jpg" alt="" />
        </IonAvatar>
        <IonLabel>Farook Fazni</IonLabel>
      </IonChip>
    </>
  );
};

export default PopoverComponent;
