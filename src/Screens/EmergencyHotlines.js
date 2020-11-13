import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const EmergencyHotlines = (props) => {

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}> 

          <View style = {styles.userHeader}>
                <Text style = {styles.userText}>Emergency Hotlines</Text>
                <Text style = {styles.userText2}>If you are in need of help or rescue, please contact any of the following emergency hotlines.</Text>
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
userText2: {
  color: "#fff", 
  fontSize: 13,
  textAlign: "center",
  paddingHorizontal: 15,
  marginTop: 5,
},

userHeader: {
  flexDirection: "column", 
  width: "100%", 
  backgroundColor: "#47b28a", 
  height: 190, 
  justifyContent: "center", 
  alignItems: "center", 
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

export default EmergencyHotlines;
