import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PushNofi from '../screen/pushNofi';
import Home from '../screen/Home';

const RootStack = createNativeStackNavigator();

export default function Stack({}) {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="PushNofi" component={PushNofi} />
    </RootStack.Navigator>
  );
}
