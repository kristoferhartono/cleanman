import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Pressable, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation,useRoute } from '@react-navigation/native';
import { auth, db, storage } from '../firebase';
import { set, update, onValue, ref as ref_database, push, Database } from 'firebase/database';
import { getStorage, ref as ref_storage, uploadBytes } from 'firebase/storage';

export default function CameraSampahLiar () {
  const navigation = useNavigation(); 
  const route = useRoute();
  const [image, setImage] = useState(null);
  const[upload, setUpload] = useState(false);
  const [namaPengumpulLiar, setNamaPengumpulLiar] = useState();
  const dbRef = ref_database(db, 'users/' + auth.currentUser?.uid)

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val()
    useEffect(()=>{
      setNamaPengumpulLiar(data.nama);
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
    if (route.params.lokasi === ''){
        alert('Bagikan lokasi Anda')
    }else {
        if(!image.cancelled){  
          var tanggal = new Date();
          const storage = getStorage();
          const ref = ref_storage(storage, namaPengumpulLiar + " Sampah Liar " + tanggal);
          const img = await fetch(image);
          const bytes = await img.blob();

          await uploadBytes(ref, bytes);

            navigation.navigate("Home")
            var waktu = new Date();
            
            push(ref_database(db, 'users/' + auth.currentUser?.uid + '/sampahliar').child(waktu), {
            gambar: image,
            lokasi: route.params.lokasi,
        
          
            waktu: waktu.toDateString(),
          
          })
          
          
          .catch(error => alert(error.message))
            }else{
              alert("Unggah Foto Sampah Liar")
            }
    }
        
  }

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
    // if (!result.cancelled){
    //   const storage = getStorage();
    //   const ref = ref_storage(storage, 'image.jpg');
    //   setImage(result.uri);
    //   const img = await fetch(result.uri);
    //   const bytes = await img.blob();

    //   await uploadBytes(ref, bytes);
    // }
    setImage(result.uri);
    // const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    // if (permissionResult.granted === false) {
    //     alert ("Fitur ini membutuhkan akses kamera");
    //     return;
    // }
    // let result= await ImagePicker.launchCameraAsync({
    //   allowsEditing: false,
    // });

    // setImage(result.uri);
    // console.log(result)
  };

   return (
      <View style={styles.container}>
        
        <View style={styles.row}>
          <Text style={styles.textUnggah}>Unggah Foto</Text>
          <Text style={styles.asterix}>*</Text>
          <Pressable onPress={takePicture}>
          <Image 
            style={styles.iconCamera}
             
            source={require('../assets/iconCamera.png')} ></Image>
          </Pressable>
            
          <Image style={styles.image} source={{ uri: image } } />
          
          
        </View>
        <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCamera}>
                    <Text style={styles.buttonTitle}>Kirim</Text>
                </TouchableOpacity>
                </View>
      </View>
    );
  
}



const styles = StyleSheet.create({
  text: {
    fontSize: 21,
  },
  textUnggah: {
    fontSize: 16,
    color: '#2e2e2d',
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 55,
    marginBottom: 7
  },
  asterix: {
    fontSize: 16,
    color: '#EF5DA8',
    fontWeight: "bold",
    marginTop: 45,
    marginRight: 10,
  },
  row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between'},
  image: { marginTop: 20, marginLeft: 10, width: 100, height: 100, backgroundColor: '#F9FEFD'},
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FEFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCamera: {
      flex: 1,
      height: 100,
      width: 100,
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20,
  },
  button: {
      backgroundColor: '#AAEEE9',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      width:300,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
  },
  buttonTitle: {
      color: '#000000',
      fontSize: 16,
      fontWeight: "bold"
  },
});