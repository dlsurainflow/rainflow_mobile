import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { ColorDotsLoader } from 'react-native-indicator';
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { List } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";

const UserProfile = (props) => {
  const [username, setUsername] = useState();
  const [accPoints, setAccPoints] = useState();
  const [showLoading, setShowLoading] = useState(false)
  const [buttonLabel, setButtonLabel] = useState()
  const [headerComponent, setHeaderComponent] = useState()
  const [bodyComponent, setBodyComponent] = useState()
  
  const  checkUserSignedIn = async() =>{
    try {
       let un = await AsyncStorage.getItem("username");
       let pts = await AsyncStorage.getItem("points");
       let badgeImage = await AsyncStorage.getItem("badge");
  
       if (un != null){
         setUsername(un)
         setButtonLabel("Logout")
         setHeaderComponent(
          <>
            <View style = {{borderRadius: 100, paddingVertical: 9, paddingHorizontal: 15, borderColor: "#fff", backgroundColor: "#fff"}}>
            {badgeImage !== null ? (
              <Image style={{height: 60, width: 50, alignSelf: "center"}} source={{uri:`https://rainflow.live/api/images/badges/${badgeImage}`}} />
            ): (
              <MaterialCommunityIcons
                            name="shield-half-full"
                            color="#0E956A"
                            size={60}
                          />
            )}
            </View>
            <Text style = {styles.userText}>{un}</Text>
            <View style = {{paddingTop: 10, width: "100%", flexDirection: "row",}}>
              <Text style = {styles.pointsText}>{pts} pts</Text>
            </View>
          </>
         )

         setBodyComponent(
          <ScrollView showsVerticalScrollIndicator = {false}>
          <List.Item
          onPress = {()=> props.navigation.navigate("Dashboard")}   
            titleStyle = {{fontSize: 15}} 
            style = {styles.listItem} 
            descriptionStyle = {{fontSize: 12}} 
            title="Dashboard" 
            description="Monitor your RAFT device"
          />

          <List.Item  
            onPress = {()=> props.navigation.navigate("ReportHistory")} 
            titleStyle = {{fontSize: 15}} 
            style = {styles.listItem} 
            descriptionStyle = {{fontSize: 12}} 
            title="Report History" 
            description="View a history of all the reports you've submitted"
            />

          <List.Item
            onPress = {()=> props.navigation.navigate("Active Reports")}  
            titleStyle = {{fontSize: 15}} 
            style = {styles.listItem} 
            descriptionStyle = {{fontSize: 12}} 
            title="Active Reports" description="View list of active reports"
            />          

          <List.Item  
            onPress = {()=> props.navigation.navigate("Account Info")}
            titleStyle = {{fontSize: 15}} style = {styles.listItem} 
            descriptionStyle = {{fontSize: 12}} title="Account Information" 
            description="View your account details"
            />

          <List.Item  
            onPress = {()=> props.navigation.navigate("Badge Index")} 
            titleStyle = {{fontSize: 15}} style = {styles.listItem} 
            descriptionStyle = {{fontSize: 12}} 
            title="Badge Index" 
            description="A complete list of user badges and how to earn points"
            />

          <List.Item  
            onPress = {()=> props.navigation.navigate("About Us")} 
            titleStyle = {{fontSize: 15}} 
            descriptionStyle = {{fontSize: 12}} 
            title="About RainFLOW" 
            description="Learn more about user privileges and our team"
            />


        </ScrollView>
         )
        }
        else {
          setButtonLabel("Login")
          setHeaderComponent(
            <>
                <View style = {{borderRadius: 100, padding: 8, borderColor: "#fff", backgroundColor: "#fff"}}>
                  <MaterialCommunityIcons
                            name="shield-half-full"
                            color="#0E956A"
                            size={60}
                          />
                </View>
                <Text style = {styles.userText}>Guest</Text>
                <View style = {{paddingTop: 10, width: "100%", flexDirection: "row",}}>
                  <Text style = {styles.pointsText}>0 pts</Text>
                </View>
            </>
           )
          setBodyComponent(
            <View style = {{paddingHorizontal: 10}}>
              <Text style = {styles.bodyText2}>You are currently not logged in.</Text>
              <Text style = {styles.bodyText}>Login to view your report history, as well as submit a report.</Text>
              <Text style = {styles.bodyText}>To know more about our authenticated user privileges and our team, go to: </Text>
              <TouchableOpacity onPress= {()=>{props.navigation.navigate("About Us")}} style = {{marginVertical: 10, alignItems: "center"}}>
                <Text style = {{textAlign: "center", color: "#0E956A", fontWeight: "bold", fontSize: 16}}>About RainFLOW</Text>
              </TouchableOpacity>
            </View>
          )

      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
}
  const  logOut = async() =>{
    try {
      setShowLoading(true)
      setTimeout(async() => {
        setShowLoading(false)
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('points');
        await AsyncStorage.removeItem('token');
        setUsername(undefined)
        setAccPoints(undefined)
        setButtonLabel("Login")
        setHeaderComponent(
          <>
            <View style = {{borderRadius: 100, padding: 8, borderColor: "#fff", backgroundColor: "#fff"}}>
              <MaterialCommunityIcons
                        name="shield-half-full"
                        color="#0E956A"
                        size={60}
                      />
            </View>
            <Text style = {styles.userText}>Guest</Text>
            <View style = {{paddingTop: 10, width: "100%", flexDirection: "row",}}>
              <Text style = {styles.pointsText}>0 pts</Text>
            </View>
          </>
         )
        setBodyComponent(
          <View style = {{paddingHorizontal: 10}}>
              <Text style = {styles.bodyText2}>You are currently not logged in.</Text>
              <Text style = {styles.bodyText}>Login to view your report history, as well as submit a report.</Text>
              <Text style = {styles.bodyText}>To know more about our authenticated user privileges and our team, go to: </Text>
              <TouchableOpacity onPress= {()=>{props.navigation.navigate("About Us")}} style = {{marginVertical: 10, alignItems: "center"}}>
                <Text style = {{textAlign: "center", color: "#0E956A", fontWeight: "bold", fontSize: 16}}>About RainFLOW</Text>
              </TouchableOpacity>
            </View>
        )
        ToastAndroid.show(
          "Welcome, guest!",
          ToastAndroid.SHORT
        )
        props.navigation.navigate("HomeMap")
      }, 3000);



  }
  catch(exception) {
      return false;
  }
}

const logoutHandler = () =>{
    return Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => logOut() },
      ],
      { cancelable: false }
    );
  
  
}

  useEffect(()=> {
    checkUserSignedIn()
  }, [])

  
  return (
    <View style = {styles.backgroundContainer}>
      <View style = {styles.headerContainer}>
      <View style = {styles.headerInfo}>
          {headerComponent}
      </View>
      </View>

      <View style = {styles.bodyContainer}>
      {bodyComponent}
      </View>

      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {username ? logoutHandler() : props.navigation.navigate('Login')}}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              {buttonLabel}
            </Text>
          </TouchableOpacity>
   
        </View> 

          {showLoading ? (
            <View style = {styles.loadingContainer}>
            <ColorDotsLoader size = {30} color1 = {"#4FC69A"} color2 = {"#1EA78C"} color3 = {"#0E956A"} /> 
            <Text style = {{fontWeight: "bold", color : "#434343"}}>Loading</Text>       
            </View>
          ) : null}
        <Text style={{textAlign:"right", fontSize: 10, marginRight: 5}}>
          V 1.0.0.6
        </Text>
          
    </View>
  );
};

