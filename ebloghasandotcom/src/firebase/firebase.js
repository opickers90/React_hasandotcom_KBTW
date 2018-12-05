import * as firebase from 'firebase';
import 'firebase/storage';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyBwqSnxEcwWGjPV5wGB_rc_hG-VZBl6TT4",
    authDomain: "hasandotcom-4221e.firebaseapp.com",
    databaseURL: "https://hasandotcom-4221e.firebaseio.com",
    projectId: "hasandotcom-4221e",
    storageBucket: "hasandotcom-4221e.appspot.com",
    messagingSenderId: "546151905785"
};

const fire = firebase.initializeApp(config);

fire.firestore().settings(settings);

export default fire;
