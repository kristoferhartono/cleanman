import React, { useState, Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { auth, db } from '../firebase';
import { ref, onValue } from 'firebase/database';

export default function RiwayatScreen({navigation}) {
    const onFooterLinkPress = () => {
        navigation.navigate('Profile')
    }
    const starCountRef = ref(db, 'users/' + user.uid + '/setorsampah' + '/0' + '/selected')
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      updateStarCount(postElement, data);
    });
  
    const HeadTable = ['Hari', 'Tanggal', 'Jam', 'Volume',]
    const DataTable = [
      ['Senin', '19-09-2022', '14:21:35', '12 liter'],
      ['Selasa', '20-09-2022', '15:30:02', '10 liter'],
    ]
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backbutton} onPress={() => onFooterLinkPress()}>
                    <Image style={styles.backspace}
                    source= {require('../assets/keyboard_backspace.png')}/>
            </TouchableOpacity>
            <View>
            <Text style={{color: "#000000", fontSize: 26, fontWeight: 'bold', marginTop: 50, marginLeft: 18}}>
             Riwayat</Text>
            </View>
            <Table style={{marginTop: 20, marginHorizontal: 18}} borderStyle={{borderWidth: 1, borderColor: '#000000'}}>
            <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
            <Rows data={DataTable} textStyle={styles.TableText}/>
            </Table>
        </View>
  )
}
const styles = StyleSheet.create({
    container: { 
      flex: 1,
      padding: 18,
      paddingTop: 35,
      backgroundColor: '#ffffff' 
    },
    backspace: {
        height: 35,
        width: 35,
        marginTop: 30,
        marginLeft : 30,
     },
     backbutton: {
         height: 35,
         width: 35,
         marginTop: -30,
         marginLeft : -18,
     },
    HeadStyle: { 
      height: 40,
      alignContent: "center",
      backgroundColor: '#aaeee9'
    },
    TableText: { 
      margin: 8,
      fontSize: 12
    }
  });