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
import PilahSampahScreen from './component/PilahSampah';
import PilihSetorScreen from './component/PilihSetor';

import HomeBankSampahScreen from './component/HomeBankSampah';
import BankSampahMasukScreen from './component/BankSampahMasuk';
import BankSampahKeluarScreen from './component/BankSampahKeluar';
import ProfileBankSampahScreen from './component/ProfileBankSampah';
import UbahProfileBankSampahScreen from './component/UbahProfileBankSampah';


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
        <Stack.Screen name="PilihSetor" component={PilihSetorScreen} />
        <Stack.Screen name="PilahSampah" component={PilahSampahScreen} />

        <Stack.Screen name="HomeBankSampah" component={HomeBankSampahScreen} />
        <Stack.Screen name ="BankSampahMasuk" component={BankSampahMasukScreen} />
        <Stack.Screen name ="BankSampahKeluar" component={BankSampahKeluarScreen} />
        <Stack.Screen name="ProfileBankSampah" component={ProfileBankSampahScreen} />
        <Stack.Screen name="UbahProfileBankSampah" component={UbahProfileBankSampahScreen} />

      </Stack.Navigator>
      
    </NavigationContainer>
    
    

  );
 
}