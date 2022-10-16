import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert, ScrollView, Dimensions, FlatList, Pressable, } from 'react-native';
import BottomNavigator from './NavigationHome';



const CARD_WIDTH = Dimensions.get('window').width * 0.8
const CARD_HEIGHT = Dimensions.get('window').height * 0.2
const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10

const cards = [
  { name: 'Card 1', image: "https://image.shutterstock.com/image-vector/freelance-developer-sitting-on-clock-600w-1122554897.jpg" },
  { name: 'Card 2', image: "https://img.freepik.com/free-photo/orchid-flower-against-gold-background_23-2149244105.jpg?size=626&ext=jpg&ga=GA1.2.1555323700.1647669487"  },
  { name: 'Card 3', image: "https://image.shutterstock.com/image-vector/freelance-developer-sitting-on-clock-600w-1122554897.jpg"  },
  { name: 'Card 4', image: "https://img.freepik.com/free-photo/orchid-flower-against-gold-background_23-2149244105.jpg?size=626&ext=jpg&ga=GA1.2.1555323700.1647669487"  },
  { name: 'Card 5', image: "https://image.shutterstock.com/image-vector/freelance-developer-sitting-on-clock-600w-1122554897.jpg"  },
]

export default function HomeScreen({ navigation }) {
  const data = [
    {id:0, title: "Setor Sampah", color:"#EBC7AD", image:"https://cdn-icons-png.flaticon.com/128/3096/3096673.png"},
    {id:1, title: "Sampah Liar", color:"#EBC7AD", image:"https://cdn-icons-png.flaticon.com/128/3042/3042728.png"},

  ]

  const clickEventListener = (navigateTo) => {
    navigation.navigate(navigateTo)
  }
  const onAddPress = () => {
    navigation.navigate("Profile")
  }
  const renderViews = (views) => {
    const { cardStyleC } = styles
    return views.map((card, key) => {
      return (
        <View style={cardStyleC} key={key}>
          <Image style={styles.image} source={{uri:card.image}} />
          <Text style={{paddingLeft:20, paddingTop:3}}>
            {card.name}
          </Text>
        </View>
      )
    })
  }

    const { container } = styles
    return (
      <View style={styles.container}>
        <View style={styles.header}>

        <View>
          <Text style={{color: "#000000", fontSize: 30, fontWeight: 'bold'}}>
          Halo, Davin Setiawan</Text>
        </View>
          {/* <Pressable onPress={() => onAddPress()}>
            <Image
              style={styles.profileImage}
              source={require('../assets/logo.png')}/>
          </Pressable> */}
        </View>

        <View>
          {/* <Text style={{color: "#000000", paddingLeft:25, paddingTop:10, fontSize: 20, fontWeight: 'bold'}}>Popular This Week</Text>
          <Image
            style={styles.logo}
            source={require('../assets/icon.png')} 
          /> */}
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={container}>
          <ScrollView
            horizontal // Change the direction to horizontal
            pagingEnabled // Enable paging
            decelerationRate={0} // Disable deceleration
            snapToInterval={CARD_WIDTH+10} // Calculate the size for a card including marginLeft and marginRight
            snapToAlignment='center' // Snap to the center
            contentInset={{ // iOS ONLY
              top: 0,
              left: SPACING_FOR_CARD_INSET, // Left spacing for the very first card
              bottom: 0,
              right: SPACING_FOR_CARD_INSET // Right spacing for the very last card
            }}
            contentContainerStyle={{ // contentInset alternative for Android
              paddingHorizontal: 10,
              SPACING_FOR_CARD_INSET : 0 // Horizontal spacing before and after the ScrollView
            }}
            >
              {renderViews(cards)}
          </ScrollView>
        </SafeAreaView>
      </View>
{/* 
          <Text style={{color: "#000000", paddingLeft:25, paddingTop:10, fontSize: 20, fontWeight: 'bold'}}>Choose Your Menu</Text> */}
        
        
        </View>

        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={() => {clickEventListener(item.navigateTo)}}>
                <View style={styles.cardFooter}></View>
                <Image style={styles.cardImage} source={{uri:item.image}}/>
                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
          />
          <BottomNavigator></BottomNavigator>
      </View>
    );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop : 10,
    backgroundColor : 'white'
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#ffffff",
  },
  listContainer:{
    alignItems:'center'
  },
  header: {
    paddingTop: 35,
    paddingTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  logo: {
    alignSelf: "center",
    height : 170,
    width : 350,
    marginTop : 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',

    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    backgroundColor:"#000000",
    flexBasis: '42%',
    marginHorizontal: 10,
    borderRadius: 10
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 70,
    width: 70,
    alignSelf:'center'
  },
  title:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  cardStyle: {
    width: 500,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    margin: 5,
    borderRadius: 15
  },
cardStyleC: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginBottom : 25,
    borderRadius : 15,
    backgroundColor : '#ffffff',
    overflow : 'hidden',
    shadowColor: '#00000021',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1.37,
    shadowRadius: 7.49,
    elevation: 12,

  },
    image : {
    width : '100%',
    height : '80%'
  },
});   
      