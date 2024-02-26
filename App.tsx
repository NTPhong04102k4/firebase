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
interface Users {
  key: string;
}
const PushNoficationComponent = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('Nofication:', notification.message);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }, // bắt buộc
    onAction: function (notification) {
      // opstion
      console.log('action:', notification.action);
      console.log('Nofi:', notification);
      // xử lí actions tại đây
    },
    popInitialNotification: true, // bắt buộc
    requestPermissions: true, //bắt buộc
  });
};
function getChanel_ID(channel_Id: any) {
  console.log('chanel ID:', channel_Id);
}
PushNotification.localNotification({
  channelId: 'id1',
  message: 'sản phẩm thử nghiệm push Nofication',
});
export default function App() {
  const [secure, setSecure] = useState(true); // set cho ẩn mật khẩu là true , mặc định là ẩn.
  const color = useColorScheme();
  const [users, setUsers] = useState([]);
  function secureClick() {
    setSecure(secure == true ? false : true);
  }
  function User({userId}) {
    useEffect(() => {
      const valueDatabase = database()
        .app()
        .ref(`/user/${userId}`)
        .on('value', snapshot => {
          console.log('abc:', snapshot.val());
        });
      return () =>
        database().ref(`/user/${userId}`).off('value', valueDatabase);
    }, [userId]);
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
    PushNoficationComponent();
    PushNotification.getChannels(chanelIDs => {
      getChanel_ID(chanelIDs[0]);
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
                ? require('./app/assets/images/view.jpg')
                : require('./app/assets/images/hide.png')
            }
            style={styles.secure}></Image>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        keyExtractor={item => item.key}
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
