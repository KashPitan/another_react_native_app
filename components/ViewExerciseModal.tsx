import React, { useState } from "react";
import { FC } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { SetDataItem, ExerciseData } from '../types';

import SetList from '../components/setList';

type toggleModalFunction = () => void;


const ViewExerciseModal: FC<{modalVisible: boolean, toggleModal: toggleModalFunction, exerciseData: ExerciseData[]}> = ({children, modalVisible, toggleModal, exerciseData}) :JSX.Element => {
  const [exerciseInput,setExerciseInput] = useState<string>('')

  const WORKOUT_KEY = 'WORKOUT';

  return <>
    {exerciseData &&  <View style={styles.centeredView}>
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

              <View style={{alignSelf:'center', alignContent:'center',alignItems:'center'}}>
                <View style={{height:'100%', width: '100%'}}>
                    <View style={{alignSelf:'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>{exerciseData.exerciseName}</Text>
                    </View>
                    {exerciseData && <SetList setData={exerciseData.setData} />}

                  <View style={{alignSelf:'center'}}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => toggleModal()}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                  </View>                  
                  
                </View>
              </View> 
        
        </View>

        </View>

      </View>
    </Modal>
  </View>}
   </>
  ;
};

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 45
  },
  modalView: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
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
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 2,
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
    // alignSelf:'center',
    // marginBottom: 15,
    // textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    width: '50%'
  },
});

export default ViewExerciseModal;