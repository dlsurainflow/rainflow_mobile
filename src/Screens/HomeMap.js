import React, { useState, useEffect, useRef, createRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions
} from "react-native";

import { WebView } from "react-native-webview";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import StepModal from "../components/NodeModal"
//import MapView from 'react-native-map-clustering';
import MapView,{ Marker } from 'react-native-maps';
import sampleMarker from "../../assets/markers/1-1-01.png";


const HomeMap = (props) => {
const [markers, setMarkers] = useState()
const [userLatitude, setUserLatitude] = useState(0);
const [userLongitude, setUserLongitude] = useState(0);
const [sidebar, setSidebar] = useState(false)
const [raftGroup, setRaftGroup] = useState();
const [mobileGroup, setMobileGroup] = useState();
const mapRef = createRef({});

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const [boundingBox, setBoundingBox] = useState(
  {
    westLng: 0,
    southLat: 0,
    eastLng: 0,
    northLat: 0
  }
)

const [region, setRegion] = useState(
  {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  }
)

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
        response.json().then( data =>{
          setMarkers(data)
         // console.log(data)
        });
      else{
        Alert.alert(
          'Error retrieving reports! (Code: ' + response.status + ')');
      }
    })
}

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  success = (pos) => {
    var crd = pos.coords;
    setUserLatitude(crd.latitude);
    setUserLongitude(crd.longitude);
  //  animateToRegion(crd.latitude, crd.longitude)
  }


  error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  
  useEffect(()=> {
     // getNodes()
      navigator.geolocation.getCurrentPosition(success, error, options);
      console.log("screen width and height: ", width, height)
  },[])

  useEffect(() => { // REPORT CARDS. for putting API response in the cards 
    if(markers == undefined){
      getNodes()
    } else {
      if(markers.length == 0){
         console.log("No reports to be plotted!!")
      }else{
        console.log
        setRaftGroup(
          markers.raft.map(raftData =>{
           // console.log("raft", raftData)
            if(isInBoundingBox(raftData.latitude, raftData.longitude)){
             // console.log("RAFT node in bound: ", raftData.id)
              return(
                    <Marker 
                    onPress={(e) => {e.stopPropagation(); console.log("clicked! raft node id: " , raftData.id, raftData.latitude, raftData.longitude);}}
                      key = {raftData.id}
                      tracksViewChanges={false}
                      coordinate={{
                        latitude: raftData.latitude,
                        longitude: raftData.longitude
                    }}/>
                
              )
            }else null;
          })
        )
      
        setMobileGroup(
          markers.mobile.map(mobileData =>{
            //console.log("data", mobileData )
            if(isInBoundingBox(mobileData.latitude, mobileData.longitude)){
              console.log("MOBILE node in bound: ", mobileData.id, "latitude: ", mobileData.latitude, "longitude: ", mobileData.longitude)
              return(
                    <Marker 
                      key = {mobileData.id}
                      onPress={(e) => {e.stopPropagation(); console.log("clicked! mobile node id " , mobileData.id, mobileData.latitude, mobileData.longitude);}}
                      tracksViewChanges={false}
                      coordinate={{
                        latitude: mobileData.latitude,
                        longitude: mobileData.longitude
                    }}/>
              )
            }
            else null;
          })
        )

      }
    }
  }, [boundingBox, markers]);

onregionchangecomplete = (region) => { //set new bounds
  let newBounds = getBoundingBox(region);
  setBoundingBox(newBounds);
}

getBoundingBox = (region) => { //get new bounds when user moves around the map
  let boundingBox = {
    westLng: region.longitude - region.longitudeDelta/2, // westLng - min lng
    southLat: region.latitude - region.latitudeDelta/2, // southLat - min lat
    eastLng: region.longitude + region.longitudeDelta/2, // eastLng - max lng
    northLat: region.latitude + region.latitudeDelta/2 // northLat - max lat
  }

  return boundingBox;
}

isInBoundingBox = (latitude, longitude) => { //to check if node can be seen in current frame
  if (latitude > boundingBox.southLat && latitude < boundingBox.northLat &&
      longitude > boundingBox.westLng && longitude < boundingBox.eastLng)
  {
    return true;
  }
  
  return false;
}

const showSidebar = () => {setSidebar(true)
}
  return (
    <View style = {styles.backgroundContainer}>

      <MapView
         ref = {mapRef}
         onRegionChangeComplete = {onregionchangecomplete}
         initialRegion={region}
         style={{flex: 1}}
        > 
                

    { userLatitude != 0 && userLongitude != 0 ? [
          <Marker 
          coordinate={{
            latitude: userLatitude,
            longitude: userLongitude
          }}>
           <MaterialCommunityIcons
                    name="record"
                    color="dodgerblue"
                    size={38}
                  />  
          </Marker>

        ] : null

        }

           
            {raftGroup ? raftGroup : null}
            {mobileGroup ? mobileGroup : null}
      </MapView>

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
