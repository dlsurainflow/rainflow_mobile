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

import { MaterialCommunityIcons } from "react-native-vector-icons";
//<View style = {{borderWidth: .5, borderColor: "#BCBCBC", marginHorizontal: 30, marginTop: 10}} />

const UserProfile = (props) => {
  const [username, setUsername] = useState();
  const [accPoints, setAccPoints] = useState();
  const [bodyComponent, setBodyComponent] = useState();
  const [buttonLabel, setButtonLabel] = useState()
  
  const  checkUserSignedIn = async() =>{
    try {
       let value = await AsyncStorage.getItem("username");
       if (value != null){
         console.log("logged in")
         setUsername(value)
         setButtonLabel("Logout")
         
        }
        else {
          console.log("not logged in")
          setButtonLabel("Login")

      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
}
  const  logout = async() =>{
    try {
      await AsyncStorage.removeItem('username');
      console.log("yeh")
      setUsername(undefined)
  }
  catch(exception) {
      return false;
  }
}

  useEffect(()=> {
    console.log("heyyo!")
    checkUserSignedIn()
  }, [])
  return (
    <View style = {{backgroundColor: "#fff", flex: 1}}>
      <View style = {{backgroundColor: "#0E956A", flex: 0.60, justifyContent: "center", padding: 20, justifyContent: "flex-end", alignItems: "center", borderBottomLeftRadius: 170, borderBottomRightRadius: 170}}>
      <View style = {{justifyContent: "center", alignItems: "center", marginTop: 70}}>
      <MaterialCommunityIcons
                name="shield-half-full"
                color="#ffff"
                size={60}
              />
      <Text style = {{fontSize: 30, fontWeight: "bold", color: "#fff"}}>{username ? username : 'Guest'}</Text>
      <Text style = {{fontSize: 16, color: "#fff"}}>0 pts</Text>
        
      </View>
      </View>

      <View style = {{flex:1 ,paddingHorizontal: 20, height: "80%", justifyContent: "flex-start", backgroundColor: "#FFF"}}>
      {username ? 
      (
        <Text style = {{marginTop: 20, fontSize: 14, color: "#434343"}}>You are logged in</Text>
        
      ): (
      <>
      <Text style = {{marginTop: 20, fontSize: 14, color: "#434343"}}>You are currently not logged in.</Text>
      <Text style = {{marginTop: 20, fontSize: 14, color: "#434343"}}>Login to view your report history, as well as submit a report.</Text>
      </>
      )}

    
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {username ? logout() : props.navigation.navigate('Login')}}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              {buttonLabel}
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
    backgroundColor: "#0E956A",
  },

  buttonContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
   // backgroundColor: "#434343",
    alignSelf: "center",
   bottom: 15,
   padding: 20,
   position: "absolute"
  },
});

export default UserProfile;
