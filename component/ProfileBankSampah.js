import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, Alert, ScrollView} from 'react-native';
import { auth, db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import NavigationProfileScreen from './NavigationProfile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationProfileBankSampahScreen from './NavigationProfileBankSampah';

export default function ProfileBankSampah ({navigation}) {
    const [namaPemilahProfile, setNamaPemilahProfile] = useState('')
    const [noTelpPemilah, setNoTelpPemilah] = useState('')
    const [lokasiPemilah, setLokasiPemilah] = useState('')

    const dbRef = ref(db, 'users/' + auth.currentUser?.uid)
 
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      useEffect(()=>{
        setNamaPemilahProfile(data.nama);
        setNoTelpPemilah(data.noTelp);
      }, [])
    })

    const dbLokasi1 = ref(db, 'users/' + auth.currentUser?.uid + '/lokasi' + '/0')

    onValue(dbLokasi1, (snapshot) => {
      const data1 = snapshot.val()
      if (data1.selected === true) {
        useEffect(()=>{
          setLokasiPemilah(data1.value)
        }, [])
      }
      else {
        useEffect(()=>{
          setLokasiPemilah('DDG')
        }, [])
      }
    })

    const onAddPress = () => {
        navigation.navigate("Login")
    }
    const onUbahPress = () => {
      navigation.navigate("UbahProfileBankSampah")
    }
    const onRiwayatPress = () => {
      navigation.navigate("Riwayat")
    }
    const data = [
        {id:1,  name: "Breakfast",   image:"https://img.icons8.com/cotton/452/bread-and-rye--v1.png", navigateTo: "Login"},
      ]
    
    return (
      <View style={styles.container}>
        {/* <KeyboardAwareScrollView> */}
          <View style={styles.header}>
          </View>
          <Image style={styles.avatar} source={{uri: 'https://images.unsplash.com/photo-1620117654333-c125fef82817?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'}}/>
          <Text style={styles.name}>{namaPemilahProfile}</Text>
              <Text style={styles.info}>{noTelpPemilah}</Text>
              <Text style={styles.info}>Pemilah Sampah</Text>
              <Text style={styles.info}>{lokasiPemilah}</Text>
          <View style={styles.body}>

            <View style={styles.bodyContent}>
              
              <TouchableOpacity style={styles.buttonContainer1} onPress={() => onUbahPress()}>
                <Text style={{color: "#000000", fontWeight: 'bold'}}>Ubah Profil</Text>  
              </TouchableOpacity>              
                     
              <TouchableOpacity style={styles.buttonContainer} onPress={() => onAddPress()}>
                <Text style={{color: "#000000", fontWeight: 'bold'}}>Log Out</Text> 
              </TouchableOpacity>
            </View>
        </View>       
        {/* <View style = {{marginTop: 300}}></View>
                
        </KeyboardAwareScrollView> */}

        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <NavigationProfileBankSampahScreen></NavigationProfileBankSampahScreen>
        </View>
        
      </View>
    );
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,

    backgroundColor : 'white'
  },
  header:{
    backgroundColor: "#aaeee9",
    height:150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:80
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:0,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  footer:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  name:{
    fontSize:28,
    paddingTop:70,
    color: "#000000",
    alignSelf:"center",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#000000",
    marginTop:10,
    alignSelf:"center",
  },
  buttonContainer1: {
    marginTop:0,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:10,
    borderWidth:2,
    borderColor: "#aaeee9",
    backgroundColor: "#aaeee9",
  },
  buttonContainer: {
    marginTop:5,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:10,
    backgroundColor: "#aaeee9",
  },
  buttonContainer2: {
    marginTop:5,
    height:160,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:10,
    backgroundColor: "#EBC7AD",
  },
  volume: {
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    },
text1: {
    color: '#000000',
    fontWeight: 'bold',
    paddingBottom: 10,
},
text2: {
    color: '#000000',
    fontWeight: 'bold',
    marginHorizontal: 55,
},
kaloricontainer: {
    height: 70,
    width: 70,
    borderRadius: 180/2,
    backgroundColor: '#aaeee9',
    marginHorizontal: 37,
    marginTop: 10,
},
jumlah: {
    fontSize:20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
  },
jumlah2: {
    fontSize:12,
    alignSelf: "center",
},
});