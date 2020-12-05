import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
  ScrollView
} from "react-native";
import { Appbar } from 'react-native-paper';
import { MaterialCommunityIcons } from "react-native-vector-icons";

const BadgeIndex = (props) => {

  useEffect(() => {
    const backAction = () => {
      props.navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });



  return (
    <View style={styles.backgroundContainer}>
      <Appbar.Header style = {{backgroundColor: "#0E956A"}}>
      <Appbar.BackAction onPress={()=> props.navigation.navigate("UserProfile")} />
      <Appbar.Content title="Badge Index" titleStyle= {{fontSize: 15}} subtitle="User Badges and our points system" subtitleStyle={{fontSize: 12}}/>
    </Appbar.Header>
    <View style={styles.contentContainer}>

<View style = {styles.userHeader}>
      <Text style = {styles.userText}>Badge Index</Text>
      <Text style = {styles.userText2}>
        Registered users have a badge affixed to their username. This signifies the amount of points
        they have accumulated.</Text>
      <Text style = {styles.userText2}>
        There is also a special badge indicating if a user owns a RAFT device.</Text>
</View>
<ScrollView style = {{width : "100%", paddingHorizontal: 15}} showsVerticalScrollIndicator={false}> 
    <View style={styles.cardContainer}>
    <View style = {{flexDirection: "row", alignItems: "center", alignSelf: "center", width: "95%", borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: "#BCBCBC", paddingVertical: 10, marginHorizontal: 15}}>
       <Text style = {styles.dateText}>How to gain points:</Text>
       </View>   
      <View style = {styles.cardContent}>
          <View style = {{flexDirection: "column", marginTop: 5}}>
          <Text style = {{marginVertical: 5, textAlign: "justify"}}>- Registered users gain a point for every upvote on their flood reports.</Text>
          <Text style = {{marginVertical: 5,  textAlign: "justify"}}>- Likewise, they lose a point for every downvote.</Text>
          <Text style = {{marginVertical: 5,  textAlign: "justify"}}>- Points are added once a report has been archived.</Text>
          </View>
      </View>
      </View>

    <View style={styles.cardContainer2}>
    <View style = {{flexDirection: "row", alignItems: "center", alignSelf: "center", width: "95%", borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: "#BCBCBC", paddingVertical: 10, marginHorizontal: 15}}>
       <Text style = {styles.dateText}>Badge List</Text>
       </View>   
      <View style = {styles.cardContent}>
          <View style = {{flexDirection: "column", marginTop: 5}}>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/raft.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>RAFT owner</Text>
            </View>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/0.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>10 - 19 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/1.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>20 - 29 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/2.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>30 - 39 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/3.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>40 - 49 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/4.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>50 - 59 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/5.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>60 - 69 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/6.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>70 - 79 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/7.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>80 - 89 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/8.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>90 - 99 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/9.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>100 - 109 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/10.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>110 - 119 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/11.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>120 - 129 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/12.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>130 - 139 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/13.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>140 - 149 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/14.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>150 - 159 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/15.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>160 - 169 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/16.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>170 - 179 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/17.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>180 - 189 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/18.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>190 - 199 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/19.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>200 - 209 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/20.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>210 - 219 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/21.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>220 - 229 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/22.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>230 - 239 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/23.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>240 - 249 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/24.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>250 - 259 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/25.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>260 - 269 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/26.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>270 - 279 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/27.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>280 - 289 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/28.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>290 - 299 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/29.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>300 - 309 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/30.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>310 - 319 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/31.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>320 - 329 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/32.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>330 - 339 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/33.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>340 - 349 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/34.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>350 - 359 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/35.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>360 - 369 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/36.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>370 - 379 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/37.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>380 - 389 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/38.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>390 - 399 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/39.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>400 - 409 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/40.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>410 - 419 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/41.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>420 - 429 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/42.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>430 - 439 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/43.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>440 - 449 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/44.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>450 - 459 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/45.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>460 - 469 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/46.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>470 - 479 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/47.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>480 - 489 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/48.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>490 - 499 pts.</Text>
              </View>
                <View style = {styles.badgeItem}>
                
                <Image
                source={{uri:`https://rainflow.live/api/images/badges/49.png`}}
                style={{height: 30, width: 20}}
              /><Text style = {{marginLeft: 40}}>500 pts {"&"} more</Text>
              </View>
          </View>
    </View>
</ScrollView>

</View>
    </View>
  )
 
};
const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      width: "100%",
      backgroundColor: "#fff",
      justifyContent: "center",
     marginTop: Platform.OS === "android" ? 25 : 0,
    },
    contentContainer: {
      flex: 1,
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "#fff",
    },
  paragraph: {
    textAlign: "center", 
    color: "#3d3d3d", 
    marginBottom: 20, 
    fontSize: 14,
  },
  
  missionText: {
    fontWeight:"bold", 
    color: "#fff", 
    fontSize: 25
  },
  
  userText: {
    fontWeight:"bold", 
    color: "#fff", 
    fontSize: 25
  },
  userText2: {
    color: "#fff", 
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 15,
    marginTop: 5,
  },
  
  userHeader: {
    flexDirection: "column", 
    width: "100%", 
    backgroundColor: "#47b28a", 
    height: 180, 
    justifyContent: "center", 
    alignItems: "center", 
  },
  
  boldText : {
    fontSize: 16, 
    fontWeight: "bold"
  },
  
  listItem: {
    marginLeft: 5, 
    marginVertical: 5
  },
  
  cardContainer: {
      display: 'flex',
      backgroundColor: '#fff',
      height: "auto",
      width: "100%",
      borderWidth: 0.5,
      borderColor: "#bcbcbc",
      marginTop: 15
    },
  cardContainer2: {
      display: 'flex',
      backgroundColor: '#fff',
      height: "auto",
      width: "100%",
      borderWidth: 0.5,
      borderColor: "#bcbcbc",
      marginTop: 15,
      marginBottom: 15
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: "flex-start",
      padding: 10,
      width: "100%"
    },
  
    dateText: {
        //backgroundColor: "#1EA78C",
        //paddingVertical: 5,
        //paddingHorizontal: 10,
        //borderRadius: 30,
        color: "#3d3d3d",
        textAlign: "center",
        fontWeight: "bold",
        width: "100%",
        marginBottom: 10,
        fontSize: 16,
        textAlignVertical: "center"
    },
  
    latLongText: {
        backgroundColor: "#1EA78C",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 30,
        color: "#fff",
        textAlign: "center"
    },
  
    rainText: {
        borderRadius: 30, 
        paddingVertical: 1, 
        paddingHorizontal: 8, 
        backgroundColor: "#1EA78C", 
        color: "#fff"},

    badgeItem: {width: "100%", 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "row", 
    marginVertical: 5},
  
      floodText: {
          borderRadius: 30, 
          paddingVertical: 1, 
          paddingHorizontal: 8, 
          backgroundColor: "#0E956A", 
          color: "#fff"}
    
  });

export default BadgeIndex;
