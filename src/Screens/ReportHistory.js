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
import AsyncStorage from "@react-native-community/async-storage";
import { Appbar } from 'react-native-paper';
import ReportCard from '../components/ReportCard'

const ReportHistory = (props) => {

  const [reportsList, setReportsList] = useState()
  const [historyBody, setHistoryBody] = useState()

  const getReports = async() => {

    const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");
    RCTNetworking.clearCookies((result) => {
    //console.log(result); //true if successfully cleared
    });

    const userID = await AsyncStorage.getItem("userID")
    const token = await AsyncStorage.getItem("token")

    await fetch(`https://rainflow.live/api/report/user/${userID}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
          'Authorization' :  `Bearer ${token}`
      }
      }).then(response => {
        if(response.status == 200)
          response.json().then( (data) => {setReportsList(data)});
        else{
          Alert.alert(
            'Error retrieving reports! (Code: ' + response.status + ')');
        }
      })
  }

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

  useEffect(() => {
    if(reportsList == undefined){
      getReports()
    } else {
      console.log("FOUND REPORTS: ", reportsList)
      if(reportsList.length == 0){
          setHistoryBody(
            <View>
              <Text>You have not submitted any reports.</Text>
            </View>
          )
      }else{
        setHistoryBody(
          reportsList.map(data =>{
            return(
              <ReportCard 
                key = {data.id}
                createdAt = {data.createdAt}
                latitude = {data.latitude}
                longitude = {data.longitude}
                rain = {data.rainfall_rate}
                flood = {data.flood_depth}
                image = {data.image}
                id = {data.id}
                 />
            )
          })
        )
        }
    }
  }, [reportsList]);


  return (
    <View style={styles.backgroundContainer}>
      <Appbar.Header style = {{backgroundColor: "#0E956A"}}>
      <Appbar.BackAction onPress={()=> props.navigation.navigate("UserProfile")} />
      <Appbar.Content title="Report History" titleStyle= {{fontSize: 15}} subtitle="All the reports you've ever submitted" subtitleStyle={{fontSize: 12}}/>
    </Appbar.Header>
      <View style={styles.contentContainer}>
        <ScrollView style = {{width: "100%"}} showsVerticalScrollIndicator = {false}>
        {historyBody}
        </ScrollView>
      </View>
    </View>
  );
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
    padding: 15
  },

  rbuttonContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  logoContainer: {
    flex: 1.5,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#434343",
    paddingBottom: 0,
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

  buttonCancel: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#434343",
    borderWidth: 2,
    borderColor: "#1EA78C",
  },

  buttonContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "#434343",
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 20,
  },

  buttonCancelContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "#434343",
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 20,
  },
});

export default ReportHistory;
