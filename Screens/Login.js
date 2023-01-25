import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { authentication } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation();

  const signInUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
    .then((s) => {
      setEmail(null);
      setPassword(null);
      navigation.navigate("Home");
    })
    .catch((e) => {console.log(e)})
  }

  return (
    <KeyboardAvoidingView style={styles.loginPage} behavior={"padding"}>
      <View style={styles.login}>
        <TextInput placeholder="Email" value={email} style={styles.loginInput} onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput placeholder="Password" value={password} style={styles.loginInput} secureTextEntry={true} onChangeText={(text) => setPassword(text)}></TextInput>
        <TouchableOpacity style={styles.loginButton} onPress={signInUser}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => {
          Keyboard.dismiss();
          navigation.navigate("SignUp")
          }}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>

  )
}

export default Login

const styles = StyleSheet.create({
  loginPage: {
    backgroundColor: "lightgrey",
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {

  },
  loginInput: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderColor: "darkgrey",
    borderWidth: 1,
    borderRadius: 60,
    width: 250,
    marginBottom: 10
  },
  loginButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 10
  },
  registerButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center"
  }
})