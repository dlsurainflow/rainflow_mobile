import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
  ScrollView
} from "react-native";
import { Appbar } from 'react-native-paper';
import { MaterialCommunityIcons } from "react-native-vector-icons";

const ReportHistory = (props) => {

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



  return (
    <View style={styles.backgroundContainer}>
      <Appbar.Header style = {{backgroundColor: "#0E956A"}}>
      <Appbar.BackAction onPress={()=> props.navigation.navigate("UserProfile")} />
      <Appbar.Content title="About DLSUrainflow" titleStyle= {{fontSize: 15}} subtitle="User privileges and our team" subtitleStyle={{fontSize: 12}}/>
    </Appbar.Header>
      <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}> 

          <View style = {styles.userHeader}>
               <View style = {{flexDirection: "row"}}>
                   
                <MaterialCommunityIcons
                        name="account-multiple"
                        color="#fff"
                        size={55}
                    />
               </View>

                <Text style = {styles.userText}> USER PRIVILEGES</Text>
          </View>
          <View style = {styles.privilegesContainer}>
            <View style = {{paddingHorizontal: 10, paddingVertical: 5}}>
              <Text style={styles.boldText}>As a Guest, you can: </Text>
              <Text style = {styles.listItem}>- View the RainFLOW map and nodes containing reports from RAFT devices and other mobile users</Text>
              <Text style = {styles.listItem}>- Receive push notifications when you are near a marker with high rain and flood readings</Text>
              <View style = {styles.divider} />
              <Text style={styles.boldText}>As an Authenticated User, you can:  </Text>
              <Text style = {styles.listItem}>- View the RainFLOW map and nodes containing reports from RAFT devices and other mobile users</Text>
              <Text style = {styles.listItem}>- Receive push notifications when you are near a marker with high rain and flood readings</Text>
              <Text style = {styles.listItem}>- Submit flood reports and view your report history</Text>
              <Text style = {styles.listItem}>- Upvote/downvote reports made by other users</Text>
              <Text style = {styles.listItem}>- Earn points to upgrad your badge when your reports receives a high number of upvotes</Text>
              <Text style = {styles.listItem} >- Register your own RAFT device and monitor its status</Text>
            </View>
          </View>

          <View style = {styles.teamHeader}>
                <MaterialCommunityIcons
                        name="shape-plus"
                        color="#ffff"
                        size={55}
                        />

                <Text style = {{fontWeight:"bold", color: "#fff", fontSize: 25}}> OUR TEAM</Text>
          </View>
          <View style = {{paddingHorizontal: 10, paddingVertical: 5}}>
          <Text style ={styles.paragraph}>We are a team of dedicated Computer Engineering students from De La Salle University who believe that modern problems require modern solutions.</Text>
          </View>
            <View style = {{alignItems: "center"}}>
                
                    <MaterialCommunityIcons
                                    name="record"
                                    color="#c0c0c0"
                                    size={20}
                                    />
                                
                    <MaterialCommunityIcons
                                    name="record"
                                    color="#c0c0c0"
                                    size={20}
                                    />
                   
                                
            </View>
                
            <Text style = {styles.teamQuote} >We believe in technological innovations.</Text>
        
            <View style = {styles.missionHeader}>
               <View style = {{flexDirection: "row"}}>
                   
                <MaterialCommunityIcons
                        name="lightbulb"
                        color="#ffff"
                        size={55}
                    />
               </View>

                <Text style = {styles.missionText}> OUR MISSION</Text>
          </View>
          <View style = {{paddingHorizontal: 10, paddingVertical: 5}}>
             <Text style = {styles.paragraph}>The inavailability of reliable rain and flood watch sources impedes many Filipinos' commutes. Often, they are unable to avoid heavy traffic caused by flooded roads, causing them to be late for work or school.</Text>
             <Text style = {styles.paragraph} >As university students, we experienced firsthand how the lack of flood monitoring in the country impacts our daily lives. </Text>
             <Text style =  {styles.paragraph} >With RainFLOW, we plan on making rain and flood information easily accessible to the public through our crowdsourced Internet of Things (IoT) network.</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  )
 
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
   marginTop: Platform.OS === "android" ? 25 : 0,
  },

  contentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
paragraph: {
  textAlign: "center", 
  color: "#3d3d3d", 
  marginBottom: 20, 
  fontSize: 14,
},

missionText: {
  fontWeight:"bold", 
  color: "#fff", 
  fontSize: 25
},

userText: {
  fontWeight:"bold", 
  color: "#fff", 
  fontSize: 25
},

teamHeader: {
  flexDirection: "column", 
  width: "100%", 
  backgroundColor: "#c0c0c0", 
  height: 140, 
  justifyContent: "center", 
  alignItems: "center",
},

teamQuote: {
  color: "#1EA78C", 
  fontWeight: "bold", 
  fontSize: 20, 
  textAlign: "center", 
  marginHorizontal: 25, 
  marginTop: 25,
  marginBottom: 10,
  fontStyle: "italic"
},

missionHeader: {
  flexDirection: "column", 
  width: "100%", 
  backgroundColor: "#0E956A", 
  height: 140, 
  justifyContent: "center", 
  alignItems: "center", 
  marginTop: 20
},

userHeader: {
  flexDirection: "column", 
  width: "100%", 
  backgroundColor: "#1EA78C", 
  height: 140, 
  justifyContent: "center", 
  alignItems: "center", 
},

privilegesContainer: {
  paddingHorizontal: 10, 
  paddingVertical: 2,
  marginBottom: 10
},

divider : {
  borderWidth: 0.75, 
  borderColor: "#dedede", 
  marginVertical: 10
},

boldText : {
  fontSize: 16, 
  fontWeight: "bold"
},

listItem: {
  marginLeft: 5, 
  marginVertical: 5
}
  
});

export default ReportHistory;
