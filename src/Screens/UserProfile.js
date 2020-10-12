import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { ColorDotsLoader } from 'react-native-indicator';
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Chip } from 'react-native-paper';

const UserProfile = (props) => {
  const [username, setUsername] = useState();
  const [accPoints, setAccPoints] = useState();
  const [showLoading, setShowLoading] = useState(false)
  const [buttonLabel, setButtonLabel] = useState()
  const [bodyComponent, setBodyComponent] = useState()
  
  const  checkUserSignedIn = async() =>{
    try {
       let un = await AsyncStorage.getItem("username");
       let pts = await AsyncStorage.getItem("points");
       if (un != null){
         setUsername(un)
         setAccPoints(pts)
         setButtonLabel("Logout")
         
        }
        else {
          setButtonLabel("Login")

      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
}
  const  logOut = async() =>{
    try {
      setShowLoading(true)
      setTimeout(async() => {
        setShowLoading(false)
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('points');
        setUsername(undefined)
        setAccPoints(undefined)
        setButtonLabel("Login")
        ToastAndroid.show(
          "Welcome, guest!",
          ToastAndroid.SHORT
        )
        props.navigation.navigate("HomeMap")
      }, 3000);



  }
  catch(exception) {
      return false;
  }
}

const logoutHandler = () =>{
    return Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => logOut() },
      ],
      { cancelable: false }
    );
  
  
}

  useEffect(()=> {
    checkUserSignedIn()
  }, [])

  
  return (
    <View style = {styles.backgroundContainer}>
      <View style = {styles.headerContainer}>
      <View style = {styles.headerInfo}>
        <View style = {{borderRadius: 100, padding: 8, borderColor: "#fff", backgroundColor: "#fff"}}>
      <MaterialCommunityIcons
                name="shield-half-full"
                color="#0E956A"
                size={60}
              />
        </View>
  <Text style = {styles.userText}>{username ? username : 'Guest'}</Text>
  <View style = {{paddingTop: 10, width: "100%", flexDirection: "row",}}>
  <Text style = {styles.pointsText}>{accPoints ? accPoints : '0'} pts</Text>
  <Text style = {styles.pointsText}>{accPoints ? 'Silver badge' : 'No badge'}</Text> 
  <Text style = {styles.pointsText}>{accPoints ? '5 reports' : '0 reports'}</Text>  
  </View>
      </View>
      </View>
      <View style = {styles.bodyContainer}>
      {username ? 
      (
        <Text style = {styles.bodyText}>You are logged in</Text>
        
      ): (
      <>
      <Text style = {styles.bodyText2}>You are currently not logged in.</Text>
      <Text style = {styles.bodyText}>Login to view your report history, as well as submit a report.</Text>
      <Text style = {styles.bodyText}>To know more about our authenticated user privileges, go to our About Page. </Text>
      </>
      )}

    
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {username ? logoutHandler() : props.navigation.navigate('Login')}}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              {buttonLabel}
            </Text>
          </TouchableOpacity>
   
        </View> 
          </View>

          {showLoading ? (
            <View style = {styles.loadingContainer}>
            <ColorDotsLoader size = {30} color1 = {"#4FC69A"} color2 = {"#1EA78C"} color3 = {"#0E956A"} /> 
            <Text style = {{fontWeight: "bold", color : "#434343"}}>Loading</Text>       
            </View>
          ) : null}
          
    </View>
  );
};

const styles = StyleSheet.create({

  backgroundContainer: {
    backgroundColor: "#fff", 
    flex: 1,

  },
 headerContainer: {
  backgroundColor: "#0E956A", 
  flex: 0.65, 
  justifyContent: "center", 
  padding: 20, 
  justifyContent: "flex-end", 
  alignItems: "center", 


 },

 headerInfo: {
  justifyContent: "center", 
  alignItems: "center", 
  marginTop: 70
 },

 userText:{
  fontSize: 30, 
  fontWeight: "bold", 
  color: "#fff"
 },

 pointsText:{
  fontSize: 12, 
  fontWeight: "bold",
  backgroundColor: "#fff",
  color: "#0E956A",
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 30,
  marginHorizontal: 5,

 },
 button: {
  width: "100%",
  height: 45,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  borderRadius: 30,
  backgroundColor: "#0E956A",
  flexDirection: "row",
  marginVertical: 15,
},

buttonContainer: {
  flex: 1,
  width: "70%",
 position: "absolute",
  alignItems: "center",
  alignSelf: "center",
  paddingHorizontal: 5,
  bottom:40,
},

 bodyContainer: {
  flex:1,
  paddingHorizontal: 20, 
  height: "80%", 
  justifyContent: "flex-start", 
  backgroundColor: "#FFF"
 },

 bodyText: {
  marginTop: 20, 
  fontSize: 14, 
  color: "#434343",
  textAlign: "justify"
 },

 bodyText2: {
  marginTop: 20, 
  fontSize: 14, 
  color: "#434343",
  textAlign: "justify",
  fontWeight: "bold"
 },

 loadingContainer: {
  flex:1, 
  height: "100%", 
  width: "100%",
  flexDirection: "column", 
  alignItems: "center", 
  justifyContent: "center", 
  position: "absolute",
  paddingTop: Platform.OS === "android" ? 25 : 0,
 }
});

export default UserProfile;
