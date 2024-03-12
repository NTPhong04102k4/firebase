import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PushNofi from '../screen/pushNofi';
import Home from '../screen/Home';
import Login from '../screen/Login/LoginScreen';
const RootStack = createNativeStackNavigator();

export default function Stack({}) {
  return (
    <RootStack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="PushNofi" component={PushNofi} />
      <RootStack.Screen name="Login" component={Login} />
    </RootStack.Navigator>
  );
}
