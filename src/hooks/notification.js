// // notification.js
// import { messaging } from "../firebase/firebase";
// import { getToken } from "firebase/messaging";

// const requestNotificationPermission = async () => {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       // Get the token using getToken
//       const token = await getToken(messaging, {
//         vapidKey:
//           "BJdcNZhHVwg2kkPF4Cunh9PSLxPBYHuK-33ySsjkfnVYzTL6vkj7AYsh6m-4HMNFYGMCGWfdx_rKEq51QHvLNyI",
//       });
//       console.log("FCM Token:", token);
//       return token; // Send this token to your backend or use it to send notifications
//     } else {
//       console.error("Notification permission denied");
//     }
//   } catch (error) {
//     console.error("Error requesting notification permission:", error);
//   }
// };

// export default requestNotificationPermission;
