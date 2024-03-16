import Voice from '@react-native-voice/voice';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
export default function PushNofi() {
  const [search, setSearch] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="search" size={24} color={'black'} style={{}} />
        <TextInput
          value={`${search}`}
          testID="search"
          onChangeText={text => {
            setSearch(text);
          }}
          placeholderTextColor={'grey'}
          placeholder="Search by voice"
          style={styles.textInput}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Dimensions.get('screen').height * 0.08,
    width: Dimensions.get('screen').width * 1,
    flexDirection: 'row',
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  textInput: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.15,
  },
});
