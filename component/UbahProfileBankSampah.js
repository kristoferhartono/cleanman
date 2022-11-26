import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadioGroup from 'react-native-radio-buttons-group';
import { auth, db } from '../firebase';
import { set, ref, update, push, Database } from 'firebase/database';

export default function UbahProfileBankSampahScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    

    const countryCode = "+62"
    const [noTelp, setNoTelp] = React.useState(countryCode)

    const onFooterLinkPress = () => {
        navigation.navigate('ProfileBankSampah')
    }

    const onRegisterPress = () => {
        navigation.navigate('Profile')

        set(ref(db, 'users/' + auth.currentUser?.uid ), {
            nama: fullName,
            lokasi: lokasi,
            tujuan: tujuan,
            noTelp: noTelp,
        })
            
        .catch(error => alert(error.message))
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
               
                <TouchableOpacity style={styles.backbutton} onPress={() => onFooterLinkPress()}>
                    <Image style={styles.backspace}
                    source= {require('../assets/keyboard_backspace.png')}/>
                </TouchableOpacity>
                
                
                <Pressable style={styles.title3} onPress={() => onRegisterPress()}>
                    <Image style={styles.title} source={{uri: 'https://images.unsplash.com/photo-1620117654333-c125fef82817?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'}}/>
                    <Image
                        style={styles.title2}
                        source={require('../assets/kamera.png')} 
                        />
                </Pressable>
    
                
                <TextInput
                    style={styles.input}
                    placeholder='Nama Lengkap'
                    placeholderTextColor="#24292E"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nomor Telepon'
                    placeholderTextColor="#24292E"
                    onChangeText={(text) => setNoTelp(text)}
                    value={noTelp}
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
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Simpan</Text>
                </TouchableOpacity>
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
    backspace: {
       height: 35,
       width: 35,
       marginTop: 30,
       marginLeft : 30,
    },
    backbutton: {
        height: 35,
        width: 35,
        marginTop: 0,
        marginLeft : 0,
    },
    title: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 40,
        alignSelf:'center',
        marginTop:30
    },
    title2: {
        width: 50,
        height: 50,
        marginBottom:40,
        alignSelf:'center',
        marginTop:-90,
        marginLeft: 80
    },
    title3:{
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 70,
        alignSelf:'center',
        marginTop:20
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
    },
})