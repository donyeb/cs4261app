import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Task from './components/Task'
import Icon from 'react-native-vector-icons/FontAwesome';
import { signOut } from 'firebase/auth';

const HomeScreen = () => {
    const [task, setTask] = useState();
    const [taskList, setTaskList] = useState([]);
    const [city, setCity] = useState();
    const [show, setShow] = useState(false);
    const [degress, setDegrees] = useState();
    const [loaded, setLoaded] = useState();

    var today = new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const navigation = useNavigation();

    const addTask = () => {
        Keyboard.dismiss();
        if (task != null) {
            setTaskList([...taskList, task]);
            setTask(null);
        } else {
            alert("Please add a task")
        }
    }

    const removeTask = (index) => {
        let tmp = [...taskList];
        tmp.splice(index, 1);
        setTaskList(tmp);
    }

    const searchAgain = () => {
        setShow(false);
        setLoaded(false);
    }

    const getWeather = () => {
        Keyboard.dismiss();
        fetch(`http://api.weatherapi.com/v1/current.json?key=84c3ead37f784b9eafa161257232501&q=${city}&aqi=no`)
        .then(response => response.json())
        .then((response) => {
            setCity(response.location.name);
            setDegrees(response.current.temp_f);
            setShow(true);
            setTimeout(() => {
                setLoaded(true);
            }, 500);
        })
        .catch((err) => {
            alert("Enter Valid City or Zipcode")
            setCity(null);
        })
    }

    const logOut = () => {
        navigation.navigate("Login");
    }

  return (
    <View style={styles.container}>
        <View style={styles.weatherWrapper}>
            <Text style={styles.sectionTitle}>Weather</Text>
            {!show && <View style={styles.weather}>
                <TextInput style={styles.weatherInput} placeholder="Enter City or Zipcode" value={city} onChangeText={(text) => setCity(text)}></TextInput>
                <TouchableOpacity style={styles.weatherButton} onPress={getWeather}>
                    <Icon name='arrow-right' style={styles.go}></Icon>
                </TouchableOpacity>
            </View>}
            {(show && !loaded) && <ActivityIndicator style={styles.loading} size="large"/>}
            {(show && loaded) && <View style={styles.temp}>
                <Text style={styles.tempFont}>{city}</Text>
                <Text style={styles.tempFont}>{Math.round(degress) + "°F"}</Text>
            </View>}
            {(show && loaded) &&
                <TouchableOpacity style={styles.search} onPress={searchAgain}>
                    <Text>Search</Text>
                </TouchableOpacity>
            }
        </View>
        <Text style={styles.taskHeader}>{"Tasks for " + days[today.getDay()] + " " + today.getMonth() + 1 + "/" + today.getDate()}</Text>
        <ScrollView style={styles.scroll}>
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

        <TouchableOpacity style={styles.logout} onPress={logOut}>
            <Text style={styles.logoutButton}>Sign Out</Text>
        </TouchableOpacity>


        <KeyboardAvoidingView 
            behavior={"padding"}
            style={styles.write}
            keyboardVerticalOffset={30}
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
        backgroundColor: 'lightgrey',
        marginTop: 30,
    },
    taskWrapper: {
        paddingTop: 5,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: "center",
        marginBottom: 3
    },
    items: {
        marginTop: 2
    },
    weatherWrapper: {
        marginTop: 10,
        alignItems: 'center',
        width: "90%",
        height: "15%",
        alignSelf: "center",
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
        // backgroundColor: "white",
        borderColor: "darkgrey",
        borderWidth: 1,
        borderRadius: 60,
        width: 250
    },
    addWrapper: {
        width: 60, 
        height: 60, 
        // backgroundColor: "white",
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "darkgrey",
        borderWidth: 1,
    },
    addText: {

    },
    scroll: {
        marginTop: 0,
        maxHeight: 300
    },
    weatherWrapper: {
        width: 350,
        height: 100,
        // backgroundColor: "blue",
        alignSelf: "center",
        marginTop: 10
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
        // backgroundColor: "white",
        borderColor: "darkgrey",
        borderWidth: 1,
        borderRadius: 60,
        width: 250,
    },
    weatherButton: {
        height: 60,
        width: 60,
        backgroundColor: 'darkgrey',
        borderRadius: 60,
    },
    temp: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: "center"
    },
    tempFont: {
        fontSize: 20,
        marginRight: 10,
        alignSelf: 'center'
    },
    taskHeader: {
        alignSelf: "center",
        marginTop: 5,
        fontSize: 15,
        fontWeight: "bold"
    },
    go: {
        alignSelf: "center",
        fontSize: 20,
        marginTop: 20,
        color: "lightgrey"
    },  
    logout: {
        alignSelf: 'center',
        marginTop: 70,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "darkgrey",
        borderRadius: 5,
    },
    search: {
        alignSelf: "center",
        backgroundColor: "darkgrey",
        padding: 2,
        borderRadius: 4,
        marginTop: 7
    },
    logoutButton: {
      fontWeight: "bold",  
    },
})