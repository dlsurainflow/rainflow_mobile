import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  AsyncStorage,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ColorDotsLoader } from 'react-native-indicator';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import sampleMarker from "../../assets/markers/1-1-01.png";

const Reporting = (props) => {
  const [rainIntensityVal, setRainIntensityVal] = useState(null);
  const [filename, setFileName] = useState(null);
  const [floodLevelVal, setFloodLevelVal] = useState(null);
  const [dispLat, setDispLat] = useState("Analyzing . . .");
  const [dispLong, setDispLong] = useState("Analyzing . . .");
  const [accR, setAccR] = useState("Analyzing . . .");
  const [showLoading, setShowLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  navigator.geolocation.getCurrentPosition(success, error, options);

  

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    //console.log('Your current position is:');     //console.log(`Latitude : ${crd.latitude}`);     //console.log(`Longitude: ${crd.longitude}`);     //console.log(`More or less ${crd.accuracy} meters.`);
    setDispLat(crd.latitude);
    setDispLong(crd.longitude);
    setAccR(crd.accuracy);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const introAlert = () =>
    Alert.alert(
      "You are now in Reporting!",
      "Your Location is: Latitude : " + dispLat + ", Longitude: " + dispLong,
      [{ text: "Okay", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );

  const updateMyLoc = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  changeOne = () => {
    setRainIntensityVal(0);
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeTwo = () => {
    setRainIntensityVal(1.25);
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeThree = () => {
    setRainIntensityVal(2.5);
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeFour = () => {
    setRainIntensityVal(7.5);
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeFive = () => {
    setRainIntensityVal(10);
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeOneF = () => {
    setFloodLevelVal(0);
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeTwoF = () => {
    setFloodLevelVal(25);
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeThreeF = () => {
    setFloodLevelVal(50);
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeFourF = () => {
    setFloodLevelVal(75);
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeFiveF = () => {
    setFloodLevelVal(100);
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  //Reset
  resetValue = () => {
    floodLevelVal = -1;
    rainIntensityVal = -1;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  const LRainAlert = () =>
    Alert.alert(
      "LIGHT rain intensity selected!",
      "Light rain: Scattered drops that do not completely wet an exposed surface regardless of duration.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeTwo() },
      ],
      { cancelable: false }
    );

  const MRainAlert = () =>
    Alert.alert(
      "MEDIUM rain intensity selected!",
      "Medium rain: The rate of fall is from trace to 2.5 mm per hour. Individual drops easily identified and puddles(small muddy pools) form slowly. Small streams may flow in gutters.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeThree() },
      ],
      { cancelable: false }
    );

  const HRainAlert = () =>
    Alert.alert(
      "HEAVY rain intensity selected!",
      "Heavy rain: The rate of fall is between 2.5 mm to 7.5 mm per hour. Puddles rapidly forming and down pipes flowing freely.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeFour() },
      ],
      { cancelable: false }
    );

  const EHRainAlert = () =>
    Alert.alert(
      "EXTREMELY HEAVY rain intensity selected!",
      "Extremely heavy rain: The rate of fall is greater than 7.5 mm per hour. The sky is overcast, there is a continuous precipitation. Falls in sheets, misty spray over hard surfaces. May cause roaring noise on roofs.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeFive() },
      ],
      { cancelable: false }
    );

  const ADeepAlert = () =>
    Alert.alert(
      "ANKLE DEEP intensity selected!",
      "Ankle deep: Flood is around 0.25 meters high",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeTwoF() },
      ],
      { cancelable: false }
    );

  const KDeepAlert = () =>
    Alert.alert(
      "KNEE DEEP flood level is selected!",
      "Knee Deep: 7.5 - 15 mm of rain observed in the next two hours. Flood is around 0.5 meters high. Response: Monitor weather condition.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeThreeF() },
      ],
      { cancelable: false }
    );

  const WDeepAlert = () =>
    Alert.alert(
      "WAIST DEEP flood level is selected!",
      "Waist deep: 15 - 30 mm of rain observed in an hour and expected to continue in the next two hours. Flood is threatening, around 1 meter high Response: Alert for possible evacuation.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeFourF() },
      ],
      { cancelable: false }
    );

  const AWDeepAlert = () =>
    Alert.alert(
      "ABOVE WAIST DEEP flood level is selected!",
      "Above waist: More than 30 mm of rain observed in an hour and expected to continue in the next two hours. Serious flooding expected in low lying areas. Response: evacuation. ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeFiveF() },
      ],
      { cancelable: false }
    );

  const alertUserReport = () => {
    Alert.alert(
      "Report Now",
      "You are about to report this information \nLatitude: " +
        dispLat +
        "\nLongitude: " +
        dispLong +
        "\nRain Intensity: " +
        rainIntensityVal +
        "\nFlood Level: " +
        floodLevelVal,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Report",
          onPress: () => isUserLogged(),
        },
      ],
      { cancelable: false }
    );
  };

  const alertUserLogin = () => {
    Alert.alert(
      "You cannot report without an account!",
      "Tap Login to continue. Tap Cancel if you want to cancel reporting." ,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Login",
          onPress: () => {props.navigation.navigate("Login")},
        },
      ],
      { cancelable: false }
    );
  };

  const isUserLogged = async () => {
    let token = await AsyncStorage.getItem("token");
    if(token == null){
      alertUserLogin();
    }
    else{
      reportUserReport();
    }
  }

  const reportUserReport = async () => {
    setShowLoading(true);
    let token = await AsyncStorage.getItem("token");
    let formdata = new FormData();
    formdata.append("latitude", dispLat);
    formdata.append("longitude", dispLong);
    formdata.append("rainfall_rate", rainIntensityVal);
    formdata.append("flood_depth", floodLevelVal);
    if (image !== null) {
      let match = /\.(\w+)$/.exec(filename);
      let type1 = match ? `image/${match[1]}` : `image`;
      let fileType = image.substring(image.lastIndexOf(".") + 1);
      console.log("Filename: " + filename);
      console.log("Filetype: " + fileType);
      formdata.append("image", {
        uri: image,
        name: filename,
        type: `image/${fileType}`,
      });
    }
    console.log("Formdata: " + formdata);
    
    fetch("https://rainflow.live/api/report/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
          //console.log("Error: " + response)
        }
        
        //alert("Report submitted! Thank you");
        console.log(response.json().then((data) => console.log(data)));
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
      setTimeout(function(){
        setShowLoading(false);
        setImage(null);
        setFloodLevelVal(null);
        setRainIntensityVal(null);
        alert("Report submitted! Thank you");
      }, 1000);
    
    console.log("Fetch Done");
    
    
    //setRainIntensityVal(3);
    //setFloodLevelVal(3);
  };

  const checkIfNoReport = () => {
    if (rainIntensityVal == null && floodLevelVal == null) {
      alert("Missing rain intensity and flood level data to be reported");
    } else if (rainIntensityVal == null) {
      alert("Missing rain intensity data to be reported");
    } else if (floodLevelVal == null) {
      alert("Missing flood level data to be reported");
    } else {
      alertUserReport();
    }
  };

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    console.log("At Pick Image");
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // maxWidth: 500,
      // maxHeight: 500,
      // aspect: [1, 1],
      quality: 0.1,
    });

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   // allowsEditing: true,
    //   // aspect: [4, 3],
    //   quality: 1,
    // });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setFileName(result.uri.split("/").pop());
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.contentContainer}>
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
            paddingBottom: 0,
            fontSize: 40,
          }}
        >
          REPORTING
        </Text>

        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            paddingBottom: 0,
          }}
        >
          ({dispLat}, {dispLong}){"\n"}
          {/* Accuracy: {accR} meters. {"\n"} */}
          
        </Text>
        
        {/*Rain Intensity START*/}
        {showLoading ? (
            <View style = {styles.loadingContainer}>
            <ColorDotsLoader size = {30} color1 = {"#4FC69A"} color2 = {"#1EA78C"} color3 = {"#0E956A"} /> 
            <Text style = {{fontWeight: "bold", color : "#FFFF"}}>Loading</Text>       
            </View>
          ) : null}


      <View style={styles.sLine}>
      <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          RAIN INTENSITY 
        </Text>

        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            
          }}
        >
          (Currently Selected: { rainIntensityVal } mm/hr)
        </Text>
      </View>
        

        <View style={styles.overView}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => changeOne()}
          >
            <Text style={{ color: "green", fontWeight: "bold" }}>No Rain</Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice2Container}
            onPress={() => LRainAlert()}
          >
            <Text style={{ color: "yellowgreen", fontWeight: "bold" }}>
              Light Rain
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice3Container}
            onPress={() => MRainAlert()}
          >
            <Text style={{ color: "gold", fontWeight: "bold" }}>
              Medium Rain
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice4Container}
            onPress={() => HRainAlert()}
          >
            <Text style={{ color: "orange", fontWeight: "bold" }}>
              Heavy Rain
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice5Container}
            onPress={() => EHRainAlert()}
          >
            <Text style={{ color: "red", fontWeight: "bold" }}>
              Extremely Heavy Rain
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sLine}>
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          FLOOD LEVEL 
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            
          }}
        >
          (Currently Selected: { floodLevelVal } cm)
        </Text>
        </View>
        

        <View style={styles.overView}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => changeOneF()}
          >
            <Text style={{ color: "green", fontWeight: "bold" }}>No Flood</Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice2Container}
            onPress={() => ADeepAlert()}
          >
            <Text style={{ color: "yellowgreen", fontWeight: "bold" }}>
              Ankle Deep
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice3Container}
            onPress={() => KDeepAlert()}
          >
            <Text style={{ color: "gold", fontWeight: "bold" }}>
              Knee Deep
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice4Container}
            onPress={() => WDeepAlert()}
          >
            <Text style={{ color: "orange", fontWeight: "bold" }}>
              Waist Deep
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice5Container}
            onPress={() => AWDeepAlert()}
          >
            <Text style={{ color: "red", fontWeight: "bold" }}>
              Above Waist
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Take a photo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => updateMyLoc()}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Update My Location
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              See Report Summary
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonCancelContainer}>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => checkIfNoReport()}
          >
            <Text
              style={{ textAlign: "center", color: "black", fontWeight: "bold" }}
            >
              R E P O R T
            </Text>
          </TouchableOpacity>
        </View>
        
        <Modal 
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          style={{
            height: 1000,
            }
          }
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          REPORT SUMMARY 
        </Text>
        <View style={styles.sLine}>
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            paddingLeft: 20,
          }}
        >
          Your Location 
        </Text>
        <MapView
          initialRegion={{
          latitude: dispLat,
          longitude: dispLong,
          latitudeDelta: 0.000922,
          longitudeDelta: 0.000421,
          }}
          style={{width: "100%", height: 150}}
        >
          <Marker 
          coordinate={{
            latitude: dispLat,
            longitude: dispLong
          }}
          image={sampleMarker}
          style={{height: 10, width: 10}}>
            
          </Marker>
          </MapView>
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
            paddingBottom: 0,
            paddingLeft: 20,
          }}
          
        >
          Latitude:  {dispLat}  {"\n"}
          Longitude: {dispLong}          
        </Text>
        </View>
        <View style={styles.sLine}>
      <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            paddingLeft: 20,
          }}
        >
          Rain Intensity 
        </Text>

        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
            paddingLeft: 20,
          }}
        >
          You selected: { rainIntensityVal } mm/hr
        </Text>
      </View>
      <View style={styles.sLine}>
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            paddingLeft: 20,
          }}
        >
          Flood Level 
        </Text>
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
            paddingLeft: 20,
          }}
        >
          You selected: { floodLevelVal } cm
        </Text>
        </View>
        <View style={styles.sLine}>
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            paddingLeft: 20,
          }}
        >
          Image 
        </Text>
        <View style={{ alignItems: "center"}}>
        <Image
          source={{
            uri: image,
          }}
          style={{ height: 200, width: 200, alignItems: "center", paddingBottom: 20}}
        />
        </View>
        
        </View>
        
        <View style={styles.buttonContainerModal}>
          <TouchableOpacity style={styles.buttonModal} onPress={() => setModalVisible(!modalVisible)}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold", width: "50%"}}
            >
              Hide Report Summary
            </Text>
          </TouchableOpacity>
        </View>
          
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

  loadingContainer: {
    flex:1, 
    height: "100%", 
    width: "100%",
    flexDirection: "column", 
    alignItems: "center", 
    //justifyContent: "center", 
    position: "absolute",
    paddingTop: 10,
   },

  contentContainer: {
    flex: 1,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

  reportcontentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

  pads: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
  },
  choiceContainer: {
    width: "21%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "green",
  },

  choice2Container: {
    width: "21%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "yellowgreen",
    paddingLeft: 3,
    paddingRight: 3,
  },

  choice3Container: {
    width: "21%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "gold",
    paddingLeft: 3,
  },

  choice4Container: {
    width: "21%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "orange",
    paddingLeft: 3,
  },

  choice5Container: {
    width: "21%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "red",
    paddingLeft: 3,
  },

  rbuttonContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  logoContainer: {
    flex: 1.5,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#434343",
    paddingBottom: 0,
  },

  overView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
  },

  button: {
    width: "80%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#1EA78C",
  },

  buttonModal: {
    width: "70%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#1EA78C",
  },

  buttonCancel: {
    width: "80%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#1EA78C",
  },

  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 10,
  },

  buttonContainerModal: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 20,
  },


  buttonCancelContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 20,
  },

  sLine: {
    borderBottomWidth: 0.5, 
    borderBottomColor: "#bcbcbc", 
    paddingVertical: 10,
    paddingBottom: 5,
  },
  
});

export default Reporting;
