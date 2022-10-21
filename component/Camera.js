import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Pressable } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


export default class Camera extends React.Component {
  state = {
    image: null,
  };


  takePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
        alert ("Fitur ini membutuhkan akses kamera");
        return;
    }
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });
    this.setState({ image: uri });
  };

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.row}>
          <Text style={styles.textUnggah}>Unggah Foto</Text>
          <Text style={styles.asterix}>*</Text>
          <Pressable onPress={this.takePicture}>
          <Image 
            style={styles.iconCamera}
             
            source={require('../assets/iconCamera.png')} ></Image>
          </Pressable>
            
          <Image style={styles.image} source={{ uri: this.state.image } } />
          
        </View>
      </View>
    );
  }
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
  }
});