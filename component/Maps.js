// import * as React from "react"
// import { Dimensions, StyleSheet, Text, View } from "react-native"
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
// import MapView, { PROVIDER_GOOGLE,Callout, Circle, Marker } from "react-native-maps"

// export default function MapsScreen() {
// 	const [ pin, setPin ] = React.useState({
// 		latitude: -6.890800,
// 		longitude: 107.610143
// 	})
// 	const [ region, setRegion ] = React.useState({
// 		latitude: -6.890800,
// 		longitude: 107.610143,
// 		latitudeDelta: 0.0922,
// 		longitudeDelta: 0.0421
// 	})

// 	return (
// 		<View style={{  flex: 1 }}>
// 			<GooglePlacesAutocomplete
// 				placeholder="Search"
// 				fetchDetails={true}
// 				GooglePlacesSearchQuery={{
// 					rankby: "distance"
// 				}}
// 				onPress={(data, details = null) => {
// 					// 'details' is provided when fetchDetails = true
// 					console.log(data, details)
// 					setRegion({
// 						latitude: details.geometry.location.lat,
// 						longitude: details.geometry.location.lng,
// 						latitudeDelta: 0.0922,
// 						longitudeDelta: 0.0421
// 					})
// 				}}
// 				query={{
// 					key: "AIzaSyDDmafmYAufUdLUSd7fzwbOYBjoRM01OJ8",
// 					language: "en",
// 					components: "country:   ",
// 					types: "establishment",
// 					radius: 30000,
// 					location: `${region.latitude}, ${region.longitude}`
// 				}}
// 				styles={{
// 					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
// 					listView: { backgroundColor: "white" }
// 				}}
// 			/>
// 			<MapView
// 				style={styles.map}
// 				initialRegion={{
// 					latitude: -6.890800,
// 		            longitude: 107.610143,
// 					latitudeDelta: 0.0922,
// 					longitudeDelta: 0.0421
// 				}}
// 				provider="google"
// 			>
// 				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
// 				<Marker
// 					coordinate={pin}
// 					pinColor="black"
// 					draggable={true}
// 					onDragStart={(e) => {
// 						console.log("Drag start", e.nativeEvent.coordinates)
// 					}}
// 					onDragEnd={(e) => {
// 						setPin({
// 							latitude: e.nativeEvent.coordinate.latitude,
// 							longitude: e.nativeEvent.coordinate.longitude
// 						})
// 					}}
// 				>
// 					<Callout>
// 						<Text>I'm here</Text>
// 					</Callout>
// 				</Marker>
// 				<Circle center={pin} radius={500} />
// 			</MapView>
// 		</View>
// 	)
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center"
// 	},
// 	map: {
// 		width: Dimensions.get("window").width,
// 		height: Dimensions.get("window").height
// 	}
// })
import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function MapsScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});