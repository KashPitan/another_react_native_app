import React, { useState } from "react";
import { FC } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { SetDataItem, ExerciseData } from '../types';

import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

type toggleModalFunction = () => void;
type resetStateFunction = () => void;


const SaveExerciseModal: FC<{modalVisible: boolean, toggleModal: toggleModalFunction, resetState: resetStateFunction, setData: SetDataItem[]}> = ({children, modalVisible, toggleModal, resetState, setData}) :JSX.Element => {
  const [exerciseInput,setExerciseInput] = useState<string>('')

  const WORKOUT_KEY = 'WORKOUT';


  const onSave = async () => {
    const exerciseData: ExerciseData = {
      setData: setData,
      exerciseName : exerciseInput
    }

    try {
      const existingWorkoutData = await AsyncStorage.getItem(WORKOUT_KEY);
      // console.log('existingWorkoutData ==> ', existingWorkoutData);
      if(existingWorkoutData !== null){
        console.log('existing is not null ==> ');
        const existingWorkouts = JSON.parse(existingWorkoutData);
        console.log('existingWorkouts ==> ', existingWorkouts);
        existingWorkouts.push(exerciseData);
        console.log('existingWorkouts ==> ', existingWorkouts);
       await AsyncStorage.setItem(WORKOUT_KEY, JSON.stringify(existingWorkouts));
    
      }else{
        const res = await AsyncStorage.setItem(WORKOUT_KEY, JSON.stringify([exerciseData]));
        console.log('res empty==> ', res);
      }

      resetState();
      toggleModal();
      alert(`${exerciseInput} saved!`);
      setExerciseInput('');

     
    } catch (error) {
      console.log('error ==> ', error);
      alert(`There was an error saving your data :(`);
    }

  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          toggleModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={{height:'100%', width: '100%'}}>
            <View style={styles.modalView}>

              {/* <View style={{ borderWidth: 1, borderColor: 'green' ,height:'100%', width: '100%', flexDirection: 'row', alignItems:'center'}}> */}
                <View style={{alignSelf:'center', alignContent:'center',alignItems:'center'}}>
                  <View style={{borderWidth: 1, borderColor: 'green' ,height:'100%', width: '100%'}}>
                    {/* <View style={{flexDirection: 'row',borderWidth: 1, borderColor: 'green' ,height:'100%', width: '100%'}}> */}
                      <View style={{alignSelf:'flex-start'}}>
                        <Text>Save Exercise</Text>
                      </View>
                      <TextInput 
                        style={styles.input}
                        onChangeText={setExerciseInput}
                        value={exerciseInput}
                        placeholder="enter exercise"
                        keyboardType='default'/>
                    <View style={{alignSelf:'flex-end'}}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => onSave()}
                      >
                        <Text style={styles.textStyle}>Save</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => toggleModal()}
                      >
                        <Text style={styles.textStyle}>Cancel</Text>
                      </Pressable>
                    </View>
                  {/* </View> */}
                  
                    
                  </View>
                </View> 
              {/* </View> */}
          
          </View>
          


            {/* <View style={{flexDirection: 'column', alignItems: 'flex-start',height:'100%', width: '100%'}}>
              <View style={{borderWidth: 1,borderColor:'red', flexDirection: 'row', height:'100%', width: '100%'}}>

              <View style={{borderWidth: 1, alignSelf:'flex-start'}}>
                <Text style={styles.modalText}>Save Exercise</Text>
              </View>

              <View style={{ borderWidth: 1, width:'50%', alignSelf:'flex-end'}}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => toggleModal()}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>

              </View>

            </View> */}

          </View>

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    borderWidth: 1,
    width: '100%',
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20
  },
  modalView: {
    borderWidth: 1,
    // borderColor:'red',
    alignItems:'center',
    // justifyContent:'center',
    flexDirection:'column',
    width:'90%',
    height: '90%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    borderWidth: 1,
    // alignSelf:'center',
    // marginBottom: 15,
    // textAlign: "center"
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

export default SaveExerciseModal;