// Import Firebase app
import firebase from 'firebase/app';

// Import Authentication
import 'firebase/auth';

// Import Datatbase
import 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: `${process.env.REACT_APP_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const fire = firebase.initializeApp(firebaseConfig);

// Export Authentication
export const auth = fire.auth();

// Export DB
export const db = fire.database();