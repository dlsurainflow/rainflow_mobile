import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';


const Reporting = (props) => {
  var rainIntensityVal = -1;
  navigator.geolocation.getCurrentPosition(success, error, options);
  var dispLat = null;
  var dispLong = null;

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    dispLat = crd.latitude;
    dispLong = crd.longitude;
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  const introAlert = () =>
    Alert.alert(
      "You are now in Reporting!",
      "Your Location is: Latitude : " + dispLat + ", Longitude: " + dispLong,
      [
        { text: "Okay", onPress: () => console.log("OK Pressed")}
      ],
      { cancelable: false }
    );

  changeOne = () => {
    rainIntensityVal = 0;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeTwo = () => {
    rainIntensityVal = 1.25;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeThree = () => {
    rainIntensityVal = 2.5;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeFour = () => {
    rainIntensityVal = 7.5;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeFive = () => {
    rainIntensityVal = 10;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  var floodLevelVal = -1;

  changeOneF = () => {
    floodLevelVal = 0;
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeTwoF = () => {
    floodLevelVal = 25;
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeThreeF = () => {
    floodLevelVal = 50;
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeFourF = () => {
    floodLevelVal = 75;
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeFiveF = () => {
    floodLevelVal = 100;
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
          style: "cancel"
        },
        { text: "Report", onPress: () => changeTwo()}
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
          style: "cancel"
        },
        { text: "Report", onPress: () => changeThree()}
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
          style: "cancel"
        },
        { text: "Report", onPress: () => changeFour()}
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
          style: "cancel"
        },
        { text: "Report", onPress: () => changeFive()}
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
          style: "cancel"
        },
        { text: "Report", onPress: () => changeTwoF()}
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
          style: "cancel"
        },
        { text: "Report", onPress: () => changeThreeF()}
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
          style: "cancel"
        },
        { text: "Report", onPress: () => changeFourF()}
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
          style: "cancel"
        },
        { text: "Report", onPress: () => changeFiveF()}
      ],
      { cancelable: false }
    );

    const checkIfNoReport = () => {
      if(rainIntensityVal == -1 && floodLevelVal == -1){
        alert("Missing rain intensity and flood level data to be reported");
      }
      else if(rainIntensityVal == -1){
        alert("Missing rain intensity data to be reported");
      }
      else if(floodLevelVal == -1){
        alert("Missing flood level data to be reported");
      }
      else{
        console.log("Reported successfully!")
      }
    }

    const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    console.log("HELLO");
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.contentContainer}>
        <Text
          style={{
            textAlign: "left",
            color: "#fff",
            fontWeight: "bold",
            paddingBottom: 30,
            fontSize: 40,
          }}
        >
          REPORTING
        </Text>
        <Text style={{
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
            paddingBottom: 30,
           
          }}>
          Latitude: {dispLat} {"\n"}
          Longitude: {dispLong}
        </Text>
        
        {/*Rain Intensity START*/}

        <Text style={{ textAlign: "left", color: "#fff", fontWeight: "bold", fontSize: 30}}>
          RAIN INTENSITY
        </Text>
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
            <Text style={{ color: "yellow", fontWeight: "bold" }}>
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

        <Text style={{ textAlign: "left", color: "#fff", fontWeight: "bold", fontSize: 30,}}>
          FLOOD LEVEL
        </Text>

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
            <Text style={{ color: "yellow", fontWeight: "bold" }}>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => pickImage()}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Take a photo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => introAlert()}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Check Location
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonCancelContainer}>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => checkIfNoReport()}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold"}}
            >
              R E P O R T 
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

  reportcontentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#434343",
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
    backgroundColor: "#434343",
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
    backgroundColor: "#434343",
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
    backgroundColor: "#434343",
    borderWidth: 2,
    borderColor: "yellow",
    paddingLeft: 3,
  },

  choice4Container: {
    width: "21%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#434343",
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
    backgroundColor: "#434343",
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
    width: "100%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#1EA78C",
  },

  buttonCancel: {
    width: "100%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#434343",
    borderWidth: 2,
    borderColor: "#1EA78C",
  },

  buttonContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "#434343",
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 20,
  },

  buttonCancelContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "#434343",
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 20,
  },
});

export default Reporting;
