/**
 * @format
 */

import {AppRegistry, Platform, PushNotificationIOS} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import database from '@react-native-firebase/database';
database().setPersistenceEnabled(true);
AppRegistry.registerComponent(appName, () => App);
