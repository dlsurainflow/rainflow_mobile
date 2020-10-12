import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { WebView } from "react-native-webview";

const Signup = (props) => {
  const [textInputHandler, setTextInputHandler] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  checkSamePass = () => {
    if (password == rpassword) {
      console.log("Passwords matched!");
      props.navigation.navigate("Login");
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
    flex: 1,
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
    backgroundColor: "#005DBE",
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
