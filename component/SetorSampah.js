import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Camera from './Camera';
import NavigationSetorSampahScreen from './NavigationSetorSampah';
import RadioGroup from 'react-native-radio-buttons-group';
import SelectList from 'react-native-dropdown-select-list'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation,useRoute } from '@react-navigation/native';
import { auth, db, storage } from '../firebase';
import { set, update, onValue, ref as ref_database, push, Database } from 'firebase/database';
import { getStorage, ref as ref_storage, uploadBytes } from 'firebase/storage';

export default function SetorSampahScreen({navigation}) {
    const [selected1, setSelected1] = React.useState("");
    const [selected2, setSelected2] = React.useState("");
    const [selected3, setSelected3] = React.useState("");
    const [image, setImage] = useState(null);

    const [namaPenyetor, setNamaPenyetor] = useState();
    const dbRef = ref_database(db, 'users/' + auth.currentUser?.uid)

    onValue(dbRef, (snapshot) => {
        const data = snapshot.val()
        useEffect(()=>{
        setNamaPenyetor(data.nama);
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
            const ref = ref_storage(storage, namaPenyetor + " Setor Sampah " + tanggal);
            const img = await fetch(image);
            const bytes = await img.blob();

            await uploadBytes(ref, bytes);

                navigation.navigate("Home")
                var waktu = new Date();
                
                push(ref_database(db, 'users/' + auth.currentUser?.uid + '/setorsampah'), {
                jenisalat: alat,
                volume: selected1,
                tps: selected2,
                asalsampah: selected3,
                waktu: waktu.toDateString()
            })
            
            
            .catch(error => alert(error.message))
                } else{
                alert("Unggah Foto Penyetoran Sampah")
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
    {key: '4', value:'2'}, {key: '5', value:'2,5'}, {key: '6', value:'3'}, {key: '7', value:'3,5'}, {key: '8', value:'4'}, {key: '9', value:'4,5'}, {key: '10', value:'5'}];

    const tps = [{key:'1',value:'TPS Ganesha'}, {key: '2', value:'TPS Babakan Siliwangi'}, {key: '3', value:'TPS Baranang Siang'}, 
    {key: '4', value:'TPS Gudang Selatan'}, {key: '5', value:'TPS Patra Komala'}];

    const asal = [{key:'1',value:'RW I'}, {key: '2', value:'RW II'}, {key: '3', value:'RW III'}, 
    {key: '4', value:'RW IV'}, {key: '5', value:'RW V'}, {key: '6', value:'RW VI'}, {key: '7', value:'RW VII'}, {key: '8', value:'RW VIII'}];

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

    function onPressRadioButtonAlat(radioArrayAlat) {
        console.log(radioArrayAlat);
        setAlat(radioArrayAlat);
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <Image
                    style={styles.logo}
                    source={require('../assets/LogoSetorSampah.png')}></Image>
                <Text style={styles.title}>Setor Sampah</Text>
                
                <View style={styles.row}>
                    <Text style={styles.textJudul}>Yang Digunakan</Text>
                    <Text style={styles.asterix}>*</Text>
                </View>

                <View style={styles.row}>
                    <Image style = {styles.image1} source={require('../assets/TongSampah.png')}></Image>
                    <Image style = {styles.image2} source={require('../assets/GerobakSampah.png')}></Image>
                </View>

                <RadioGroup 
                    containerStyle={{
                        justifyContent: 'flex-start', 
                        alignItems: 'flex-start',
                        marginLeft: 30,

                    }}
                    radioButtons={alat} 
                    layout="row"
                    onPress={onPressRadioButtonAlat} 
                />

                <View style = {styles.row}>
                    <Text style={styles.textLiter1}>(120 Liter)</Text>
                    <Text style={styles.textLiter2}>(1000 Liter)</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.textJudul2}>Jumlah Volume</Text>
                    <Text style={styles.asterix2}>*</Text>
                </View>

                <View style = {{paddingHorizontal:40,paddingRight: 40,flex:1}}>
                    <SelectList data={data} setSelected={setSelected1} save="value" defaultOption={{ key:'1',value:'0,5'}}>
                    </SelectList>
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.textJudul2}>TPS Setor Sampah</Text>
                    <Text style={styles.asterix3}>*</Text>
                </View>

                <View style = {{paddingHorizontal:40,paddingRight: 40,flex:1}}>
                    <SelectList data={tps} setSelected={setSelected2} save="value" defaultOption={{ key:'1',value:'TPS Ganesha'}}>
                    </SelectList>
                </View>

                <View style={styles.row}>
                    <Text style={styles.textJudul2}>Asal Sampah</Text>
                    <Text style={styles.asterix4}>*</Text>
                </View>

                <View style = {{paddingHorizontal:40,paddingRight: 40,flex:1}}>
                    <SelectList data={asal} setSelected={setSelected3} save="value" defaultOption={{ key:'1',value:'RW I'}} >
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
        marginRight: 225
      },

    asterix2: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 2,
        marginRight: 217
    },

    asterix3: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 2,
        marginRight: 195
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
    },  iconCamera: {
        flex: 1,
        height: 100,
        width: 100,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    image: { marginTop: 20, marginLeft: 10, width: 100, height: 100, marginRight: 40, backgroundColor: '#F9FEFD'},

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

})
