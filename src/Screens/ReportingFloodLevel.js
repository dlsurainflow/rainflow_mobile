import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { RadioButton } from "react-native-paper";

const RreportingFloodLevel = (props) => {
  const [checked, setChecked] = React.useState("first");
  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.contentContainer}>
        {/* 
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/Logo.png")}
            style={{ height: "35%", width: "110%" }}
          />
        </View>
        */}
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
          FLOOD LEVEL
        </Text>

        <View style={styles.rbuttonContainer}>
          <RadioButton
            value="first"
            status={checked === "first" ? "checked" : "unchecked"}
            onPress={() => setChecked("first")}
            text={"Hi"}
          />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Item 1</Text>
          <RadioButton
            value="second"
            status={checked === "second" ? "checked" : "unchecked"}
            onPress={() => setChecked("second")}
          />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Item 2</Text>
          <RadioButton
            value="third"
            status={checked === "third" ? "checked" : "unchecked"}
            onPress={() => setChecked("third")}
          />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Item 3</Text>
          <RadioButton
            value="fourth"
            status={checked === "fourth" ? "checked" : "unchecked"}
            onPress={() => setChecked("fourth")}
          />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Item 4</Text>
          <RadioButton
            value="fifth"
            status={checked === "fifth" ? "checked" : "unchecked"}
            onPress={() => setChecked("fifth")}
          />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Item 5</Text>
        </View>

        {/*Rain Intensity END*/}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("Reporting - Rain Intensity")}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              CONTINUE
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonCancelContainer}>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => console.log('CANCEL')}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              CANCEL
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
    backgroundColor: "#1EA78C",
  },

  buttonCancel: {
    width: "100%",
    height: 45,
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

export default RreportingFloodLevel;
