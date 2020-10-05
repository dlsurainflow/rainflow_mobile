import React, { Component, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { WebView } from "react-native-webview";
import {html_map} from "./html_map"


const HomeMap = (props) => {
const [marker, setMarker] = useState(undefined)
const [webviewComponent, setWebviewComponent] = useState()
const webViewRef = useRef();

useEffect(()=>{
    setMarker(`L.marker([14.6047, 120.97833]).addTo(mymap)
    .bindPopup("<b>GRR!!</b><br />I am a popup.").openPopup();`)
    console.log("changes r happening")

}, [webViewRef.current])

const addMarker = (lat, long) => {
  webViewRef.current.injectJavaScript(`
  L.marker([${lat}, ${long}]).addTo(mymap)
  .bindPopup("<b>Certified freak</b><br />seven days a week!").openPopup();`
  )
}
const addMarker2 = (lat, long) => {
  webViewRef.current.injectJavaScript(`
  L.marker([${lat}, ${long}]).addTo(mymap)
  .bindPopup("<b>Certified freak</b><br />seven days a week!").openPopup();`
  )
}
 
  return (
    <View style = {{flex: 1}}>
       <WebView
        ref = {webViewRef}
        geolocationEnabled = {true}
        originWhitelist={['*']}
        style={{flex: 1, borderWidth: 1}}
        injectedJavaScript = {marker}
          source={{ html: html_map}} 
        />
     

<View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              addMarker(14.605174, 120.978484)
            }
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              PLOT 
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              addMarker2(14.60478, 120.978484)
            }
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              PLOT ANOTHER
            </Text>
          </TouchableOpacity>
        </View>


    </View>

    
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#434343",
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
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#005DBE",
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
