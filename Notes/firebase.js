import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDBuY878zRCTivSlgmvTHCEbyIGGUjJoHk",
  authDomain: "notes-10887.firebaseapp.com",
  projectId: "notes-10887",
  storageBucket: "notes-10887.appspot.com",
  messagingSenderId: "599770221",
  appId: "1:599770221:web:6bd517373d304aedac2b64"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")
