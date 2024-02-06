import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCdDGMxNroK4qtWOYnMkASymFxw5OQS6MY",
  authDomain: "fbcrud-boker-21.firebaseapp.com",
  projectId: "fbcrud-boker-21",
  storageBucket: "fbcrud-boker-21.appspot.com",
  messagingSenderId: "62208397883",
  appId: "1:62208397883:web:161c4c1eb4bbd8290a021e"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
