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
import { useFocusEffect } from '@react-navigation/native';
import StepModal from "../components/NodeModal"


const HomeMap = (props) => {
const [markers, setMarkers] = useState()
const [injectJS, setInjectJS] = useState()
const [currentNodes, setCurrentNodes] = useState([])
const [sidebar, setSidebar] = useState(false)
const webViewRef = useRef();

const getNodes = async() => {
  await fetch('https://rainflow.live/api/map/all', {
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
{/*
  
  useEffect(()=>{
    console.log("this has been triggered by first network request")
    const interval = setInterval(() => {
      getNodes()
          console.log("second")
            if(JSON.stringify(currentNodes) == JSON.stringify(markers)){ //
              console.log("wala idadagdag sa map")
              currentNodes.mobile.map(data => {
                console.log("nadagdag sa mobile")
                webViewRef.current.injectJavaScript(`L.marker([${data.latitude}, ${data.longitude}]).addTo(mymap)`)
              })
              currentNodes.raft.map(data => {
                console.log("nadagdag sa RAFT")
                webViewRef.current.injectJavaScript(`L.marker([${data.latitude}, ${data.longitude}]).addTo(mymap)`)
              })
            }else{
              console.log("may idadagdag sa map")
              //console.log(currentNodes)
  
              setCurrentNodes(markers)
    
             // console.log(currentNodes)
            }
          
        
    }, 10000); //every 10 seconds
    return () => clearInterval(interval);
  
  }, [markers])
  */
}
{/* 

  useEffect(()=> {
    let unmounted = false;
  
    if(unmounted == false){
  
      getNodes()
      setCurrentNodes(markers)
      console.log("upon loading")
    }
  
    return () => {unmounted = true}
  })
  
  useFocusEffect( // fetch again when we switch between tabs. because useeffect isnt triggered when we go from one tab to the next
    React.useCallback(() => {
      let isActive = true;
      getNodes()
      setCurrentNodes(markers)
  
      return () => {
        isActive = false;
      };
    })
  );
*/}



const addMarker = (lat, long) => {
  webViewRef.current.injectJavaScript(`
  mymap.setView([${lat}, ${long}], 18);
  L.marker([${lat}, ${long}]).addTo(mymap)
  .bindPopup("<b>HELLO</b><br />this is a test node").openPopup();`
  )
} 

const showSidebar = () => {

setSidebar(true)
  
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
              showSidebar()
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
  
        </View>

  <StepModal  modalVisible={sidebar}  confirmText={"OK"}>

    <View style = {{flex:1, flexDirection: "row", alignItems: "center"}}>
    <Text style = {{textAlign: "justify", fontWeight: "bold", right: 2}}>Submitted by: tammyc</Text>
      <MaterialCommunityIcons
                    name="shield"
                    color="dodgerblue"
                    size={18}
                  />
        </View>
 
    <Text style = {{textAlign: "justify"}}>10/10/2020, 2:03 PM</Text>
    <TouchableOpacity
            style={styles.button}
            onPress={() => setSidebar(false)}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Close modal
            </Text>
          </TouchableOpacity>
    <View style = {{borderWidth: .5, width: "100%", borderColor: "#BCBCBC", marginHorizontal: 5, marginTop: 10}} />
    <View style = {{flexDirection: "row", marginVertical: 5}}>
    <Text style = {{textAlign: "justify", fontWeight: "bold"}}>Latitude: </Text>
    <Text style = {{textAlign: "justify"}}>14.476576</Text>
    </View>
    <View style = {{flexDirection: "row", marginVertical: 5}}>
    <Text style = {{textAlign: "justify", fontWeight: "bold"}}>Longitude: </Text>
    <Text style = {{textAlign: "justify"}}>120.0068565</Text>
    </View>
    <View style = {{flexDirection: "row", marginVertical: 5}}>
    <Text style = {{textAlign: "justify", fontWeight: "bold"}}>Rain Intensity: </Text>
    <Text style = {{textAlign: "justify"}}>Light Rain</Text>
    </View>
    <View style = {{flexDirection: "row", marginVertical: 5}}>
    <Text style = {{textAlign: "justify", fontWeight: "bold"}}>Flood Level: </Text>
    <Text style = {{textAlign: "justify"}}>No flooding</Text>
    </View>

    <View style={{marginTop: 5, justifyContent: "center"}}>

    <Text style = {{textAlign: "justify", fontWeight: "bold"}}>Photo: </Text>
    <Image style={{height: 300, width: 150, alignSelf: "center"}}
            source={require('../../assets/sample_image.jpg')  }/>
    </View>

</StepModal>
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
