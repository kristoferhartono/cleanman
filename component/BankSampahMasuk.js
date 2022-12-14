import React, { useReducer, useState, useEffect} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationSetorSampahScreen from './NavigationSetorSampah';
import RadioGroup from 'react-native-radio-buttons-group';
import SelectList from 'react-native-dropdown-select-list';
import NavigationBankSampahMasukScreen from './NavigationBankSampahMasuk';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebase } from '@react-native-firebase/auth';
import RegistrationScreen from './SignUp.js';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth, db, storage } from '../firebase';
import { set, update, onValue, ref as ref_database, push, Database } from 'firebase/database';
import { getStorage, ref as ref_storage, uploadBytes } from 'firebase/storage';

export default function BankSampahMasukScreen() {
    const [selected, setSelected] = React.useState("");
    const [berat, setBerat] = useState('');
    const [harga, setHarga] = useState('');
    const [nama, setNama] = useState('');
    const [rumah, setRumah] = useState('');
    const navigation = useNavigation(); 
    const route = useRoute();
    const [image, setImage] = useState(null);
    const[upload, setUpload] = useState(false);
    const [namaPenyetor, setNamaPenyetor] = useState();
    const dbRef = ref_database(db, 'users/' + auth.currentUser?.uid)

    onValue(dbRef, (snapshot) => {
        const data = snapshot.val()
        useEffect(()=>{
          setNamaPenyetor(data.nama);
        }, [])
      })

      const handleCamera = async() => {
        if(!image.cancelled){  
          var tanggal = new Date();
          const storage = getStorage();
          const ref = ref_storage(storage, namaPenyetor + " Bank Sampah " + tanggal);
          const img = await fetch(image);
          const bytes = await img.blob();

          await uploadBytes(ref, bytes);

            navigation.navigate("HomeBankSampah")
            var waktu = new Date();
            
            push(ref_database(db, 'users/' + auth.currentUser?.uid + '/banksampah' + nama), {
                berat: berat,
                harga: harga,
                nama: nama,
                rumah: rumah,
                data: selected,
                waktu: waktu.toDateString()
          
          })
          
          
          .catch(error => alert(error.message))
            }else{
              alert("Unggah Foto Sampah Liar")
            }
      }
      const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          quality: 1,
        });
        setImage(result.uri);

    };
    // const handleSampahditabung = () => {
    //                 navigation.navigate("HomeBankSampah")
    //                 console.log('yes')
    //                 var waktu = new Date();

    //                 push(ref(db, 'users/' + auth.currentUser?.uid + '/banksampah'), {
    //                 berat: berat,
    //                 harga: harga,
    //                 nama: nama,
    //                 rumah: rumah,
    //                 data: selected,
    //                 waktu: waktu.toDateString()

    //             })
            
    //         .catch(error => alert(error.message))
    // }
    
    const onKirimPress = () => {
        navigation.navigate("HomeBankSampah")
    }

    const data = [{value:'Arsip'}, {value:'Arsip warna'}, {value:'Dus tebal'}, 
    {value:'Kertas buram'}, {value:'Duplex'}, {value:'Majalah'}, {value:'Koran'}, {value:'Karung semen'}, {value:'Gelas bersih cup a'}, {value:'Gelas kotor cup b'}, {value:'Ember hitam'}, 
    {value:'Emberan'}, {value:'Galon'}, {value:'Toples'}, {value:'Kerasan'}, {value:'Teh gelas'}, {value:'Tutup galon'}, {value:'Mainan'}, {value:'Botol warna'}, 
    {value:'PET A'}, {value:'PET B'}, {value:'Aluminium panci'}, {value:'Aluminium aro'}, {value:'Besi'}, {value:'Kaleng'}, {value:'Seng'}, {value:'Stainless'}, 
    {value:'Kompos/Organik'}, {value:'Minyak jelantah'}, {value:'Botol beling'}];

    const [alat, setAlat] = useState([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Tong Sampah',
            value: 'tong'
        }, {
            id: '2',
            label: 'Gerobak Sampah',
            value: 'gerobak'
        }
    ])



    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <Image
                    style={styles.logo}
                    source={require('../assets/LogoBankSampahMasuk.png')}></Image>
                <Text style={styles.title}>Sampah ditabung</Text>

                <View style={styles.row}>
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
                />

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
                <View style={styles.row}>
                    <Text style={styles.textJudul}>Nomor Rumah</Text>
                    <Text style={styles.asterix5}>*</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='Masukan nomor rumah disini'
                    placeholderTextColor="#808080"
                    onChangeText={(text) => setRumah(text)}
                    value={rumah}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.row}>
                    <Text style={styles.textUnggah}>Unggah Foto</Text>
                    <Text style={styles.asterix6}>*</Text>
                    <Pressable onPress={takePicture}>
                    <Image 
                        style={styles.iconCamera}
                        
                        source={require('../assets/iconCamera.png')} ></Image>
                    </Pressable>
            
                    <Image style={styles.image} source={{ uri: image } } />
          
          
                </View>
                
                
                
                <View style = {{marginTop: 20}}></View>
                
                <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCamera}>
                    <Text style={styles.buttonTitle}>Kirim</Text>
                </TouchableOpacity>
                </View>

                <View style = {{marginTop: 100}}></View>
                

            </KeyboardAwareScrollView>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
            <NavigationBankSampahMasukScreen></NavigationBankSampahMasukScreen>
            </View>


        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#F9FEFD',
        justifyContent: 'center',

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
        marginRight: 295
      },

    asterix2: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 10,
        marginRight: 330
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
        marginRight: 290
    },
    asterix5: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 10,
        marginRight: 290
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
      textUnggah: {
        fontSize: 16,
        color: '#2e2e2d',
        fontWeight: "bold",
        marginLeft: 38,
        marginTop: 55,
        marginBottom: 7
      },
      asterix6: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 45,
        marginRight: 10,
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
    iconCamera: {
        flex: 1,
        height: 100,
        width: 100,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    image: { marginTop: 20, marginLeft: 10, width: 100, height: 100, marginRight: 40, backgroundColor: '#F9FEFD'},

})
