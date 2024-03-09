import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  PushLocalNotifications,
  createChannel,
  localNotificationSchedule,
} from '../utils/nofication';
function PushNofi() {
  useEffect(() => {
    createChannel;
    localNotificationSchedule;
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Push Notification Example</Text>
      <TouchableOpacity
        onPress={() =>
          PushLocalNotifications('Title:HiHiHaha', 'thông báo ', 'mes_mes')
        }
        style={{backgroundColor: 'red', width: '50%', height: 'auto'}}>
        <Text>Send Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PushNofi;
