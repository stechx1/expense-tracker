import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAFBIQwXzeI276j994tC4eJlAvwwkkVq_Q',
  authDomain: 'expense-tracker-173b0.firebaseapp.com',
  projectId: 'expense-tracker-173b0',
  storageBucket: 'expense-tracker-173b0.appspot.com',
  messagingSenderId: '475449526771',
  appId: '1:475449526771:web:7c622d636065fb1775ea86',
  measurementId: 'G-ZZG2D1C820',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
