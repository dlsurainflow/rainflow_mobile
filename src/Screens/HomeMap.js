import React, { Component, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";

import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";


const HomeMap = (props) => {

const webViewRef = useRef();
const [params, setParams] = useState("guest")

const getToken = async()=>{
  const token = await AsyncStorage.getItem("token");
    
  if(token != null) setParams(token)
  else setParams("guest")
}

useEffect(() => {
  getToken()
}, [])



  return (
    <View style = {styles.backgroundContainer}>
        <WebView
          ref = {webViewRef}
          geolocationEnabled = {true}
          originWhitelist={['*']}
          style={{flex: 1, borderWidth: 1}}
       source={{
        uri: `http://rainflow.live:8443/mobile/map/${params}`
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
