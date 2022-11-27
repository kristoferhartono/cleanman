import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Camera from './Camera';
import NavigationSetorSampahScreen from './NavigationSetorSampah';
import RadioGroup from 'react-native-radio-buttons-group';
import SelectList from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation,useRoute } from '@react-navigation/native';
import { auth, db, storage } from '../firebase';
import { set, update, onValue, ref as ref_database, push, Database } from 'firebase/database';
import { getStorage, ref as ref_storage, uploadBytes } from 'firebase/storage';

export default function PilahSampahScreen({navigation}) {
    const [selected, setSelected] = React.useState("");
    const [fullName, setFullName] = useState('');
    const [image, setImage] = useState(null);

    const [namaPemilah, setNamaPemilah] = useState();
    const dbRef = ref_database(db, 'users/' + auth.currentUser?.uid)

    onValue(dbRef, (snapshot) => {
        const data = snapshot.val()
        useEffect(()=>{
        setNamaPemilah(data.nama);
        }, [])
    })

    const submitData = () => {
        const storageRef = ref_storage(storage, "image");
        uploadBytes(storageRef, image)
        .then((snapshot) => {
        console.log("Uploaded a blob or file!");
        })
        .catch((error) => {
        console.log(error.message);
        });
    }
    const handleCamera = async() => {
            if(!image.cancelled){  
            var tanggal = new Date();
            const storage = getStorage();
            const ref = ref_storage(storage, namaPemilah + " Pilah Sampah " + tanggal);
            const img = await fetch(image);
            const bytes = await img.blob();

            await uploadBytes(ref, bytes);

                navigation.navigate("Home")
                var waktu = new Date();
                
                push(ref_database(db, 'users/' + auth.currentUser?.uid + '/pilahsampah'), {
                namaWarga: fullName,
                jenis: jenis,
                volume: selected,
                waktu: waktu.toDateString()
            
            })
            
            
            .catch(error => alert(error.message))
                }else{
                alert("Unggah Foto Pemilahan Sampah")
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
                    <SelectList data={data} setSelected={setSelected} save="value" defaultOption={{ key:'1',value:'0,5'}}>
                    </SelectList>
                </View>

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
        marginRight: 250
      },

    asterix2: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 10,
        marginRight: 240
    },

    asterix3: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 10,
        marginRight: 197
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
    }, iconCamera: {
        flex: 1,
        height: 100,
        width: 100,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    image: { marginTop: 20, marginLeft: 10, width: 100, height: 100, marginRight: 40, backgroundColor: '#F9FEFD'},
})