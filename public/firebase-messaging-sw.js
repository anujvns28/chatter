// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBNLQ7h-NgEP44uFqOcbd5k4HB9oCcxILg",
  authDomain: "chatter-92044.firebaseapp.com",
  projectId: "chatter-92044",
  storageBucket: "chatter-92044.firebasestorage.app",
  messagingSenderId: "67312415153",
  appId: "1:67312415153:web:9dbe4e546810c17a7e4d90",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
