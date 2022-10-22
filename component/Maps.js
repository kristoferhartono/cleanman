import * as React from "react"
import { Dimensions, StyleSheet, Text, View,TouchableOpacity } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, {Callout, Circle, Marker } from "react-native-maps"


export default function MapsScreen({navigation}) {

 	const [ region, setRegion ] = React.useState({
		latitude: -6.915502599855987,
		longitude: 107.60458365082741,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})
  const [ pin, setPin ] = React.useState({
		latitude: region.latitude,
		longitude: region.longitude
	})
	
  const onKirimPress = () => {
    navigation.navigate("SampahLiar")
}
	return (
		<View style={{  flex: 1 }}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				query={{
					key: "AIzaSyAfevgpvPNjRALaz3jPJhNgE040p9GnH5o",
					language: "en",
					components: "country: id  ",
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>
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
