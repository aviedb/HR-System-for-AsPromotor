import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAd4hSXcHLvUNHR3g8LqbL3HiCDGibU-Zg",
  authDomain: "hr-system-for-aspromoter.firebaseapp.com",
  databaseURL: "https://hr-system-for-aspromoter.firebaseio.com",
  projectId: "hr-system-for-aspromoter",
  storageBucket: "",
  messagingSenderId: "505859410597",
  appId: "1:505859410597:web:4111048aeff61127"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

export {
  auth,
  db
}