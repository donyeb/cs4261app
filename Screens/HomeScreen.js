import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView} from 'react-native'
import React, { useState } from 'react'
import Task from './components/Task'

const HomeScreen = () => {
    const [task, setTask] = useState();
    const [taskList, setTaskList] = useState([]);

    const addTask = () => {
        Keyboard.dismiss();
        setTaskList([...taskList, task]);
        setTask(null);
        console.log(taskList);
    }

    const removeTask = (index) => {
        let tmp = [...taskList];
        tmp.splice(index, 1);
        setTaskList(tmp);
    }
  return (
    <View style={styles.container}>
        <View style={styles.weatherWrapper}>
            <Text style={styles.sectionTitle}>Weather</Text>
            <View style={styles.weather}></View>
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
            behavior="padding"
            style={styles.write}
            keyboardVerticalOffset={100}
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
        width: "80%",
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

    }
})