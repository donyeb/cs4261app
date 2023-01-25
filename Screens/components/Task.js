import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Task(props) {
  return (
    <View style={styles.item}>
        <View style={styles.itemLeft}>
            <TouchableOpacity style={styles.square}></TouchableOpacity>
            <Text style={styles.itemText}>{props.text}</Text>
        </View>
        <View style={styles.circular}></View>
    </View>
  )
}

const styles = StyleSheet.create({})