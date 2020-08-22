import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAZP1YuASOoSi4Fi5I-eYVzjjzdRmU4BKY",
    authDomain: "daily-moments-c84ad.firebaseapp.com",
    databaseURL: "https://daily-moments-c84ad.firebaseio.com",
    projectId: "daily-moments-c84ad",
    storageBucket: "daily-moments-c84ad.appspot.com",
    messagingSenderId: "865677569394",
    appId: "1:865677569394:web:401a3fbdab861af2e941eb"
  };

  const app = firebase.initializeApp(firebaseConfig);

  export const auth = app.auth();
  export const firestore = app.firestore();
  export const storage = app.storage();
  