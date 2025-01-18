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

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    data: {
      click_action: payload.notification.click_action, // URL to open on click
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received.", event.notification);

  event.notification.close(); // Close the notification
  const clickAction =
    event.notification.data?.click_action || "https://chattkaro.vercel.app/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === clickAction && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(clickAction);
        }
      })
  );
});
