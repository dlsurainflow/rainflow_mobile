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
import { Appbar, Modal, Portal, Provider } from 'react-native-paper';
import ReportCard from '../components/ReportCard'
import moment from 'moment'

const ReportHistory = (props) => {

  const [reportsList, setReportsList] = useState();
  const [reportInfo, setReportInfo] = useState();
  const [historyBodyActive, setHistoryBodyActive] = useState();
  const [historyBodyArchived, setHistoryBodyArchived] = useState();
  const [modalComponent, setModalComponent] = useState();
  const [visible, setVisible] = React.useState(false);
  const [upvoteArray, setUpvoteArray] = useState({})
  const [downvoteArray, setDownvoteArray] = useState({})
  const [type, setType] = useState()
  const [concatReports, setConcatReports] = useState();

  const showModal = (id, reportType) =>{
    getReportInfo(id, reportType)
    setVisible(true)
  };

  const hideModal = () => {
    setVisible(false);
    setReportInfo({
      id: null,
      longitude: null,
      latitude: null,
      rainfall_rate: null,
      flood_depth: null,
      upvote: null,
      downvote: null,
      image: null
    })
    setUpvoteArray({})
    setDownvoteArray({})
    setType(null)
  };

  const getReports = async() => {
    const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");
    RCTNetworking.clearCookies((result) => {
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
          response.json().then((data) => {
            setReportsList(data)
           // console.log("ACTIVE: ", data.active)
            //console.log("ARCHIVE: ", data.archive)
          });
        else{
          console.log(`Error retrieving reports! (Code: ${response.status})`);
        }
      })
  }
  const getReportInfo = async(id, reportType) => {
    const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");
    RCTNetworking.clearCookies((result) => {
    }); 
    
    const userID = await AsyncStorage.getItem("userID")
    const token = await AsyncStorage.getItem("token")
  
    function  getUrl(reportType){
      if (reportType == "archived"){
        return `https://rainflow.live/api/report/history/${id}`
      }else{
        return `https://rainflow.live/api/report/${id}`
      }
    };

    await fetch(getUrl(reportType), {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
          'Authorization' :  `Bearer ${token}`
      }
      }) .then(response => {
        if(response.status == 200)
          response.json().then( (data) => {
            if(Array.isArray(data.upvote)){
              setType("archived")
              setDownvoteArray(data.downvote)
              setUpvoteArray(data.upvote)
            }else{
              setType("active")
            }
            console.log(data)
            setReportInfo(data)});
        else{
          console.log(`Error retrieving reports! (Code: ${response.status})`);
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

  useEffect(() => { // REPORT CARDS. for putting API response in the cards 
    if(reportsList == undefined){
      getReports()
    } else {
      //console.log("FOUND REPORTS: ", reportsList)
      if(reportsList.length == 0){
          setHistoryBody(
            <View style ={{justifyContent: "center", alignItems: "center"}}>
              <Text style = {{textAlign: "center"}}>You have not submitted any reports.</Text>
            </View>
          )
      }else{
        setHistoryBodyArchived(
         
          reportsList.archive.map(data =>{
            return(
              <TouchableOpacity key = {data.id} onPress = {()=>showModal(data.id, "archived")}>

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
                </TouchableOpacity>
            )


          })
        )
        setHistoryBodyActive(
          reportsList.active.map(data =>{
            return(
              <TouchableOpacity key = {data.id} onPress = {()=>showModal(data.id, "active")}>

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
                </TouchableOpacity>
            )


          })
        )
        }
    }
  }, [reportsList]);

  useEffect(() => { // REPORT INFORMATION. for putting API response into modal
    if(reportInfo == undefined){
      null;
    } else {
        var convertedTime = moment(reportInfo.createdAt).format("DD MMM YYYY (dddd) HH:mm");
        setModalComponent(
          <Portal>
            <Modal contentContainerStyle={styles.modalContainer} visible={visible} onDismiss={hideModal}>
              <ScrollView showsVerticalScrollIndicator = {false}>
                <Text style={{fontSize: 14, fontWeight: "bold"}}>Report ID: {reportInfo.id}</Text>
                <Text style={{fontSize: 14, fontWeight: "bold"}}>{convertedTime}</Text>
                <Text>Location: [{reportInfo.latitude},{reportInfo.longitude}] </Text>
                <Text>Rain Intensity: {reportInfo.rainfall_rate} </Text>
                <Text>Flood Level: {reportInfo.flood_depth} </Text>
                <View style = {{borderColor: 1, width: "100%", flexDirection: "row", marginVertical: 8, justifyContent: "space-evenly"}}>
                <Text style={styles.likesText}>{type == "archived" ? upvoteArray.length : reportInfo.upvote} Like/s</Text>
                <Text style={styles.dislikesText}>{type == "archived" ? downvoteArray.length : reportInfo.downvote} Dislike/s</Text>
                </View>
                {reportInfo.image != null ? (
                  <>
                  <View style = {styles.divider} />
                  <Image style={{height: 300, width: 170, alignSelf: "center"}} source={{uri:`https://rainflow.live/api/uploads/reports/${reportInfo.image}`}} />
                  </>
                ) : null}
              </ScrollView>
          </Modal>
        </Portal>
        )
    }
  }, [reportInfo]);


  return (
    <Provider>
      {modalComponent && visible ? modalComponent : null}
    <View style={styles.backgroundContainer}>
      <Appbar.Header style = {{backgroundColor: "#0E956A"}}>
      <Appbar.BackAction onPress={()=> props.navigation.navigate("UserProfile")} />
      <Appbar.Content title="Report History" titleStyle= {{fontSize: 15}} subtitle="Click the cards to view more info" subtitleStyle={{fontSize: 12}}/>
    </Appbar.Header>
      <View style={styles.contentContainer}>
        <ScrollView style = {{width: "100%"}} showsVerticalScrollIndicator = {false}>
        {historyBodyArchived ? (
           <Text style ={{fontSize: 30, fontWeight: "bold", paddingBottom: 5}}>Archived</Text>
        ): null}
        {historyBodyArchived}
        {historyBodyActive ? (
           <Text style ={{fontSize: 30, fontWeight: "bold", paddingBottom: 5}}>Active</Text>
        ): null}
        {historyBodyActive}
        </ScrollView>
      </View>
    </View>
    </Provider>
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

  modalContainer: {
    backgroundColor: "#fff", 
    padding: 20, 
    minHeight: 200, 
    maxHeight:400, 
    width: "90%", 
    alignSelf: "center", 
    justifyContent: "flex-start"
  },

  likesText: {
    backgroundColor: "#1EA78C", 
    color: "#fff", 
    fontWeight: "bold", 
    textAlign: "center", 
    borderRadius: 30, 
    paddingHorizontal: 25, 
    paddingVertical: 2
  },

  dislikesText: {
    backgroundColor: "#E64022", 
    color: "#fff", 
    fontWeight: "bold", 
    textAlign: "center", 
    borderRadius: 30, 
    paddingHorizontal: 25, 
    paddingVertical: 2
  },

  divider: {
    borderWidth: 0.5, 
    borderColor: "#bcbcbc", 
    marginBottom: 5
}
});

export default ReportHistory;
