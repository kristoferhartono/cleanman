import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadioGroup from 'react-native-radio-buttons-group';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function RegistrationScreen({navigation}) {
    const [isSignedIn, setIsSignedIn] = React.useState(false)
    const [fullName, setFullName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials =>{
            console.log('user Created')
            const user = userCredentials.user;
            console.log(user.email);
        })
        .catch(error => alert(error.message))
    }
    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

  

    const [lokasi, setLokasi] = useState([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Braga',
            value: 'braga'
        }, {
            id: '2',
            label: 'DDG',
            value: 'ddg'
        }
    ])

    const [tujuan, setTujuan] = useState([
        {
            id: '3', // acts as primary key, should be unique and non-empty string
            label: 'Pemilah Sampah',
            value: 'pemilah'
        }, {
            id: '4',
            label: 'Pengumpul Sampah',
            value: 'pengumpul'
        }
    ])

    function onPressRadioButtonLokasi(radioArrayLokasi) {
        console.log(radioArrayLokasi);
        setLokasi(radioArrayLokasi);
    }

    function onPressRadioButtonTujuan(radioArrayTujuan) {
        console.log(radioArrayTujuan);
        setTujuan(radioArrayTujuan);
    }
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nama Lengkap'
                    placeholderTextColor="#24292E"
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor="#24292E"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#24292E"
                    secureTextEntry
                    placeholder='Kata Sandi'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#24292E"
                    secureTextEntry
                    placeholder='Konfirmasi Kata Sandi'
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                    <Text style={styles.boldFooterText}>Lokasi Kerja</Text>

                <RadioGroup 
                    containerStyle={{
                        justifyContent: 'flex-start', 
                        alignItems: 'flex-start',
                        marginLeft: 30,

                    }}
                    radioButtons={lokasi} 
                    layout="row"
                    onPress={onPressRadioButtonLokasi} 
                />

                <Text style={styles.boldFooterText}>Tujuan Penggunaan Aplikasi</Text>

                <RadioGroup 
                    containerStyle={{
                        justifyContent: 'flex-start', 
                        alignItems: 'flex-start',
                        marginLeft: 30,

                    }}
                    radioButtons={tujuan} 
                    layout="column"
                    onPress={onPressRadioButtonTujuan} 
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignUp}>
                    <Text style={styles.buttonTitle}>Buat Akun</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Sudah memiliki akun? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
                <View style = {{marginTop: 20}}>
                </View>
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
      marginTop: 35,
      marginBottom: 30,
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
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    boldFooterText: {
        fontSize: 16,
        color: '#2e2e2d',
        fontWeight: "bold",
        marginLeft: 30,
        marginTop: 20,
        marginBottom: 7
    },
    footerLink: {
        color: "#AAEEE9",
        fontWeight: "bold",
        fontSize: 16
    }
})