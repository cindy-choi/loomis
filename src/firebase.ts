import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth';
// import { GoogleAuthProvider, SignInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyDIZtpHbttJUqaD5Tz92DEHVml_gibbEe0',
  authDomain: 'loomis-82c65.firebaseapp.com',
  projectId: 'loomis-82c65',
  storageBucket: 'loomis-82c65.appspot.com',
  messagingSenderId: '542078898843',
  appId: '1:542078898843:web:99f6d515114947c652ec3e',
  measurementId: 'G-509Z7N3P1P',
};

const app = initializeApp(firebaseConfig);
// const app = firebase.initializeApp(firebaseConfig);

let analytics;

if (app.name && typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const firestore = getFirestore();
export const auth = getAuth(app);

export const signInGoogle = () => {
  console.log('hi');
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

export const signOut = () => {
  return auth.signOut();
};

export default { app, analytics, firestore, auth, signInGoogle, signOut };
