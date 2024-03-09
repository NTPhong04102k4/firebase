/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import database from '@react-native-firebase/database';
database().setPersistenceEnabled(true);
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
AppRegistry.registerComponent(appName, () => App);
