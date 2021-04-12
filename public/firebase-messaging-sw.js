importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');
importScripts('./fb.json');

const apiKey = process.env.PUBLIC_URL.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
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
