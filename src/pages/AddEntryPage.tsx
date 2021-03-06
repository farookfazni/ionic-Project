import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonBackButton,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonDatetime,
} from '@ionic/react';
import React, { useState } from 'react';
import { firestore } from '../firebase';
import { useAuth } from '../auth';
import { useHistory } from 'react-router';

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription]= useState('');

  const handleSave = async() => {
    const entriesRef = firestore.collection('users').doc(userId).collection('entries');
    const entryData = {date, title, description};
    const entryRef = await entriesRef.add(entryData);
    console.log('saved:',entryRef.id);
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime value={date}
            onIonChange={(event) => setDate(event.detail.value)}
             />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title}
            onIonChange={(event) => setTitle(event.detail.value)}
             />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={description}
            onIonChange={(event) => setDescription(event.detail.value)}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>Save</IonButton>
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
