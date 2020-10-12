import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";


const Reporting = (props) => {
  var rainIntensityVal = 0;

  changeOne = () => {
    rainIntensityVal = 1;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeTwo = () => {
    rainIntensityVal = 2;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeThree = () => {
    rainIntensityVal = 3;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeFour = () => {
    rainIntensityVal = 4;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeFive = () => {
    rainIntensityVal = 5;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  var floodLevelVal = 0;

  changeOneF = () => {
    floodLevelVal = 1;
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeTwoF = () => {
    floodLevelVal = 2;
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeThreeF = () => {
    floodLevelVal = 3;
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeFourF = () => {
    floodLevelVal = 4;
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeFiveF = () => {
    floodLevelVal = 5;
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  //Reset
  resetValue = () => {
    floodLevelVal = 0;
    rainIntensityVal = 0;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  const LRainAlert = () =>
    Alert.alert(
      "LIGHT rain intensity selected!",
      "Light rain is blahhhhhhhhh lezgo hahahaahaha anu lalagay ko dito. lorem ipsumm muna kk",
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
      "Medium rain is blahhhhhhhhh lezgo hahahaahaha anu lalagay ko dito. lorem ipsumm muna kk",
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
      "Heavy rain is blahhhhhhhhh lezgo hahahaahaha anu lalagay ko dito. lorem ipsumm muna kk",
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
      "Extremely heavy rain is blahhhhhhhhh lezgo hahahaahaha anu lalagay ko dito. lorem ipsumm muna kk",
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
      "Ankle deep is blahhhhhhhhh lezgo hahahaahaha anu lalagay ko dito. lorem ipsumm muna kk",
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
      "Knee Deep is blahhhhhhhhh lezgo hahahaahaha anu lalagay ko dito. lorem ipsumm muna kk",
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
      "Waist deep is blahhhhhhhhh lezgo hahahaahaha anu lalagay ko dito. lorem ipsumm muna kk",
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
      "Above waist deep is blahhhhhhhhh lezgo hahahaahaha anu lalagay ko dito. lorem ipsumm muna kk",
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
      if(rainIntensityVal == 0 && floodLevelVal == 0){
        alert("Missing rain intensity and flood level data to be reported");
      }
      else if(rainIntensityVal == 0){
        alert("Missing rain intensity data to be reported");
      }
      else if(floodLevelVal == 0){
        alert("Missing flood level data to be reported");
      }
      else{
        console.log("Reported successfully!")
      }
    }

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.contentContainer}>
        <Text
          style={{
            textAlign: "left",
            color: "#fff",
            fontWeight: "bold",
            paddingBottom: 30,
          }}
        >
          REPORTING
        </Text>

        {/*Rain Intensity START*/}

        <Text style={{ textAlign: "left", color: "#fff", fontWeight: "bold" }}>
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

        <Text style={{ textAlign: "left", color: "#fff", fontWeight: "bold" }}>
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
            onPress={() => props.navigation.navigate("ReportHistory")}
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
            onPress={() => checkIfNoReport()}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              REPORT NOW!
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonCancelContainer}>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => resetValue()}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              RESET
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
