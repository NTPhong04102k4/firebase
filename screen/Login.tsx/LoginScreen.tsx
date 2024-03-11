import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function Login() {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    _signIn();
  }, []);

  async function _signIn() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      console.log('User Info:', user);
    } catch (error) {
      console.error(error);
    }
  }

  async function _signOut() {
    try {
      await GoogleSignin.signOut();
      console.log('User signed out');
      setUserInfo(null); // Update the user info state when signing out
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <LoginButton
        onLoginFinished={(error, result: any) => {
          if (error) {
            console.log('Login has error: ' + result?.error);
          } else if (result.isCancelled) {
            console.log('Login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data?.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={_signOut}
      />
      <TouchableOpacity
        style={{height: 50, width: 50, backgroundColor: 'red'}}
        onPress={_signIn}
        disabled={userInfo !== null} // Disable button if user is already signed in
      />
    </View>
  );
}
