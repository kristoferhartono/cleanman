import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View,TouchableOpacity } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, {Callout, Circle, Marker } from "react-native-maps"
import * as Location from 'expo-location';

export default function MapsScreen({navigation}) {
	const [location, setLocation] = React.useState(null);

	const [ pin, setPin ] = React.useState({
		latitude: -6.91897274489851,
		longitude: 107.61081140488386
	})
	const [errorMsg, setErrorMsg] = React.useState(null);
	useEffect(() => {
		(async () => {
		  
		  let { status } = await Location.requestForegroundPermissionsAsync();
		  if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			return;
		  }
	
		  let location = await Location.getCurrentPositionAsync({});
		  setLocation(location)

		  console.log(location)
		})();
	  }, []);
	
		  



	
  const onKirimPress = () => {
    navigation.navigate("SampahLiar")
	}

	return (
		<View style={{  flex: 1 }}>
      <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onKirimPress()}>
                    <Text style={styles.buttonTitle}>Bagikan Lokasi</Text>
                </TouchableOpacity>
                </View>

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
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={100} />
			</MapView>
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
		height: Dimensions.get("window").height
	},
  button: {
    backgroundColor: '#AAEEE9',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
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

