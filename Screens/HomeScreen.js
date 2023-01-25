import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Task from './components/Task'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.weatherWrapper}>
            <Text style={styles.sectionTitle}>Weather</Text>
            <View style={styles.weather}></View>
        </View>
        <View style={styles.taskWrapper}>
            <Text style={styles.sectionTitle}>Tasks</Text>
            <View style={styles.items}>
                <Task text={"hello"} />
            </View>
        </View>


        <KeyboardAvoidingView 
            behavior="padding"
            style={styles.write}
            keyboardVerticalOffset={100}
        >   
            <TextInput style={styles.input} placeholder={"Add a task"}/>
            <TouchableOpacity>
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
        paddingTop: 80,
        paddingHorizontal: 20
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 10
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