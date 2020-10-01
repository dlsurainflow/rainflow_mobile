//import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

//import { WebView } from "react-native-webview";

const Signup = (props) => {
  return <View></View>;
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
    backgroundColor: "#005DBE",
  },

  buttonContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#434343",
    paddingHorizontal: 5,
    paddingTop: 20,
  },
});

export default Signup;
