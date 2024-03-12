import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import PushNotification from 'react-native-push-notification';
import {
  storeDataString,
  storeDataObject,
  readData,
  readDataObject,
  removeItem,
} from '../../utils/AsyncStorage';
import {PushLocalNotifications} from '../../utils/nofication';

export default function Login() {
  const [userInfo, setUserInfo] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [booleanSignIn, setBooleanSignIn] = useState(false);
  useEffect(() => {
    getCurrentUser();
  }, []);
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setState({userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        // chưa được người dùng đăng nhập
      } else {
        // some other error
        // khác
      }
    }
  };
  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();

    setCurrentUser({currentUser});
  };
  const signIng = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      var user = await GoogleSignin.signIn();
      setUserInfo({user});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('fail', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('In pregress', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('not service', error);
      } else {
        // some other error happened
        console.log('khác', error);
      }
    }
  };

  async function _signOut() {
    try {
      console.log('data:', userInfo);
      await GoogleSignin.signOut();
      PushLocalNotifications('Logout', 'Succes', 'mes_mes.mp3', 2, true, true);
      console.log('User signed out');
      removeItem(1);
    } catch (error) {
      console.log('khong the xoa du lieu face', error);
    }
  }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <LoginButton
        onLoginFinished={(error, result: any) => {
          if (error) {
            console.log('Login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('Login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              if (data != null) {
                console.log('data facebook', data);
              } else console.log('data bị null', data);
            });
          }
          PushLocalNotifications(
            'SIGN IN',
            'Succes',
            'mes_mes.mp3',
            1,
            true,
            true,
          );
        }}
        onLogoutFinished={_signOut}
      />
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIng}
        disabled={booleanSignIn}
      />
      <TouchableOpacity
        style={{
          width: 150,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'pink',
        }}
        onPress={() => {
          // removeItem()
        }}>
        <Text style={{color: 'black'}}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
