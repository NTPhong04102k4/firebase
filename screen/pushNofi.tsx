import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {} from '../utils/nofication';
function PushNofi() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Push Notification Example</Text>
      <TouchableOpacity
        onPress={() => {}}
        style={{backgroundColor: 'red', width: '50%', height: 'auto'}}>
        <Text>Send Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PushNofi;
