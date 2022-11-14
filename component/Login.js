import React, { useEffect, useRef, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials =>{
            const user = userCredentials.user;
            console.log('Logged in with :', user.email);
            const starCountRef = ref(db, 'users/' + user.uid + '/tujuan' + '/0' + '/selected')
            const starCountRef2 = ref(db, 'users/' + user.uid + '/tujuan' + '/1' + '/selected')
            onValue(starCountRef, (snapshot) => {
                const data1 = snapshot.val();
                if (data1 === true) {
                    navigation.navigate("HomeBankSampah")
                } else {
                    onValue(starCountRef2, (snapshot) => {
                        const data2 = snapshot.val()
                        if (data2 === true) {
                            navigation.navigate("Home")
                        }
                    })
                }
            })
        })
        .catch(error => alert(error.message))
    }

    const onFooterLinkPress = () => {
        navigation.navigate("Signup")
    }
    
    return (
        
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                
                <Text style={styles.title}>Login</Text>
                      <Image
                        style={styles.logo}
                        source={require('../assets/logo.png')} 
                      />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor="#24292E"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#24292e"
                    secureTextEntry
                    placeholder='Kata Sandi'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.footerView2}>
                    <Text style={styles.footerText}><Text onPress={onFooterLinkPress} style={styles.footerLink2}>Lupa Kata Sandi?</Text></Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}>
                    <Text style={styles.buttonTitle}>Masuk</Text>
                </TouchableOpacity>

                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Belum memiliki akun? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Daftar sekarang!</Text></Text>
                </View>
                <View style= {{marginTop: 20}}></View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F9FEFD'
  },

  title: {
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 100,
  },
  logo: {
      flex: 1,
      height: 190,
      width: 216,
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20,
  },
  input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: '#F5F5F5',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16
  },
  button: {
      backgroundColor: '#AAEEE9',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
  },
  buttonTitle: {
      color: '#000000',
      fontSize: 16,
      fontWeight: "bold"
  },
  footerView: {
      flex: 1,
      alignItems: "center",
      marginTop: 20,
  },
  
  footerText: {
      fontSize: 16,
      color: '#2e2e2d'
  },
  footerLink: {
      color: "#AAEEE9",
      fontWeight: "bold",
      fontSize: 16
  },
  footerView2: {
    flex: 1,
    marginTop: 0,
    marginBottom: 30,
    paddingLeft: 32
    },

  footerLink2: {
    fontSize: 14,
    color: '#AAEEE9',
    fontWeight: "bold"
    },
})