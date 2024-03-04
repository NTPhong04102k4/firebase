import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Stack from './utils/rootNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}
