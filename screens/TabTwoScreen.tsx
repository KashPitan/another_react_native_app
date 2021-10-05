import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View } from '../components/Themed';
import { ExerciseData } from '../types';
import { useFocusEffect } from '@react-navigation/native';

export default function TabTwoScreen() {
  const [workoutState, setWorkoutState] = useState<ExerciseData[]>([])
  const WORKOUT_KEY = 'WORKOUT';

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const existingWorkoutData = await AsyncStorage.getItem(WORKOUT_KEY);
        console.log('cardioWorkouts ==> ', existingWorkoutData);
        if (existingWorkoutData !== null) {
          const workouts: ExerciseData[] = JSON.parse(existingWorkoutData);
          console.log('workouts ==> ', workouts);
          setWorkoutState(workouts);
        }else{
          setWorkoutState([]);
        }
      })();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={workoutState}
        renderItem={({item,index}) => {return <View style={styles.setItem}><Text style={styles.setItemText}>{item.exerciseName}: sets: {item.setData.length}</Text></View>}}
        keyExtractor={(item, index) => index.toString()}/>
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
  setItemText : {
    fontWeight: 'bold',
    fontSize: 20
  },
  setItem : {
    paddingTop:2
  }
});
