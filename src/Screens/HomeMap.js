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
import { html_map } from "./html_map"
import { MaterialCommunityIcons } from "react-native-vector-icons";


const HomeMap = (props) => {
const [markers, setMarkers] = useState()
const [injectJS, setInjectJS] = useState()
const [currentNodes, setCurrentNodes] = useState([])
const webViewRef = useRef();

const getNodes = async() => {
  let reports = await fetch('https://rainflow.live/api/map/all', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
    }
    }).then(response => {
      console.log(response.status);
      if(response.status == 200)
        response.json().then( data =>{setMarkers(data)});
      else{
        Alert.alert(
          'Error retrieving reports! (Code: ' + response.status + ')');
      }
    })
}

useEffect(()=>{
  console.log("this has been triggered by first network request")
  const interval = setInterval(() => {
    getNodes()
        console.log("second")
          if(currentNodes == markers){ //
            console.log("wala idadagdag sa map")
          }else{
            console.log("may idadagdag sa map")
            setCurrentNodes(markers)
           // console.log("haha, ", currentNodes)
           {/* webViewRef.current.injectJavaScript(`
            mymap.setView([${lat}, ${long}], 18);
            L.marker([${lat}, ${long}]).addTo(mymap)
            .bindPopup("<b>HELLO</b><br />this is a test node").openPopup();`
            
          )*/}
           // console.log(currentNodes)
          }
        
      
  }, 10000); //every 10 seconds
  return () => clearInterval(interval);

}, [markers])


useEffect(()=> {
  getNodes()
  setCurrentNodes(markers)
  console.log("upon loading")
}, [])



const addMarker = (lat, long) => {
  webViewRef.current.injectJavaScript(`
  mymap.setView([${lat}, ${long}], 18);
  L.marker([${lat}, ${long}]).addTo(mymap)
  .bindPopup("<b>HELLO</b><br />this is a test node").openPopup();`
  )
} 
  return (
    <View style = {styles.backgroundContainer}>
        <WebView
          ref = {webViewRef}
          geolocationEnabled = {true}
          originWhitelist={['*']}
          style={{flex: 1, borderWidth: 1}}
       //   injectedJavaScript = {marker}
            source={{ html: html_map}} 
          />

<View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              addMarker(14.604452, 120.978688)
            }
          >
            <MaterialCommunityIcons
                name="map-marker-outline"
                color="#ffff"
                size={20}
              />
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold", marginLeft: 4}}
            >
              Back to start point 
            </Text>
          </TouchableOpacity>
          {/*<TouchableOpacity
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
          </TouchableOpacity>*/}
        </View>


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
    backgroundColor: "#27B296",
    flexDirection: "row",
  
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
