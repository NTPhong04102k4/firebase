import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Button,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  storeDataObject,
  removeItem,
  getAllKeys,
} from '../../utils/AsyncStorage';
import {PushLocalNotifications} from '../../utils/nofication';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

const signInWithGG = async ({navigation}: any) => {
  try {
    await GoogleSignin.hasPlayServices();
    var user = await GoogleSignin.signIn();
    console.log('data get GG sign In:', user);
    storeDataObject(user, 1);
    PushLocalNotifications('Sign In', 'Success', 'mes_mes.mp3', 1, true, true);
  } catch (error) {
    console.log(error);
  }
};
const signInWithFacebook = async ({navigation}: any) => {
  LoginManager.logInWithPermissions(['public_profile']).then(
    function (result: any) {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then(data =>
          console.log('currentAccessToken:', data?.accessToken),
        );
        console.log(
          'Login success with permissions: ',
          result.grantedPermissions.toString(),
          PushLocalNotifications(
            'Sign In',
            'Success',
            'mes_mes.mp3',
            1,
            true,
            true,
          ),
        );
        navigation.navigate('Home');
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error);
    },
  );
};
function Login() {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'#FAECD7'}
        barStyle={'dark-content'}
      />
      <View style={styles.header}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../src/assets/images/firebase-removebg-preview.png')}
            style={{
              height: Dimensions.get('screen').height * 0.25,
              width: Dimensions.get('screen').width * 0.6,
            }}
          />
        </View>
        <View
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text style={{fontSize: 22, fontWeight: '700'}}>Đăng nhập</Text>
        </View>
      </View>
      <View style={styles.ViewLogin}>
        <TextInput
          placeholder="Email in here"
          testID="login"
          keyboardType="default"
          value={``}
          placeholderTextColor={'grey'}
          underlineColorAndroid={'black'}
          style={styles.textInput}
        />
        <View style={{height: 15}} />
        <TextInput
          placeholder="Password"
          testID="logout"
          keyboardType="default"
          value={``}
          placeholderTextColor={'grey'}
          underlineColorAndroid={'black'}
          style={styles.textInput}
        />
        <View style={{height: 15}} />
        <TouchableOpacity
          style={{
            width: 'auto',
            height: 40,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: 'blue',
            fontWeight: '500',
            paddingVertical: 10,
            marginTop: 10,
          }}>
          Quên mật khẩu ?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{height: 1, backgroundColor: 'black', width: '30%'}}></View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: 'black',
            }}>
            {' Hoặc '}
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: 'black',
              width: '30%',
            }}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: 'auto',
            marginTop: 18,
            height: 'auto',
          }}>
          <TouchableOpacity
            style={{width: 60, height: 60}}
            onPress={signInWithFacebook}>
            <Image
              source={require('../../src/assets/images/face.png')}
              style={{width: 60, height: 60, resizeMode: 'center'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: 60, height: 60}}
            onPress={signInWithGG}>
            <Image
              source={require('../../src/assets/images/image-removebg-preview.png')}
              style={{width: 60, height: 60, resizeMode: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAECD7',
    paddingHorizontal: 16,
  },
  header: {
    flex: 1,

    width: '100%',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: 'orange',
  },
  ViewLogin: {
    flex: 1.5,
    elevation: 4,
    shadowColor: '#B2EDED',
  },
  textInput: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    textDecorationStyle: 'dashed',
    width: Dimensions.get('screen').width * 0.8,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
  },
});
export default Login;
