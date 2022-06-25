// Firebase config
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB6c9AlAvgXcrKs70TdLjow8zgWEIUZTRo",
    authDomain: "fireblogs-d6908.firebaseapp.com",
    projectId: "fireblogs-d6908",
    storageBucket: "fireblogs-d6908.appspot.com",
    messagingSenderId: "150235590351",
    appId: "1:150235590351:web:6e57182ce6b9c5cd0451ba"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig); 
const db = getFirestore(fire);

export { db, collection, getDocs };

export default fire;
