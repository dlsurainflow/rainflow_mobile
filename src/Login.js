import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  BackHandler
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

const Login = (props) => {
  const [textInputHandler, setTextInputHandler] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const usernameHandler = (e) => {
    setUsername(e);
  };
  const passwordHandler = (e) => {
    setPassword(e);
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
          email: username, 
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
            await AsyncStorage.setItem("email", responseJson.data.email); // Save email
            await AsyncStorage.setItem("points", JSON.stringify(responseJson.data.points)); // Save points
            await AsyncStorage.setItem("userID", JSON.stringify(responseJson.data.userID)); // Save userID
            if(responseJson.data.badge !== null){
              await AsyncStorage.setItem("badge", responseJson.data.badge); // Saves user badge
            }   
            await AsyncStorage.setItem("dateCreated", responseJson.data.createdAt); // Saves date when user joined
            ToastAndroid.show(
              "Welcome, " + responseJson.data.username + "!",
              ToastAndroid.SHORT
            )
            props.navigation.push("MainMenu", { screen: 'HomeMap' })
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert(response.status);
        ToastAndroid.show("Error: " + response.status, ToastAndroid.SHORT);
        console.log("Error: ", response.status);
      }
      //props.navigation.navigate("MainMenu", {screen: 'HomeMap'});
    });


  };

  return (
    <KeyboardAvoidingView style={styles.backgroundContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/Logo.png")}
            style={{ height: "38%", width: "100%" ,resizeMode: "contain"}}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={usernameHandler}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={passwordHandler}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => loginHandler()}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white", paddingTop: 15 }}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text style={{ color: "#27B296", paddingTop: 15 }}>
                Register now!
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white", paddingTop: 15 }}>
              Forgot password?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("ForgetPassword")}
            >
              <Text style={{ color: "#27B296", paddingTop: 15 }}>
                Click here!
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </KeyboardAvoidingView>
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

export default Login;
