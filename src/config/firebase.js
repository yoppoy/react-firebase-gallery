import * as firebase from "firebase";
import { FirebaseConfig } from "../config/keys";

const firebaseApp = firebase.initializeApp(FirebaseConfig);
export default firebaseApp;