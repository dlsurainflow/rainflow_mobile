import React, { Component, useState, useEffect, useRef } from "react";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Button
} from "react-native";


import * as Notifications from 'expo-notifications';

import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import useInterval from 'use-interval'


const HomeMap = (props) => {

 const [expoPushToken, setExpoPushToken] = useState('');
const webViewRef = useRef();
const [params, setParams] = useState("guest")
const [lat, setLat] = useState()
const [lng, setLng] = useState()
const [latestNearFlood, setLatestNearFlood] = useState(null);
const [latestNearAddress, setLatestNearAddress] = useState(null);
const [newLat, setNewLat] = useState();
const [newLng, setNewLng] = useState()


const sendPushNotification = (floodLevel, address) =>{
  setLatestNearFlood(floodLevel)
  setLatestNearAddress(address)
  showMessage({
    message: "Flooded area near you!",
    description: `${floodLevel} flooding at ${address}`,
    type: "danger",
    animationDuration: 500,
    duration: 7000,
    hideOnPress: true,
    onLongPress:()=> {pressHandler()},
    icon: { icon: "warning", position: "left" },
    titleStyle: {fontWeight: "bold"}
  });
}

const pressHandler = () =>{
  setLat(newLat);
  setLng(newLng);
}

const getNearbyFlood = async() =>{
  if(lat != null && lng != null && expoPushToken != null){
     let received = await fetch(`https://rainflow.live/api/map/push`, {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json',
                       'Accept' : 'application/json',
                   },
                   body :JSON.stringify({ 
                       longitude: newLng,
                       latitude: 	newLat
                   })
                   }).then(response => {
                   //  console.log(response)
                     if(response.status == 200){
                        return response.json()
                     }
                     else{
                       Alert.alert(
                         'Error! (Code: ' + response.status + ')');
                     }
                   })
   

       if(received.length > 0){
         if(received[0].flood_depth_title !== latestNearFlood && received[0].address !== latestNearAddress){
           console.log("New nearby nodes found!")
          await sendPushNotification(received[0].flood_depth_title, received[0].address);
         }
       }else{
         console.log("No nearby nodes!")
       }
  }
}


const getToken = async()=>{
  const token = await AsyncStorage.getItem("token");
  
  if(token !== null){ 
    setParams(token) //token not expired
    //console.log("token not null ", token)
  }else{
    setParams("guest") //no token in asyncstorage
    //console.log("token is null ", token)
  }
}

function initialsuccess(pos) {
  var crd = pos.coords;
  //console.log("current location: ", crd.latitude, crd.longitude)
  setLat(crd.latitude);
  setLng(crd.longitude);
  setNewLat(crd.latitude);
  setNewLng(crd.longitude);


}

function initialerror(err) {
  //console.warn(`ERROR(${err.code}): ${err.message}`);
  setLat('null');
  setLng('null');
  setNewLat(null);
  setNewLng(null);
}
function success(pos) {
  var crd = pos.coords;
  //console.log("current location: ", crd.latitude, crd.longitude)
  setNewLat(crd.latitude);
  setNewLng(crd.longitude);
}

function error(err) {
  //console.warn(`ERROR(${err.code}): ${err.message}`);
  setLat('null');
  setLng('null');
}


var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

useFocusEffect(
  React.useCallback(() => {
    getToken();
  }, [])
);
 
useInterval(() => {
  navigator.geolocation.getCurrentPosition(success, error, options);
  getNearbyFlood()
 }, 5000)

useEffect(()=>{
  navigator.geolocation.getCurrentPosition(initialsuccess, initialerror, options);
},[])

  return (
    <View style = {styles.backgroundContainer}>
        <WebView
          ref = {webViewRef}
          geolocationEnabled = {true}
          originWhitelist={['*']}
          style={{flex: 1, borderWidth: 1}}
       source={{
        uri: `http://rainflow.live/mobile/map/${params}/${lat}/${lng}`
      }}  
          />
           <FlashMessage position="top" />
</View>

    
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

  contentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#434343",
    paddingHorizontal: 30,
  },

  button: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#1EA78C",
  },

  logoContainer: {
    flex: 1.1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#434343",
    paddingBottom: 40,
  },

  inputContainer: {
    flex: 0.5,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#434343",
    paddingTop: 40,
    paddingHorizontal: 5,
  },

  textInput: {
    backgroundColor: "#F0F3F4",
    marginVertical: 1.5,
    paddingHorizontal: 10,
    height: 40,
    width: "100%",
    borderColor: "#dedede",
    borderStyle: "solid",
    borderWidth: 1,
    letterSpacing: 2,
    alignItems: "center",
    borderRadius: 30,
  },

  button: {
    width: "80%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#27B296",
    flexDirection: "row",
    marginVertical: 15
  
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
});

export default HomeMap;
