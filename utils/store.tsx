import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
export function ConfigureNotificaitons() {
  PushNotification.configure({
    onRegister: function (notification) {
      console.log('notification:', JSON.stringify(notification));
    },
    onNotification: function (notification) {
      console.log('Received Notification:', notification);
      // No need to call notification.finish() for the latest versions
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
}
