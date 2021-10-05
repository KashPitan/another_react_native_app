import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { SetDataItem } from '../types';

export default function ModalScreen() {
  const [exercise, setExercise] = useState('');
  const [setData, setSetData] = useState<SetDataItem[]>([]);

  const onPressSaveExerciseButton = () => {
  
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Modal</Text> */}

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}
      <TextInput
        style={styles.input}
        onChangeText={setExercise}
        value={exercise}
        placeholder="exercise name"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: '50%'
  },
});
