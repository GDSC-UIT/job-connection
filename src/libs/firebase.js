import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: String(process.env.NEXT_PUBLIC_API_KEY),
  authDomain: String(process.env.NEXT_PUBLIC_AUTH_DOMAIN),
  projectId: String(process.env.NEXT_PUBLIC_PROJECT_ID),
  storageBucket: String(process.env.NEXT_PUBLIC_STORAGE_BUCKET),
  messagingSenderId: String(process.env.NEXT_PUBLIC_MESSENGING_SENDER_ID),
  appId: String(process.env.NEXT_PUBLIC_APP_ID),
};
const firebase = initializeApp(firebaseConfig);
export default firebase;

export const auth = getAuth(firebase);
export const storage = getStorage(firebase);
