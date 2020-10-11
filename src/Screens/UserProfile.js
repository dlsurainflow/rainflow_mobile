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
import { CirclesRotationScaleLoader } from 'react-native-indicator';
import { MaterialCommunityIcons } from "react-native-vector-icons";
//<View style = {{borderWidth: .5, borderColor: "#BCBCBC", marginHorizontal: 30, marginTop: 10}} />

const UserProfile = (props) => {
  const [username, setUsername] = useState();
  const [accPoints, setAccPoints] = useState();
  const [showLoading, setShowLoading] = useState(false)
  const [buttonLabel, setButtonLabel] = useState()
  
  const  checkUserSignedIn = async() =>{
    try {
       let un = await AsyncStorage.getItem("username");
       let pts = await AsyncStorage.getItem("points");
       if (un != null){
         //console.log("logged in")
         setUsername(un)
         setAccPoints(pts)
         setButtonLabel("Logout")
         
        }
        else {
        //console.log("not logged in")
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
        console.log("yeh")
        setUsername(undefined)
        setAccPoints(undefined)
        setButtonLabel("Login")
        props.navigation.navigate("HomeMap")
      }, 5000);



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
    console.log("heyyo!")
    checkUserSignedIn()
  }, [])
  return (
    <View style = {styles.backgroundContainer}>
      <View style = {styles.headerContainer}>
      <View style = {styles.headerInfo}>
      <MaterialCommunityIcons
                name="shield-half-full"
                color="#ffff"
                size={60}
              />
  <Text style = {styles.userText}>{username ? username : 'Guest'}</Text>
  <Text style = {styles.pointsText}>{accPoints ? accPoints : '0'} pts</Text>
        
      </View>
      </View>
      <View style = {styles.bodyContainer}>
      {username ? 
      (
        <Text style = {styles.bodyText}>You are logged in</Text>
        
      ): (
      <>
      <Text style = {styles.bodyText}>You are currently not logged in.</Text>
      <Text style = {styles.bodyText}>Login to view your report history, as well as submit a report.</Text>
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
            <CirclesRotationScaleLoader size = {100}color = {"#434343"} /> 
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
  flex: 0.60, 
  justifyContent: "center", 
  padding: 20, 
  justifyContent: "flex-end", 
  alignItems: "center", 
  borderBottomLeftRadius: 170, 
  borderBottomRightRadius: 170
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
  fontSize: 16, 
  color: "#fff"
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
  color: "#434343"
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
