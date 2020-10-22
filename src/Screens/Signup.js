import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler
} from "react-native";

import { WebView } from "react-native-webview";
//import SHA256 from "react-native-crypto-js";
import { sha256 } from "react-native-sha256";

const Signup = (props) => {
  const [textInputHandler, setTextInputHandler] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordc, setPasswordC] = useState("");
  const [rpassword, setrPassword] = useState("");
  const [email, setEmail] = useState("");

  const usernameHandler = (e) => {
    setUsername(e);
  };
  const passwordHandler = (e) => {
    setPassword(e);
  };
  const rpasswordHandler = (e) => {
    setrPassword(e);
  };
  const emailHandler = (e) => {
    setEmail(e);
  };

  useEffect(() => {
    const backAction = () => {
      props.navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  const convertSHA = async() => {
    var passwordEncrypted = await sha256(password);
    setPasswordC(passwordEncrypted);
    //submitDeets();
  }

  const submitDeets = () => {
    sha256(password).then( hash => {
      console.log(hash);
    })
    fetch("https://dashboard.rainflow.live/api/v1/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyAddress: "",
        companySize: "",
        contactPerson: "",
        email: email,
        password: passwordc,
        password2: password,
        phone: "",
        tenantType: 1,
        username: username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
          //console.log("Error: " + response)
        }
        console.log(response.json().then((data) => console.log(data)));
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  };


  const checkSamePass = () => {
    if (password == rpassword) {
      console.log("Passwords matched!");
      convertSHA();
    } else {
      alert("Passwords do not match!");
    }
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
            placeholder="Email"
            style={styles.textInput}
            onChangeText={emailHandler}
          />
          <TextInput
            placeholder="Username"
            style={styles.textInput}
            onChangeText={usernameHandler}
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            onChangeText={passwordHandler}
          />
          <TextInput
            placeholder="Repeat Password"
            style={styles.textInput}
            onChangeText={rpasswordHandler}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => checkSamePass()}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white", paddingTop: 15 }}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={{ color: "#27B296", paddingTop: 15 }}>
                Click here to login!
              </Text>
            </TouchableOpacity>
          </View>
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
    
    width: "100%",
    justifyContent: "center",
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

export default Signup;
