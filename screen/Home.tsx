import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
  PushNotificationIOS,
} from 'react-native';
import {useColorScheme} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';
import {firebase} from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
interface Users {
  key: string;
}

export default function Home({navigation}: any) {
  const [secure, setSecure] = useState(true); // set cho ẩn mật khẩu là true , mặc định là ẩn.
  const color = useColorScheme();
  const [users, setUsers] = useState([]);
  function secureClick() {
    setSecure(secure == true ? false : true);
  }
  useEffect(() => {
    const userDocs = firestore()
      .collection('Users')
      .onSnapshot(querySnapshort => {
        const updateUsers: Users[] = [];
        querySnapshort.forEach(docsUser => {
          console.log(docsUser.data());
          updateUsers.push({
            ...docsUser.data(),
            key: docsUser.id,
          });
        });
        setUsers(updateUsers);
      });

    return () => userDocs();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={
          color && color?.toString() === 'light'
            ? 'dark-content'
            : 'light-content'
        }
        animated={true}
        backgroundColor={`${color}`}
      />
      <Text style={styles.contents}>Hello My friend</Text>
      <View style={styles.componentfield}>
        <TextInput
          style={styles.textinput}
          testID="useraccount"
          keyboardType="email-address"
          placeholder="User-Email"
          placeholderTextColor={'grey'}></TextInput>
      </View>
      <View style={styles.componentfield}>
        <TextInput
          style={styles.textinput}
          placeholder="Password in here"
          placeholderTextColor={'grey'}
          secureTextEntry={secure ? true : false}></TextInput>
        <TouchableOpacity onPress={secureClick}>
          <Image
            source={
              secure
                ? require('../app/assets/images/view.jpg')
                : require('../app/assets/images/hide.png')
            }
            style={styles.secure}></Image>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        keyExtractor={item => item?.key}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={{
              height: 'auto',
              width: '100%',
              backgroundColor: 'red',
            }}
            onPress={() => navigation.navigate('PushNofi')}>
            <Text style={styles.contents}>Tab</Text>
          </TouchableOpacity>
        )}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <Text style={{color: 'black'}}>{item?.id}</Text>
            </View>
          );
        }}></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contents: {
    color: 'black',
  },
  textinput: {
    color: 'black',
    textAlign: 'left',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 'auto',
    width: '90%',
  },
  componentfield: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secure: {
    height: 25,
    width: 25,
    marginLeft: -25,
  },
});
