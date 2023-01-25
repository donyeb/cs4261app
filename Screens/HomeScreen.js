import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Task from './components/Task'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.taskWrapper}>
            <Text style={styles.sectionTitle}>HomeScreen</Text>
            <View style={styles.items}>
                <Task text={"Ok"} />
            </View>
        </View>
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

    }
})