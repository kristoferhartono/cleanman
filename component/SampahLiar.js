import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Camera from './Camera';
import NavigationSampahLiarScreen from './NavigationSampahLiar';




export default function SampahLiarScreen({navigation}) {
    const onGpsPress = () => {
        navigation.navigate("Maps")
    }
        const onKirimPress = () => {
            navigation.navigate("Home")
    }
    return (
        
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                      <Image
                        style={styles.logo}
                        source={require('../assets/LogoSampahLiar.png')} 
                      />
                <Text style={styles.title}>Titik Sampah Liar</Text>
                <Camera></Camera>

                <View style={styles.row}>
                    <Text style={styles.textUnggah}>Bagikan Lokasi</Text>
                    <Text style={styles.asterix}>*</Text>
                    <Pressable onPress={() => onGpsPress()}>
                    <Image 
                        style={styles.iconLokasiSampahLiar}
                        
                        source={require('../assets/iconLokasiSampahLiar.png')} ></Image>
                    </Pressable>
                </View>
                <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onKirimPress()}>
                    <Text style={styles.buttonTitle}>Kirim</Text>
                </TouchableOpacity>
                </View>
                <View style = {{marginTop: 185}}></View>
                <NavigationSampahLiarScreen></NavigationSampahLiarScreen>

                {/* <TextInput
                    style={styles.input}
                    placeholder='No Telepon'
                    placeholderTextColor="#24292E"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
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
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Masuk</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Belum memiliki akun? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Daftar sekarang!</Text></Text>
                </View> */}
            </KeyboardAwareScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F9FEFD',
      justifyContent: 'center'
  },
  title: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",

  },
  logo: {
      flex: 1,
      height: 100,
      width: 100,
      alignSelf: "center",
      marginTop: 30,
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
    textUnggah: {
        fontSize: 16,
        color: '#2e2e2d',
        fontWeight: "bold",
        marginLeft: 20,
        marginTop: 55,
        marginBottom: 7
      },
    asterix: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 45,
        marginLeft: -10,
        marginRight: 10,
      },
    row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between'},
    iconLokasiSampahLiar: {
        flex: 1,
        height: 100,
        width: 150,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20,
        marginRight: 50
        
    }
})