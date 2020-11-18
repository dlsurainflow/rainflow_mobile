import React, { Component, useState, useEffect, useRef } from "react";
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

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import useInterval from 'use-interval'


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



const HomeMap = (props) => {
const TASK_NAME = "BACKGROUND_TASK"

TaskManager.defineTask(TASK_NAME,async() => {
  try {
  if(lat != null && lng != null && expoPushToken != null){
 // console.log(lat, lng)
  let received = await fetch(`https://rainflow.live/api/map/push`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                },
                body :JSON.stringify({ 
                    longitude: 			120.9946297,
                    latitude: 	14.423968
                })
                }).then(response => {
                  console.log(response)
                  if(response.status == 200){
                     return response.json()
                  }
                  else{
                    Alert.alert(
                      'Error! (Code: ' + response.status + ')');
                  }
                })

    //const receivedNewData = "Simulated fetch " + Math.random()
    //console.log(JSON.stringify(received))
    if(received.length > 0){
    console.log("Nearby nodes found!")
    //console.log(received[0].flood_depth_title, received[0].address)
     await sendPushNotification(expoPushToken, received[0].flood_depth_title, received[0].address);
    }else{
      console.log("No nearby nodes!")
    }

    return receivedNewData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData
  }
  
  } catch (err) {
    return BackgroundFetch.Result.Failed
  }
})


 const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
const webViewRef = useRef();
const [params, setParams] = useState("guest")
const [lat, setLat] = useState()
const [lng, setLng] = useState()

useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));


    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
 
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

const sendPushNotification = async(expoPushToken, floodLevel, address) =>{
  //console.log("expo push token", expoPushToken)
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Flooded area near you!',
    body: `There is a report of ${floodLevel} flooding at ${address}`,
    data: { data: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

RegisterBackgroundTask = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 2, // seconds,
    })
    console.log("Task registered")
  } catch (err) {
    console.log("Task Register failed:", err)
  }
}

const registerForPushNotificationsAsync = async() => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    //console.log("existing status: ", existingStatus)
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  //  console.log("token", token);
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
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

function success(pos) {
  var crd = pos.coords;
  console.log("current location: ", crd.latitude, crd.longitude)
  setLat(crd.latitude);
  setLng(crd.longitude);


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
 

// useInterval(() => {
//   console.log("test test test")
// }, 10000); 


useEffect(()=>{
  navigator.geolocation.getCurrentPosition(success, error, options);
  RegisterBackgroundTask();
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
