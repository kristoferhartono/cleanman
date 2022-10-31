import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Camera from './Camera';
import NavigationSetorSampahScreen from './NavigationSetorSampah';
import RadioGroup from 'react-native-radio-buttons-group';
import SelectList from 'react-native-dropdown-select-list';
import NavigationBankSampahKeluarScreen from './NavigationBankSampahKeluar';

export default function BankSampahKeluarScreen({navigation}) {
    // const [selected, setSelected] = React.useState("");
    // const [berat, setBerat] = useState('');
    // const [harga, setHarga] = useState('');
    const [nama, setNama] = useState('');


    const onKirimPress = () => {
        navigation.navigate("HomeBankSampah")
    }

    // const data = [{key:'1',value:'Arsip'}, {key: '2', value:'Arsip warna'}, {key: '3', value:'Dus tebal'}, 
    // {key: '4', value:'Kertas buram'}, {key: '5', value:'Duplex'}, {key: '6', value:'Majalah'}, {key: '7', value:'Koran'}, {key: '8', value:'Karung semen'}, {key:'9',value:'Gelas bersih cup a'}, {key: '10', value:'Gelas kotor cup b'}, {key: '11', value:'Ember hitam'}, 
    // {key: '12', value:'Emberan'}, {key: '13', value:'Galon'}, {key: '14', value:'Toples'}, {key: '15', value:'Kerasan'}, {key: '16', value:'Teh gelas'}, {key:'17',value:'Tutup galon'}, {key: '18', value:'Mainan'}, {key: '19', value:'Botol warna'}, 
    // {key: '20', value:'PET A'}, {key: '21', value:'PET B'}, {key: '22', value:'Aluminium panci'}, {key: '23', value:'Aluminium aro'}, {key: '24', value:'Besi'}, {key:'25',value:'Kaleng'}, {key: '26', value:'Seng'}, {key: '27', value:'Stainless'}, 
    // {key: '28', value:'Kompos/Organik'}, {key: '29', value:'Minyak jelantah'}, {key: '30', value:'Botol beling'}];

    // const [alat, setAlat] = useState([
    //     {
    //         id: '1', // acts as primary key, should be unique and non-empty string
    //         label: 'Tong Sampah',
    //         value: 'tong'
    //     }, {
    //         id: '2',
    //         label: 'Gerobak Sampah',
    //         value: 'gerobak'
    //     }
    // ])



    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <Image
                    style={styles.logo}
                    source={require('../assets/LogoBankSampahKeluar.png')}></Image>
                <Text style={styles.title}>Sampah terjual</Text>

                {/* <View style={styles.row}>
                    <Text style={styles.textJudul}>Jenis Sampah</Text>
                    <Text style={styles.asterix}>*</Text>
                </View>

                <View style = {{paddingHorizontal:40,paddingRight: 40,flex:1}}>
                    
                    <SelectList data={data} setSelected={setSelected}>
                    </SelectList>
                </View>

                <View style={styles.row}>
                    <Text style={styles.textJudul}>Berat (kg)</Text>
                    <Text style={styles.asterix2}>*</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='Masukan berat disini'
                    placeholderTextColor="#808080"
                    onChangeText={(text) => setBerat(text)}
                    value={berat}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <View style={styles.row}>
                    <Text style={styles.textJudul}>Harga Total (Rupiah)</Text>
                    <Text style={styles.asterix3}>*</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='Masukan harga disini'
                    placeholderTextColor="#808080"
                    onChangeText={(text) => setHarga(text)}
                    value={harga}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                /> */}

                <View style={styles.row}>
                    <Text style={styles.textJudul}>Nama Penyetor</Text>
                    <Text style={styles.asterix4}>*</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='Masukan nama penyetor disini'
                    placeholderTextColor="#808080"
                    onChangeText={(text) => setNama(text)}
                    value={nama}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                {/* <Camera></Camera> */}
                
                
                
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
            <NavigationBankSampahKeluarScreen></NavigationBankSampahKeluarScreen>
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
    input: {
        height: 48,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#F5F5F5',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        paddingLeft: 16
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
    
    textLiter1: {
        fontSize: 12,
        color: '#2e2e2d',
        marginTop: 4,
        marginBottom: 7,
        marginLeft: 68
    },

    textLiter2: {
        fontSize: 12,
        color: '#2e2e2d',
        marginTop: 4,
        marginBottom: 7,
        marginRight: 117
    },

    asterix: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 10,
        marginRight: 255
      },

    asterix2: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 10,
        marginRight: 290
    },

    asterix3: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 10,
        marginRight: 250
    },

    asterix4: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 10,
        marginRight: 250
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

})
