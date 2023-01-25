import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView} from 'react-native'
import React, { useState } from 'react'
import Task from './components/Task'

const HomeScreen = () => {
    const [task, setTask] = useState();
    const [taskList, setTaskList] = useState([]);
    const [city, setCity] = useState();
    const [show, setShow] = useState(false);
    const [degress, setDegrees] = useState();


    const addTask = () => {
        Keyboard.dismiss();
        setTaskList([...taskList, task]);
        setTask(null);
    }

    const removeTask = (index) => {
        let tmp = [...taskList];
        tmp.splice(index, 1);
        setTaskList(tmp);
    }

    const getWeather = () => {
        Keyboard.dismiss();
        fetch(`http://api.weatherapi.com/v1/current.json?key=84c3ead37f784b9eafa161257232501&q=${city}&aqi=no`)
        .then(response => response.json())
        .then((response) => {
            setCity(response.location.name);
            setDegrees(response.current.temp_f);
            setShow(true)
        })
        .catch((err) => {
            alert("Enter Valid City or Zipcode")
            setCity(null);
        })
    }

  return (
    <View style={styles.container}>
        <View style={styles.weatherWrapper}>
            <Text style={styles.sectionTitle}>Weather</Text>
            {!show && <View style={styles.weather}>
                <TextInput style={styles.weatherInput} placeholder="Enter City or Zipcode" value={city} onChangeText={(text) => setCity(text)}></TextInput>
                <TouchableOpacity style={styles.weatherButton} onPress={getWeather}></TouchableOpacity>
            </View>}
            {show && <View style={styles.temp}>
                <Text style={styles.tempFont}>{city}</Text>
                <Text style={styles.tempFont}>{degress}</Text>
            </View>}
        </View>
        <ScrollView>
            
            <View style={styles.taskWrapper}>
                <View style={styles.items}>
                {
                    taskList.map((task, index) => {
                        return <TouchableOpacity key={index} onPress={() => removeTask(index)}>
                            <Task text={task} />
                        </TouchableOpacity>
                 })
                }
                </View>
            </View>
        </ScrollView>


        <KeyboardAvoidingView 
            behavior={"padding"}
            style={styles.write}
        >   
            <TextInput style={styles.input} placeholder={"Add a task"} value={task} onChangeText={(text) => setTask(text)}/>
            <TouchableOpacity onPress={addTask}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey'
    },
    taskWrapper: {
        paddingTop: 30,
        paddingHorizontal: 20
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 2
    },
    weatherWrapper: {
        backgroundColor: "white",
        marginTop: 10,
        alignItems: 'center',
        width: "90%",
        height: "20%",
        alignSelf: "center"
    },
    write: {
        position: "absolute",
        bottom: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    input: {
        paddingVertical: 15,
        width: 250,
        paddingHorizontal: 15,
        backgroundColor: "white",
        borderColor: "darkgrey",
        borderWidth: 1,
        borderRadius: 60,
        width: 250
    },
    addWrapper: {
        width: 60, 
        height: 60, 
        backgroundColor: "white",
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "darkgrey",
        borderWidth: 1,
    },
    addText: {

    },
    weather: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },  
    weatherInput: {
       paddingVertical: 15,
        width: 250,
        paddingHorizontal: 15,
        backgroundColor: "white",
        borderColor: "darkgrey",
        borderWidth: 1,
        borderRadius: 60,
        width: 250,
    },
    weatherButton: {
        height: 60,
        width: 60,
        backgroundColor: 'red',
        borderRadius: 60,
    },
    temp: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'

    },
    tempFont: {
        fontSize: 35,
        marginRight: 10,
        alignSelf: 'center'
    }
})