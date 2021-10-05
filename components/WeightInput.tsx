import React from 'react'
import { FC } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type setStateWeightFunction = () => void;

const WeightInput: FC<{weight: number, setStateWeight: setStateWeightFunction}> = ({children, weight, setStateWeight}) : JSX.Element => {
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        onChangeText={setStateWeight}
        value={weight.toString()}
        placeholder="enter weight"
        keyboardType='numeric'/>
      <Text>KG</Text>
    </View>
  )
} 

export default WeightInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30
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