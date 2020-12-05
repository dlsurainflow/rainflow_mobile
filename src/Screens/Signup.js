import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
} from "react-native";
// import { WebView } from "react-native-webview";
//import SHA256 from "react-native-crypto-js";
// import { sha256 } from "react-native-sha256";
import * as Crypto from "expo-crypto";

const Signup = (props) => {
  const [textInputHandler, setTextInputHandler] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setrPassword] = useState("");
  const [email, setEmail] = useState("");

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

  const submitDeets = async () => {
    if (password !== rpassword) {
      alert("Passwords do not match!");
    } else {
      console.log("Password: ", password);
      // var hashedPassword;
      // sha256(password).then((hash) => {
      //   console.log(hash);
      //   hashedPassword = hash;
      //   // setPasswordC(hash);
      // });
      var hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
      // await sha256("Test").then((hash) => {
      //   console.log(hash);
      // });
      console.log("Email: ", email);
      console.log("Password: ", hashedPassword);
      console.log("Password2: ", password);
      console.log("Username: ", username);
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
          password: hashedPassword,
          password2: password,
          phone: "",
          tenantType: 1,
          username: username,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
            // alert("Passwords do not match!");
          }
          console.log(response.json().then((data) => console.log(data)));
          alert("Signed up succesfully! Please sign in.");
          props.navigation.navigate("Login");
        })
        .catch((error) => {
          if(error == "Error: 400")
            alert("Already have an account. Please login.");
          else if(error == "Error: 422")
            alert("Invalid signup details.");
          else
          console.log("ERROR: " + error);
        });
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          
          <Image
            source={require("../../assets/Logo.png")}
            style={{ height: "38%", width: "90%",resizeMode: "contain"}}
            visible={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            // onChangeText={emailHandler}
            onChangeText={(e) => setEmail(e)}
          />
          <TextInput
            placeholder="Username"
            style={styles.textInput}
            onChangeText={(e) => setUsername(e)}
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
          />
          <TextInput
            placeholder="Repeat Password"
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={(e) => setrPassword(e)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={submitDeets}>
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
    position: "relative",
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
