import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Pressable, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation,useRoute } from '@react-navigation/native';
import { auth, db, storage } from '../firebase';
import { set, ref, update, push, Database } from 'firebase/database';


export default function CameraSampahLiar () {
  const navigation = useNavigation(); 
  const route = useRoute();
  const [image, setImage] = useState(null);
  const[upload, setUpload] = useState(false);



  const handleCamera = async() => {
    if(image){   
    // setUpload(true);
    // const response = await fetch(image.uri)
    // const blob = await response.blob();
    // const filename = image.substring(image.uri.LastIndexOf('/')+1)
    // var ref = storage.ref().child(filename).put(blob);

    // try{
    //   await ref;
    // }catch (e){
    //   console.log(e)
    // }
    // setUpload(false)

    navigation.navigate("Home")
    var waktu = new Date();
    
    push(ref(db, 'users/' + auth.currentUser?.uid + '/sampahliar'), {
    gambar: image,
    lokasi: route.params.lokasi,

  
    waktu: waktu.toDateString(),
  
  })
  
  
  .catch(error => alert(error.message))
    }else{
      alert("Unggah Foto Sampah Liar")
    }
    setImage(null);
    
  }

  const takePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
        alert ("Fitur ini membutuhkan akses kamera");
        return;
    }
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });
    setImage(uri);
    console.log(image)
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