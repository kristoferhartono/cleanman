import React, { useRef, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../firebase';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebase } from '@react-native-firebase/auth';


export default function LoginScreen({navigation}) {
    const countryCode = "+62"
    const [noTelp, setNoTelp] = useState(countryCode)
    const [otp, setOTP] = useState('')
    const [verifcationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null)

    const generateCaptcha = ()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptchacontainer', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
          }, auth);
    }

    const requestOTP = async ()=>{
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
            noTelp,
            recaptchaVerifier.current
          );
        setVerificationId(verificationId);
        showMessage({
            text: 'Verification code has been sent to your phone.',
        });
    }

    const onFooterLinkPress = () => {
        navigation.navigate("Signup")
    }

    const onLoginPress = () => {
        console.log(noTelp)
        requestOTP;
    }

    const onLogin2Press = () => {
        navigation.navigate("HomeBankSampah")
    }
    
    return (
        
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={auth} />
                <Text style={styles.title}>Login</Text>
                      <Image
                        style={styles.logo}
                        source={require('../assets/logo.png')} 
                      />
                <TextInput
                    style={styles.input}
                    placeholder='No Telepon'
                    placeholderTextColor="#24292E"
                    value={noTelp}
                    onChangeText={(text) => setNoTelp(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#24292e"
                    secureTextEntry
                    placeholder='OTP'
                    onChangeText={(text) => setOTP(text)}
                    value={otp}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.footerView2}>
                    <Text style={styles.footerText}><Text onPress={onFooterLinkPress} style={styles.footerLink2}>Lupa Kata Sandi?</Text></Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Masuk Penyetor Sampah</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogin2Press()}>
                    <Text style={styles.buttonTitle}>Masuk Bank Sampah</Text>
                </TouchableOpacity>

                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Belum memiliki akun? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Daftar sekarang!</Text></Text>
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
  recaptchacontainer: {
    flex: 1,
    alignItems: 'center',
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