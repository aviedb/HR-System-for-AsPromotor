import * as firebase from 'firebase';
import 'firebase/firestore';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} from 'react-native-dotenv';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBlJXhOm79U2Kcf6V3A0T8_0fq9dP7PFNU",
    authDomain: "hr-system-for-aspromoter2.firebaseapp.com",
    databaseURL: "https://hr-system-for-aspromoter2.firebaseio.com",
    projectId: "hr-system-for-aspromoter2",
    storageBucket: "hr-system-for-aspromoter2.appspot.com",
    messagingSenderId: "992165127171",
    appId: "1:992165127171:web:fb4a02ed7b63c34f"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export {
  auth,
  firestore,
  storage
}