importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');
// import firebase from 'firebase/app';
// import 'firebase/messaging';

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
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(() => {
  const title = 'You received a new message.';
  const options = {
    body: payload.data.status,
  };
  return self.registration.showNotification(title, options);
});
