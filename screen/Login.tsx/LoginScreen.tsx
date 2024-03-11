import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeDataString = async (value: any) => {
  try {
    await AsyncStorage.setItem('my-key', value);
  } catch (error) {
    console.log(error);
  }
};
const storeDataObject = async (value: any) => {
  try {
    var JSONValue = JSON.stringify(value);
    await AsyncStorage.setItem('my-object', JSONValue);
  } catch (error) {
    console.log('error:', error);
  }
};
const readData = async () => {
  try {
    const value = await AsyncStorage.getItem('my-key');
    if (value !== null) {
      console.log('value read data string:', value);
    }
  } catch (error) {
    console.log(error);
  }
};
const readDataObject = async () => {
  try {
    const valueObject = await AsyncStorage.getItem('my-object');
    //JSON.parse chuyển JSON thành javascript và JSOn.stringify chuyển JSOn thành object js
    return valueObject !== null ? JSON.parse(valueObject) : null;
  } catch (error) {
    console.log(error);
  }
};
const removeItem = async () => {
  try {
    await AsyncStorage.removeItem('my-object');
  } catch (error) {
    console.log(error);
  }
  console.log('done');
};
const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (error) {
    console.log(error);
  }
  console.log('Done');
};
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
