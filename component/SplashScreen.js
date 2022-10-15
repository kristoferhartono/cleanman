import React, { useState, useRef, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Animated} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Constants from 'expo-constants';
export default function SplashScreen ({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      })
    ]).start(() => navigation.navigate("Login"));
  };

  useEffect(() => {
    fadeIn();
    
  }, [])
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
            transform: [
              {
                translateX: fadeAnim,
              },
            ],
          }
        ]}
      >
        <Image style={styles.splashscreen} source={require('../assets/splashscreen.png')} />
      </Animated.View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex : 1,
    justifyContent: 'center',
    flexDirection: "column",
    alignItems: 'center',
    backgroundColor: 'white'
  },
  splashscreen: {
    height: 725,
    width : 360,
  }
});

