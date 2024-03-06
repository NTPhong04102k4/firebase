import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  PushLocal,
  CancerPushNotification,
  SchdulePush,
  createChannel,
  localNotificationSchedule,
  InitNotifications,
} from '../utils/nofication';
import {ConfigureNotificaitons} from '../utils/store';
import PushNotification from 'react-native-push-notification';
function PushNofi() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Push Notification Example</Text>
      <TouchableOpacity
        onPress={() => {
          ConfigureNotificaitons(), PushLocal('Demo', 'Hihaha');
          SchdulePush('5/3/2024', 'sản phẩm demo');
          console.log('click');
        }}
        style={{backgroundColor: 'red', width: '50%', height: 'auto'}}>
        <Text>Send Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PushNofi;
