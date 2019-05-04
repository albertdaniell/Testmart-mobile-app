import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDFeqQdz4geCfb9w-nJAzNO3IKK9bqIeVQ",
    authDomain: "testmart.firebaseapp.com",
    databaseURL: "https://testmart.firebaseio.com",
    projectId: "testmart",
    storageBucket: "testmart.appspot.com",
    messagingSenderId: "504893906425",
    appId: "1:504893906425:web:14447e98f8847be3"
};
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;