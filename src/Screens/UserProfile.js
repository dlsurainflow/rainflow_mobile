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



import { MaterialCommunityIcons } from "react-native-vector-icons";
//<View style = {{borderWidth: .5, borderColor: "#BCBCBC", marginHorizontal: 30, marginTop: 10}} />

const UserProfile = (props) => {
  const [username, setUsername] = useState();
  const [accPoints, setAccPoints] = useState();
  const [bodyComponent, setBodyComponent] = useState();
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
        //  console.log("not logged in")
          setButtonLabel("Login")

      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
}
  const  logOut = async() =>{
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('points');
      console.log("yeh")
      setUsername(undefined)
      setAccPoints(undefined)
      setButtonLabel("Login")
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
 }
});

export default UserProfile;
