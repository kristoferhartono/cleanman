import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function NavigationHomeScreen({}){
    const navigation = useNavigation();
    const toggleOpen = () => {


    }
    
        return (
            <View style={{
                flex: 0,
                flexDirection: 'column',
                backgroundColor: 'grey'

            }}>
  
                <View style={{

                    position: 'absolute',
                    backgroundColor: '#AAEEE9',
                    border: 2,
                    radius: 3,
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    shadowOffset: {

                        height: 3, width: 3
                    },
                    x: 0,
                    y: 0,
                    style: { marginVertical: 5 },
                    bottom: 0,
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 25


                }}>

                    <View style={{


                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Image

                                style={{ width: 30, height: 30, marginLeft: 15 }}

                                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1946/1946436.png' }}

                               
                            >

                            </Image>

                        </TouchableOpacity>

                    </View>
                    
                    <View style={{
                        flexDirection: 'column', alignItems: 'center',justifyContent:'center',marginStart:30
                    }}>

                        <TouchableOpacity
                            onPress={() => { Alert.alert("setor") }}
                        >
                            <Image
                                style={{  width: 30, height: 30, }}
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3096/3096673.png' }}
                                onPress={() => { Alert.alert("click") }}
                            />
                       
                        </TouchableOpacity>

                    </View>

                        <View style={{
                             flexDirection: 'column', alignItems: 'center',justifyContent:'space-between',marginStart:85,
                        }}>

                            <TouchableOpacity
                                onPress={() => { Alert.alert("liar") }}
                            >
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3042/3042728.png' }}
                                    onPress={() => { Alert.alert("click") }}
                                    style={{ marginHorizontal: 16, width: 30, height: 30, marginTop: 10, marginLeft: -50}}
                                    containerStyle={{ marginHorizontal: 16 }}
                                />
                       
                            </TouchableOpacity>

                        </View>
                        <View style={{
                            flexDirection: 'column', alignItems: 'center',justifyContent:'flex-end',
                          
                        }}>
                            <TouchableOpacity
                                onPress={() => { Alert.alert("profile") }}
                            >
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png' }}

                                    style={{ marginHorizontal: 16, width: 30, height: 30, marginBottom:10 }}
                                    containerStyle={{ marginHorizontal: 16 }}
                                />
                     
                            </TouchableOpacity>

                           
                        </View>

                    {/* </View> */}
                </View>
            </View>
        );
    

    
}



const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        shadowOpacity: 5.0,

    },
    actionBtn: {

        backgroundColor: '#1E90FF',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'


    }


});
