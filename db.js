import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
