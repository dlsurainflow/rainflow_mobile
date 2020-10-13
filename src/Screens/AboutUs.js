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

          <View style = {{flexDirection: "column", width: "100%", backgroundColor: "#1EA78C", height: 140, justifyContent: "center", alignItems: "center",}}>
                <MaterialCommunityIcons
                        name="account-group"
                        color="#ffff"
                        size={55}
                        />

                <Text style = {{fontWeight:"bold", color: "#fff", fontSize: 25}}> OUR TEAM</Text>
          </View>
          <View style = {{paddingHorizontal: 10, paddingVertical: 5}}>
          <Text style ={{textAlign: "justify", color: "#3d3d3d", marginBottom: 20, fontSize: 14, }}>We are a team of dedicated Computer Engineering students from De La Salle University who believe that modern problems require modern solutions.</Text>
          </View>
            <View style = {{alignItems: "center"}}>
                
                    <MaterialCommunityIcons
                                    name="record"
                                    color="#3d3d3d"
                                    size={20}
                                    />
                                
                    <MaterialCommunityIcons
                                    name="record"
                                    color="#3d3d3d"
                                    size={20}
                                    />
                   
                                
            </View>
                
            <Text style = {{color: "#1EA78C", fontWeight: "bold", fontSize: 20, textAlign: "center", margin: 25, fontStyle: "italic"}} >We believe in technological innovations.</Text>
        
            <View style = {{flexDirection: "column", width: "100%", backgroundColor: "#0E956A", height: 140, justifyContent: "center", alignItems: "center", marginTop: 20}}>
               <View style = {{flexDirection: "row"}}>
                   
                <MaterialCommunityIcons
                        name="cogs"
                        color="#ffff"
                        size={55}
                    />
               </View>

                <Text style = {{fontWeight:"bold", color: "#fff", fontSize: 25}}> OUR MISSION</Text>
          </View>
          <View style = {{paddingHorizontal: 10, paddingVertical: 5}}>
             <Text style ={{textAlign: "justify", color: "#3d3d3d", marginBottom: 20, fontSize: 14 }}>The inavailability of reliable rain and flood watch sources impedes many Filipinos' commutes. Often, they are unable to avoid heavy traffic caused by flooded roads, causing them to be late for work or school.</Text>
             <Text style ={{textAlign: "justify", color: "#3d3d3d", marginBottom: 20, fontSize: 14 }}>As university students, we experienced firsthand how the lack of flood monitoring in the country impacts our daily lives. </Text>
             <Text style ={{textAlign: "justify", color: "#3d3d3d", marginBottom: 20, fontSize: 14 }}>With RainFLOW, we plan on making rain and flood information easily accessible to the public through our crowdsourced Internet of Things (IoT) network.</Text>
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

  
});

export default ReportHistory;
