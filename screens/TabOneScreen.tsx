import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import SetList from '../components/setList';
import WeightInput from '../components/WeightInput';
import SaveExerciseModal from '../components/SaveExerciseModal';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps, SetDataItem } from '../types';

import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; 

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [counter, setCounter] = useState<number>(0);
  const [setData, setSetData] = useState<SetDataItem[]>([]);
  const [weight, setWeight] = useState<number>(0);

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const onPressStartNextSetButton = () => {
    if (counter === 0){
      alert("You haven't completed any reps!");
      return;
    }
    setSetData([...setData, {reps: counter, weight}]);
    setCounter(0);
  }

  const setStateWeight = (weight : number) => {
    setWeight(weight);
  }

  const resetState = () => {
    setSetData([]);
    setCounter(0);
    setWeight(0);
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontWeight:'bold'}}>Current Set Rep Count</Text>
      <Text style={{fontSize: 80}}>{counter}</Text>

      <View style={{width:'100%',flexDirection:'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity
        style={styles.incrementButton}
        onPress={() => setCounter(prevCount => prevCount + 1)}
        >
          <Text style={{fontSize:20, color: 'white'}}>+1</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.decrementButton}
        onPress={() => {if(counter > 0) setCounter(prevCount => prevCount - 1)}}
        >
          <Text style={{fontSize:20, color: 'white'}}>-1</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingTop:40, width:'100%',flexDirection: 'row', justifyContent:'center'}}>
       <TouchableOpacity
        style={styles.saveButton}
        onPress={() => onPressStartNextSetButton()}
        >
          <Text style={{fontSize:20, color: 'white'}}>Start Next Set</Text>
        </TouchableOpacity>
      </View>

      <WeightInput weight={weight} setStateWeight={setStateWeight}/>

      {setData && <SetList setData={setData} />}

      <View style={{paddingTop:20, paddingBottom: 20,width:'100%',flexDirection: 'row', justifyContent:'center'}}>
       <TouchableOpacity
        style={styles.saveButton}
        onPress={() => setData.length === 0 ? alert("You haven't completed any sets!") : toggleModal()}
        >
          <Text style={{fontSize:20, color: 'white'}}>Save Exercise</Text>
          <MaterialCommunityIcons name='weight-lifter' size={20} color='white' />
        </TouchableOpacity>
      </View>

      <View style={{width:'0%',height:'0%'}}>
        <SaveExerciseModal modalVisible={modalVisible} toggleModal={toggleModal} resetState= {resetState} setData={setData}/>
      </View>
     
    </View>
    
  );
}

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
  incrementButton: {
    borderRadius:20,
    width: '30%',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#1e90ff',
    elevation: 2, // Android
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  decrementButton: {
    borderRadius:20,
    width: '30%',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#dc143c',
    elevation: 2, // Android
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  saveButton : {
    borderRadius:20,
    width: '50%',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#20b2aa',
    elevation: 2, // Android
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
