import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet, Image, Pressable} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-ico-material-design';

// You can import from local files
// import AssetExample from './components/AssetExample';

import SplashScreen from './component/SplashScreen';
import LoginScreen from './component/Login';
import HomeScreen from './component/Home';
import RegistrationScreen from './component/SignUp';
import SetorSampahScreen from './component/SetorSampah';
import SampahLiarScreen from './component/SampahLiar';
import MapsScreen from './component/Maps';
import ProfileScreen from './component/Profile';
import UbahProfileScreen from './component/UbahProfile';
import RiwayatScreen from './component/Riwayat';

// or any pure javascript modules available in npm

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{
        headerShown: false
      }}
      initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={RegistrationScreen} />
        <Stack.Screen name ="SetorSampah" component={SetorSampahScreen} />
        <Stack.Screen name="SampahLiar" component={SampahLiarScreen} />
        <Stack.Screen name="Maps" component={MapsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="UbahProfile" component={UbahProfileScreen} />
        <Stack.Screen name="Riwayat" component={RiwayatScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
    
    

  );
}