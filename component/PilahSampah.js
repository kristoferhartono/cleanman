import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Camera from './Camera';
import NavigationSetorSampahScreen from './NavigationSetorSampah';
import RadioGroup from 'react-native-radio-buttons-group';
import SelectList from 'react-native-dropdown-select-list'

export default function PilahSampahScreen({navigation}) {
    const [selected, setSelected] = React.useState("");
    const [fullName, setFullName] = useState('');

    const onKirimPress = () => {
        navigation.navigate("Home")
    }

    const data = [{key:'1',value:'0,5'}, {key: '2', value:'1'}, {key: '3', value:'1,5'}, 
    {key: '4', value:'2'}, {key: '5', value:'2,5'}, {key: '6', value:'3'}, {key: '7', value:'3,5'}, {key: '8', value:'4'}];

    const [jenis, setJenis] = useState([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Sisa Makanan',
            value: 'sisa'
        }, {
            id: '2',
            label: 'Sampah Jual',
            value: 'jual'
        }
    ])

    function onPressRadioButtonJenis(radioArrayJenis) {
        console.log(radioArrayJenis);
        setJenis(radioArrayJenis);
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <Image
                    style={styles.logo}
                    source={require('../assets/LogoPilahSampah.png')}></Image>
                <Text style={styles.title}>Pilah Sampah</Text>
                
                <View style={styles.row}>
                    <Text style={styles.textJudul}>Nama Warga</Text>
                    <Text style={styles.asterix}>*</Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder='Nama Lengkap'
                    placeholderTextColor="#24292E"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                
                <View style={styles.row}>
                    <Text style={styles.textJudul}>Jenis Sampah</Text>
                    <Text style={styles.asterix2}>*</Text>
                </View>

                <RadioGroup 
                    containerStyle={{
                        justifyContent: 'flex-start', 
                        alignItems: 'flex-start',
                        marginLeft: 30,

                    }}
                    radioButtons={jenis} 
                    layout="row"
                    onPress={onPressRadioButtonJenis} 
                />

                <View style={styles.row}>
                    <Text style={styles.textJudul}>Jumlah Volume (kg)</Text>
                    <Text style={styles.asterix3}>*</Text>
                </View>

                <View style = {{paddingHorizontal:40,paddingRight: 40,flex:1}}>
                    <SelectList data={data} setSelected={setSelected} defaultOption={{ key:'1',value:'0,5'}}>
                    </SelectList>
                </View>

                <Camera></Camera>
                
                <View style = {{marginTop: 20}}></View>
                
                <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onKirimPress()}>
                    <Text style={styles.buttonTitle}>Kirim</Text>
                </TouchableOpacity>
                </View>

                <View style = {{marginTop: 100}}></View>
                

            </KeyboardAwareScrollView>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
            <NavigationSetorSampahScreen></NavigationSetorSampahScreen>
            </View>


        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

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

    textJudul: {
        fontSize: 16,
        color: '#2e2e2d',
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 7,
        marginLeft: 38
    },

    textJudul2: {
        fontSize: 16,
        color: '#2e2e2d',
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 7,
        marginLeft: 38
    },

    textNormal1: {
        fontSize: 14,
        color: '#2e2e2d',
        marginTop: 10,
        marginBottom: 7,
        marginLeft: 45
    },

    textNormal2: {
        fontSize: 14,
        color: '#2e2e2d',
        marginTop: 10,
        marginBottom: 7,
        marginRight: 90
    },

    asterix: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 10,
        marginRight: 215
      },

    asterix2: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 10,
        marginRight: 208
    },

    asterix3: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 10,
        marginRight: 165
    },

    asterix4: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 2,
        marginRight: 235
    },

      row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between'},

      image1: {
        width : 100,
        height : 100,
        marginTop: 10,
        marginLeft: 40,
        marginRight: 50
      },

      image2: {
        width : 100,
        height : 100,
        marginTop: 10,
        marginRight: 90
      },

      button: {
        backgroundColor: '#AAEEE9',
        marginLeft: 40,
        marginRight: 40,
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
    }
})