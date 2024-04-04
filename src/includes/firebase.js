import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC5IirTAEiXC4cREMMUPNPoRwYz9A1ky4Y",
  authDomain: "habitstack-40037.firebaseapp.com",
  projectId: "habitstack-40037",
  storageBucket: "habitstack-40037.appspot.com",
  messagingSenderId: "701549289884",
  appId: "1:701549289884:web:e575f05d87d73dabb92859"
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const user = firebase.auth().currentUser
const db = firebase.firestore()
const firestore = firebase.firestore
const storage = firebase.storage()

const usersCollection = db.collection("users")
const habitsCollection = db.collection("habits")
const profilesCollection = db.collection("profiles")

export { auth, db, usersCollection, habitsCollection, profilesCollection, user, firestore, storage }
