import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

const UserProfile = (props) => {
  const [textInputHandler, setTextInputHandler] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (e) => {
    setUsername(e);
  };
  const passwordHandler = (e) => {
    setPassword(e);
  };

  const loginHandler = () => {
    const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");
    RCTNetworking.clearCookies((result) => {
      console.log(result); //true if successfully cleared
    });


    fetch("https://rainflow.live/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
          username: username, 
          password: password
        }),
    }).then(function (response) {
      if (response.status === 400) {
        // Error if username/password is invalid
        response.json().then(function (object) {
          alert("Invalid username or password!");
          console.log("400: ", object.non_field_errors);
        });
      } else if (response.status === 200) {
        // Correct username and password
        response
          .json()
          .then(async (responseJson) => {
            console.log(responseJson);
            await AsyncStorage.setItem("token", responseJson.data.token); // Save token to storage
            await AsyncStorage.setItem("username", responseJson.data.username); // Save username

            ToastAndroid.show(
              "Welcome, " + responseJson.data.username + "!",
              ToastAndroid.SHORT
            )
            //props.navigation.navigate("Main Menu");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert(response.status);
        ToastAndroid.show("Error: " + response.status, ToastAndroid.SHORT);
        console.log("Error: ", response.status);
      }
    });


  };

  return (
    <View>
      <Text style = {{paddingVertical: 50}}>User profile - TBU</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Login
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
    backgroundColor: "#1EA78C",
  },

  buttonContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
   // backgroundColor: "#434343",
    paddingHorizontal: 5,
    paddingTop: 20,
  },
});

export default UserProfile;
