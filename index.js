/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import database from '@react-native-firebase/database';
import {GoogleSignin,GoogleSigninButton} from '@react-native-google-signin/google-signin';
database().setPersistenceEnabled(true);
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // API nào bạn muốn truy cập thay mặt người dùng, mặc định là email và hồ sơ
  webClientId: '364773568221-eleg7p12gh73bs9f9rk5dchf5crbc3on.apps.googleusercontent.com', // ID khách hàng thuộc loại WEB cho máy chủ của bạn. Cần thiết để lấy idToken trên đối tượng người dùng và để truy cập ngoại tuyến.
  offlineAccess: true, //nếu bạn muốn truy cập Google API thay mặt cho người dùng TỪ MÁY CHỦ CỦA BẠN
  hostedDomain: "mycollege.edu", //chỉ định hạn chế tên miền được lưu trữ
  forceCodeForRefreshToken: true, // [Android]liên quan đến `serverAuthCode`, hãy đọc liên kết tài liệu bên dưới
  accountName: '', // [Android] chỉ định tên tài khoản trên thiết bị sẽ được sử dụng
  iosClientId: '<FROM DEVELOPER CONSOLE>', 
  // [iOS] nếu bạn muốn chỉ định ID khách hàng thuộc loại iOS (nếu không, nó được lấy từ GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] nếu bạn đổi tên tệp GoogleService-Info của mình, tên mới ở đây, ví dụ: GoogleService-Thông tin-Staging
  openIdRealm: '', // [iOS]Điều này cho phép Google đưa Mã định danh OpenID của người dùng vào mã thông báo ID OpenID Connect.
  profileImageSize: 120, // [iOS] Chiều cao (và chiều rộng) mong muốn của hình ảnh hồ sơ. Mặc định là 120px
});
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
