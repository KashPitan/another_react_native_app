import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import ViewExerciseModal from '../components/ViewExerciseModal'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View } from '../components/Themed';
import { ExerciseData } from '../types';
import { useFocusEffect } from '@react-navigation/native';

export default function TabTwoScreen() {
  const [workoutState, setWorkoutState] = useState<ExerciseData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseData | null>(null);

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

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const onPressExercise = (exerciseIndex: number) => {
    setSelectedExercise(workoutState[exerciseIndex]);
    toggleModal();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Exercises</Text>
      <FlatList 
        data={workoutState}
        renderItem={({item,index}) => {
        return (
          <TouchableOpacity
          style={{borderWidth:2, borderRadius: 5, padding: 20, margin: 5}}
            onPress={() => onPressExercise(index)}
            >
              <View style={styles.setItem}>
                <Text style={styles.setItemText}>{item.exerciseName}: sets: {item.setData.length}</Text>
              </View>
          </TouchableOpacity>)}}
        keyExtractor={(item, index) => index.toString()}/>
        <ViewExerciseModal modalVisible={modalVisible} exerciseData={selectedExercise} toggleModal={toggleModal}/>
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
    padding: 20
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
