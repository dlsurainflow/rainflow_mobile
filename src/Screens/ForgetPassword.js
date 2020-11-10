import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Image,
  BackHandler
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

const ForgetPassword = (props) => {
  const [textInputHandler, setTextInputHandler] = useState({});
  const [email, setEmail] = useState("");

  const emailHandler = (e) => {
    setEmail(e);
  };

  useEffect(() => {
    const backAction = () => {
      props.navigation.navigate("MainMenu", {screen: 'UserProfile'});
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });


  const forgetPassHandler = () => {

    fetch("https://rainflow.live/forgot-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
          email: email, 
        }),
    }).then(function (response) {
      if (response.status === 400) {
        
      } else if (response.status === 200) {
        
      } else {
       
      }
    });
    props.navigation.navigate("MainMenu", {screen: 'UserProfile'});

  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.contentContainer}>
         <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/Logo.png")}
            style={{ height: "38%", width: "90%" }}
          />
        </View> 

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email Address"
            style={styles.textInput}
            onChangeText={emailHandler}
          />
          
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => forgetPassHandler()}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Send Email
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
    backgroundColor: "#3d3d3d",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

  contentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3d3d3d",
    paddingHorizontal: 30,
  },

  logoContainer: {
    flex: 1.1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#3d3d3d",
    paddingBottom: 40,
  },

  inputContainer: {
    flex: 0.5,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#3d3d3d",
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
    backgroundColor: "#3d3d3d",
    paddingHorizontal: 5,
    paddingTop: 20,
  },
});

export default ForgetPassword;
