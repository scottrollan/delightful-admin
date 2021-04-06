import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/firebase-functions';

const firebaseConfig = {
  apiKey: 'AIzaSyCXmXmYW_VQ3OzYoD1oIekCRqz2Ts1YbdY',
  authDomain: 'delightful-dog-cloud-functions.firebaseapp.com',
  projectId: 'delightful-dog-cloud-functions',
  storageBucket: 'delightful-dog-cloud-functions.appspot.com',
  messagingSenderId: '759890875483',
  appId: '1:759890875483:web:16decac4d631e61ad05b7e',
  measurementId: 'G-93WLC93X23',
};
// Initialize Firebase
const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export default firebase;

////////// Storage //////////
const storage = firebase.storage();
export const storageRef = storage.ref();
//to store images/files ex: export const usersRef = storageRef.child('images/users');

////////// Utilities //////////
export const timeStamp = firebase.firestore.Timestamp;
export const fsArrayUnion = firebase.firestore.FieldValue.arrayUnion;

////////// Firestore auth //////////
const auth = firebaseApp.firestore();

////////// Firestore access //////////
const db = firebaseApp.firestore();
export const helpChatsCollection = db.collection('helpChats');

////////// Firebase messaging //////////
let messagingToken;
let messagePayload = {};
const messaging = firebase.messaging();
messaging
  .requestPermission()
  .then(() => {
    console.log('Have Permission');
    return messaging.getToken();
  })
  .then((token) => {
    messagingToken = token;
    console.log(token);
  })
  .catch((error) => {
    console.log(`Error Occurred: ${error}`);
  });

messaging.onMessage((payload) => {
  // payload = { from, priority, notification, collapse_key };
  // payload.notification = { title, body, icon };
  messagePayload = { ...payload.notification };
});

export { messagingToken, messagePayload };
