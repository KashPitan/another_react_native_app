import React from 'react'
import { Text, View } from '../components/Themed';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FC } from 'react';
import { SetDataItem } from '../types';

const setList: FC<{setData : SetDataItem[]}> = ({children, setData}) : JSX.Element => {
  
  return (
    <View style={styles.container}>
      <FlatList 
        data={setData}
        renderItem={({item,index}) => {return <View style={styles.setItem}><Text style={styles.setItemText}>set #{index + 1}: {item.reps} reps @{item.weight}KG</Text></View>}}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
}

export default setList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
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
  setItemText : {
    fontWeight: 'bold',
    fontSize: 20
  },
  setItem : {
    paddingTop:2
  }

});