const styles = StyleSheet.create({

  backgroundContainer: {
    backgroundColor: "#fff", 
    flex: 1,

  },
 headerContainer: {
  backgroundColor: "#0E956A", 
  flex: 0.65, 
  justifyContent: "center", 
  padding: 20, 
  justifyContent: "flex-end", 
  alignItems: "center", 


 },

 headerInfo: {
  justifyContent: "center", 
  alignItems: "center", 
  marginTop: 70
 },

 userText:{
  fontSize: 30, 
  fontWeight: "bold", 
  color: "#fff"
 },

 pointsText:{
  fontSize: 12, 
  fontWeight: "bold",
  backgroundColor: "#fff",
  color: "#0E956A",
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 30,
  marginHorizontal: 5,

 },
 button: {
  width: "80%",
  height: 45,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  borderRadius: 30,
  backgroundColor: "#0E956A",
  flexDirection: "row",
  marginVertical: 15,
},

buttonContainer: {
  width: "100%",
  alignItems: "center",
  alignSelf: "center",
  paddingHorizontal: 5,
  
},

 bodyContainer: {
  flex:1,
  paddingHorizontal: 10, 
  height: "80%", 
  justifyContent: "flex-start", 
  backgroundColor: "#FFF",
 },

 bodyText: {
  marginTop: 20, 
  fontSize: 14, 
  color: "#434343",
  textAlign: "justify"
 },

 bodyText2: {
  marginTop: 20, 
  fontSize: 14, 
  color: "#434343",
  textAlign: "justify",
  fontWeight: "bold"
 },

 loadingContainer: {
  flex:1, 
  height: "100%", 
  width: "100%",
  flexDirection: "column", 
  alignItems: "center", 
  justifyContent: "center", 
  position: "absolute",
  paddingTop: Platform.OS === "android" ? 25 : 0,
 },

 listItem: {
  borderBottomWidth: 0.5, 
  borderBottomColor: "#bcbcbc", 
  paddingVertical: 10
 }
});

export default UserProfile;
