import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
