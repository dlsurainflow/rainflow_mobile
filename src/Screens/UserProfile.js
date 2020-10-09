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

//<View style = {{borderWidth: .5, borderColor: "#BCBCBC", marginHorizontal: 30, marginTop: 10}} />
const UserProfile = (props) => {
  return (
    <View style = {{paddingTop: 25, backgroundColor: "#fff"}}>
      <View style = {{paddingHorizontal: 30, paddingVertical:40,  backgroundColor: "#DEDEDE", flex: 1, justifyContent: "center"}}>
      <Text style = {{fontWeight: "bold", fontSize: 30}}>Guest</Text>
        </View> 
      <View style = {{padding: 40, height: "70%", justifyContent: "flex-start", backgroundColor: "#FFF"}}>
      <Text style = {{fontSize: 16}}>You are currently not logged in. Login to view your report history, as well as submit a report.</Text>
        </View> 
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default UserProfile;
