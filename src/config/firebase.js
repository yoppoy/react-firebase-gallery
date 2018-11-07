import * as firebase from "firebase";

const FirebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    storageBucket: process.env.REACT_APP_FIREBASE_BUCKET
};

/**
 * Name of firebase database
 * @type {string}
 */
const FIREBASE_DATABASE_REF = "Galleries";

/**
 * Name of firebase folder in storage bucket
 * @type {string}
 */
const FIREBASE_UPLOAD_REF = "Galleries";

const firebaseApp = firebase.initializeApp(FirebaseConfig);

export {firebaseApp, FIREBASE_DATABASE_REF, FIREBASE_UPLOAD_REF};
export default firebaseApp;
