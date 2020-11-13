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

          <View style = {styles.userHeader}>
                <Text style = {styles.userText}>Emergency Hotlines</Text>
                <Text style = {styles.userText2}>If you are in need of help or rescue, please contact any of the following emergency hotlines.</Text>
          </View>
          <ScrollView style = {{width : "100%", paddingHorizontal: 15}} showsVerticalScrollIndicator={false}> 
              <View style={styles.cardContainer}>
              <View style = {{flexDirection: "row", alignItems: "center", alignSelf: "center", width: "95%", borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: "#BCBCBC", paddingVertical: 20, marginHorizontal: 15}}>
                 <Text style = {styles.dateText}>National Disaster Risk Reduction and Management Council (NDRRMC)</Text>
                 </View>   
                <View style = {styles.cardContent}>
                    <Text style = {{fontWeight: "bold"}}>Trunk Lines:</Text>
                    <View style = {{flexDirection: "column", marginTop: 5}}>
                    <Text>(02) 8911-5061 to 65 local 100 </Text>
                    </View>

                    <Text style = {{marginTop: 15, fontWeight: "bold"}}>Operations Center:</Text>
                    
                    <View style = {{flexDirection: "column", marginTop: 5}}>
                    <Text>(02) 8911-1406</Text>
                    <Text>(02) 8912-2665</Text>
                    <Text>(02) 8912-5668</Text>
                    <Text>(02) 8911-1873</Text>
                    </View>
                </View>
                </View>
              
              
              <View style={styles.cardContainer}>
              <View style = {{flexDirection: "row", alignItems: "center", alignSelf: "center", width: "95%", borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: "#BCBCBC", paddingVertical: 20, marginHorizontal: 15}}>
                 <Text style = {styles.dateText}>Philippine Coast Guard</Text>
                 </View>   
                <View style = {styles.cardContent}>
                    <Text style = {{fontWeight: "bold"}}>Hotlines: </Text>
                    
                    <View style = {{flexDirection: "column", marginTop: 5}}>
                    <Text>(02) 8527-8481 to 89</Text>
                    <Text>(02) 8527-3877</Text>
                    </View>
                    <Text style = {{marginTop: 15, fontWeight: "bold"}}>Text Hotline: </Text>
                    
                    <View style = {{flexDirection: "column", marginTop: 5}}>
                    <Text>0917-PCG-DOTC (0917-724-3682)</Text>
                    <Text>0918-967-4697</Text>
                    </View>
                </View>
                </View>

              <View style={styles.cardContainer2}>
              <View style = {{flexDirection: "row", alignItems: "center", alignSelf: "center", width: "95%", borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: "#BCBCBC", paddingVertical: 20, marginHorizontal: 15}}>
                 <Text style = {styles.dateText}>Red Cross</Text>
                 </View>   
                <View style = {styles.cardContent}>
                    <Text style = {{fontWeight: "bold"}}>Hotlines: </Text>
                    
                    <View style = {{flexDirection: "column", marginTop: 5}}>
                    <Text>145</Text>
                    <Text>(02) 8527-8385 to 95</Text>
                    </View>
                    
                    <Text style = {{marginTop: 15, fontWeight: "bold"}}>Trunk Line: </Text>
                    <View style = {{flexDirection: "column", marginTop: 5}}>
                    <Text>(02) 8790-2300</Text>
                    </View>

                    <Text style = {{marginTop: 15, fontWeight: "bold"}}>Disaster Management Office: </Text>
                    <View style = {{flexDirection: "column", marginTop: 5}}>
                    <Text>134 (Staff), 132 (Manager), 133 (Radio Room)</Text>
                    </View>
                    
                    <Text style = {{marginTop: 15, fontWeight: "bold"}}>Emergency Response Unit: </Text>
                    <View style = {{flexDirection: "column", marginTop: 5}}>
                    <Text>(02) 8790-2300 local 604)</Text>
                    </View>

                    <Text style = {{marginTop: 15, fontWeight: "bold"}}>National Blood Center: </Text>
                    <View style = {{flexDirection: "column", marginTop: 5}}>
                    <Text>(02) 8527-0000</Text>
                    </View>
                </View>
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
},

cardContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    height: "auto",
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#bcbcbc",
    marginTop: 15
  },
cardContainer2: {
    display: 'flex',
    backgroundColor: '#fff',
    height: "auto",
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#bcbcbc",
    marginTop: 15,
    marginBottom: 15
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: "flex-start",
    padding: 10,
    width: "100%"
  },

  dateText: {
      //backgroundColor: "#1EA78C",
      //paddingVertical: 5,
      //paddingHorizontal: 10,
      //borderRadius: 30,
      color: "#3d3d3d",
      textAlign: "center",
      fontWeight: "bold",
      width: "100%",
      marginBottom: 20,
      fontSize: 16,
      textAlignVertical: "center"
  },

  latLongText: {
      backgroundColor: "#1EA78C",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 30,
      color: "#fff",
      textAlign: "center"
  },

  rainText: {
      borderRadius: 30, 
      paddingVertical: 1, 
      paddingHorizontal: 8, 
      backgroundColor: "#1EA78C", 
      color: "#fff"},

    floodText: {
        borderRadius: 30, 
        paddingVertical: 1, 
        paddingHorizontal: 8, 
        backgroundColor: "#0E956A", 
        color: "#fff"}
  
});

export default EmergencyHotlines;
