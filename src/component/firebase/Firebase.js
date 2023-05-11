import { initializeApp } from "firebase/app";
import {getFirestore, collection} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA5wVvMKMNhyJjKTGF2jngKKyRZemnhsXE",
  authDomain: "skill-flix-6acb2.firebaseapp.com",
  projectId: "skill-flix-6acb2",
  storageBucket: "skill-flix-6acb2.appspot.com",
  messagingSenderId: "597650637601",
  appId: "1:597650637601:web:c3c74ccbc0f358df653460"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const moviesRef = collection(db, "movies"); 
export const reviewsRef = collection(db, "reviews")
export const usersRef = collection(db, "users")

export default app;