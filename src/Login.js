import react, {useState} from "react";
import {View, Text, Alert, Button, ActivityIndicator, TextInput, StyleSheet, TouchableOpacity} from 'react-native'

import { auth } from './firebaseConfig'
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
 } from 'firebase/auth'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isLoginView, setIsLoginView] = useState(true);

    const loginAction = async() => {
        if (email !== '' && password !== '') {
            try {   
                await signInWithEmailAndPassword(auth, email, password)
                .then(user => {
                    console.log(user);
                })
            } catch (error) {
                Alert.alert(error.message)
            }
        } else {
            Alert.alert('Email and password required')
        }
    }


    const signupAction = async() => {
        if (email !== '' && password !== '') {
            try {   
                await createUserWithEmailAndPassword(auth, email, password)
                .then(user => {
                    console.log(user);
                })
            } catch (error) {
                Alert.alert(error.message)
            }
        } else {
            Alert.alert('Email and password required')
        }
    }

    return(
        <View style={styles.container}>


            {
                isLoginView ? (
                    <>
                    <Text style={styles.title}>Login</Text>
                    <TextInput 
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        style={styles.input} 
                        placeholder="Email address" />
                    <TextInput 
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                        keyboardType='default'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        style={styles.input} 
                        placeholder="Password" />
                    <TouchableOpacity onPress={loginAction} style={{width: "100%",borderRadius: 12,alignItems: "center",paddingVertical: 10,backgroundColor: "#000000",}}>
                        <Text style={{ color: "#ffcc00", fontWeight: "300", fontSize: 18 }}>Login</Text>
                    </TouchableOpacity>
                    <Button onPress={() => setIsLoginView(!isLoginView)} title="Don't have an account? Create Now!" />
                    </>

                ) : (


                    <>
                    <Text style={styles.title}>Signup</Text>
                    <TextInput 
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        style={styles.input} 
                        placeholder="Email address" />
                    <TextInput 
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                        keyboardType='default'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        style={styles.input} 
                        placeholder="Password" />
                    <TouchableOpacity onPress={signupAction} style={{width: "100%",borderRadius: 12,alignItems: "center",paddingVertical: 10,backgroundColor: "#000000",}}>
                        <Text style={{ color: "#ffcc00", fontWeight: "300", fontSize: 18 }}>Signup</Text>
                    </TouchableOpacity>
                    <Button onPress={() => setIsLoginView(!isLoginView)} title="Back to Login" />
                    </>

                )
            }



        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontWeight:'200',
        fontSize:40,
        color:'#ffffff'
    },
    sum_container:{
         width: "100%",
        height: "10%",
        padding: 10,
        backgroundColor:'#000'
    },
    input: {
      width: "100%",
      backgroundColor: "#fff",
      padding: 8,
      borderRadius: 10,
      marginBottom: 12,
    },
    input50: {
      width: "48%",
      backgroundColor: "#fff",
      padding: 8,
      borderRadius: 10,
      marginBottom: 12,
    },
    form_container: {
      width: "100%",
      height: "22%",
      padding: 20,
    },
    list_container: {
      width: "100%",
      height: "68%",
      padding:20
    },
    container: {
      flex: 1,
      padding:30,
      backgroundColor: "#00cc99",
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default Login;