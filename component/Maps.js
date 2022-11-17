import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View,TouchableOpacity } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, {Callout, Circle, Marker } from "react-native-maps"
import * as Location from 'expo-location';
import { auth, db } from '../firebase';
import { set, ref, update, push, Database } from 'firebase/database';


export default function MapsScreen({navigation}) {
	const [pin, setPin] = React.useState({
		latitude: -6.915511919289829,
		longitude: 107.60906931012869
	  })
 
	const [errorMsg, setErrorMsg] = React.useState(null);
  	useEffect(() => {
    runFunction();
  }, []);



  const handleGPS = () => {
	navigation.navigate("SampahLiar", {
		paramKey: pin,
	})

	

	
}
  const runFunction = async () => {
      
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setPin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude});

	const alamat = await Location.reverseGeocodeAsync ({
		latitude: location.coords.latitude,
		longitude: location.coords.longitude
	})

	
    console.log(location)


  }




    


	return (
		<View style={{  flex: 1 }}>
      

			<MapView
				style={styles.map}
				initialRegion={{
					latitude: pin.latitude,
		      longitude: pin.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
				provider="google"
			>
				<Marker coordinate={{ latitude: pin.latitude, longitude: pin.longitude }} />
				<Marker
					coordinate={pin}
					pinColor="black"
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinate)
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
            console.log("Drag end", e.nativeEvent.coordinate)
            console.log(pin)
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={100} />
			</MapView>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => 
			navigation.navigate("SampahLiar", {
			screen: 'CameraSampahLiar',
			lokasi: pin,
			})	}>
          <Text style={styles.buttonTitle}>Bagikan Lokasi</Text>
        </TouchableOpacity>
      </View>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height*0.89
	},
  button: {
    backgroundColor: '#AAEEE9',
    marginLeft: 30,
    marginRight: 30,


    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
},
buttonTitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: "bold"
},
})

