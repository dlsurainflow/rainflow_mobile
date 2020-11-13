import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  BackHandler,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Appbar, TextInput, DefaultTheme, Snackbar} from 'react-native-paper';
import { ColorDotsLoader } from 'react-native-indicator';
import moment from 'moment'

const AccountInfo = (props) => {

const [username, setUsername] = useState();
const [email, setEmail] = useState();
const [badge, setBadge] = useState();
const [points, setPoints] = useState();
const [joined, setJoined] = useState();  
const [currentPassword, setCurrentPassword] = useState();
const [newPassword, setNewPassword] = useState();
const [newPassword1, setNewPassword1] = useState();
const [showChange, setShowChange] = useState(false);
const [visible, setVisible] = useState(false);
const [showLoading, setShowLoading] = useState(false)

const onDismissSnackBar = () => setVisible(false);

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
      primary: '#0E956A',
    },
  };

  const getStored = async()=>{
    let un = await AsyncStorage.getItem("username");
    let pts = await AsyncStorage.getItem("points");
    let email_add = await AsyncStorage.getItem("email")
    let badgeRank = await AsyncStorage.getItem("badge");
    let dateJoined = await AsyncStorage.getItem("dateCreated")

    console.log(dateJoined)
    let convertedTime = moment(dateJoined).format("DD MMM YYYY")

    setUsername(un);
    setBadge(badgeRank)
    setPoints(pts);
    setEmail(email_add)
    setJoined(convertedTime)
  }

  const changePasswordHandler = async() =>{
    if(newPassword == newPassword1 && newPassword != null && newPassword != '' && currentPassword != null && currentPassword != ''){ //Check if new passwords match and current password has been entered
          if(newPassword == currentPassword){
            Alert.alert('New password is the same as current password!')
          }
          else{
              const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");
                RCTNetworking.clearCookies((result) => {
              });
    
              const token = await AsyncStorage.getItem("token")
    
              await fetch(`https://rainflow.live/api/users/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' :  `Bearer ${token}`
                },
                body :JSON.stringify({ 
                    password: currentPassword,
                    new_password: newPassword
                })
                }).then(response => {
                  if(response.status == 200){
                  
                    response.json().then( (data) => {
                      if(data.status == "Error"){
                        console.log(data)
                        console.log("-----" +currentPassword+ "----")
                        Alert.alert('Current password is incorrect.');
                      }else{
                        logOut()
                        console.log(data)
                      }
                    });
                  }
                  else{
                    Alert.alert(
                      'Error in changing password! (Code: ' + response.status + ')');
                  }
                })  
          }

    }else{
     
      if(newPassword == null || newPassword =='' || newPassword1 == null || newPassword1 == '' || currentPassword == ''){
        Alert.alert("Please fill out all the information needed!");
      }
      else{
       Alert.alert("New passwords do not match. Please check again.");
      }
    }
  }

  const  logOut = async() =>{
    try {
      setShowLoading(true)
      setVisible(true)
      setTimeout(async() => {
        setShowLoading(false)
        setVisible(false)
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('points');
        await AsyncStorage.removeItem('token');
        props.navigation.navigate("Login")
      }, 3500);



  }
  catch(exception) {
      return false;
  }
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

  useEffect(()=>{
    getStored()
  },[])



  return (
  
    <View style={styles.backgroundContainer}>
      <Appbar.Header style = {{backgroundColor: "#0E956A"}}>
      <Appbar.BackAction onPress={()=> props.navigation.navigate("UserProfile")} />
      <Appbar.Content title="Account Information" titleStyle= {{fontSize: 15}}/>
    </Appbar.Header>

    <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        >
        Your password is being updated. Please login again.
      </Snackbar>

      <View style={styles.contentContainer}>
        <ScrollView style = {{width: "100%"}} showsVerticalScrollIndicator = {false}>
        <View style = {styles.infoContainer}>
            <Text style = {styles.boldText}>Username</Text>
            <Text style = {styles.fixedRightText}>{username}</Text>
        </View>
        <View style = {styles.infoContainer}>
            <Text style ={styles.boldText}>Email</Text>
            <Text style = {styles.fixedRightText}>{email}</Text>
        </View>
        <View style = {styles.infoContainer}>
            <Text style = {styles.boldText}>Badge</Text>
            <Text style = {styles.fixedRightText}> {badge !== null ? (
              <Image style={{height: 20, width: 16, alignSelf: "center"}} source={{uri:`https://rainflow.live/api/images/badges/${badge}`}} />
            ): (
              <MaterialCommunityIcons
                            name="shield-half-full"
                            color="#0E956A"
                            size={20}
                          />
            )}</Text>
        </View>
        <View style = {styles.infoContainer}>
            <Text style = {styles.boldText}>Points</Text>
            <Text style = {styles.fixedRightText}>{points}</Text>
        </View>
        <View style = {styles.infoContainerBottom}>
            <Text style ={styles.boldText}>Joined</Text>
            <Text style = {styles.fixedRightText}>{joined}</Text>
        </View>
        
        <TouchableOpacity style = {styles.changePWHeader} onPress = {()=>{setShowChange(!showChange)}}>
            <Text style = {{color: "#fff", fontWeight: "bold"}}> Change Password</Text>
        </TouchableOpacity>
        {showChange ? (
                <View style = {styles.changePWBody}>
                    <TextInput
                        type = 'outlined'
                        label="Current Password"
                        value={currentPassword}
                        theme={theme}
                        secureTextEntry={true}
                        style = {styles.outlinedTextBox}
                        onChangeText={text => setCurrentPassword(text)}
                    />
                    <TextInput
                        type = 'outlined'
                        label="New Password"
                        value={newPassword}
                        theme={theme}
                        secureTextEntry={true}
                        style = {styles.outlinedTextBox}
                        onChangeText={text => setNewPassword(text)}
                    />
                    <TextInput
                        type = 'outlined'
                        label="Repeat New Password"
                        value={newPassword1}
                        theme={theme}
                        secureTextEntry={true}
                        style = {styles.outlinedTextBox}
                        onChangeText={text => setNewPassword1(text)}
                    />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { showLoading ? null : changePasswordHandler()}}
                  >
                    <Text
                      style={styles.buttonText}
                    >
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
        ) : null}

        </ScrollView>
        {showLoading ? (
            <View style = {styles.loadingContainer}>
            <ColorDotsLoader size = {30} color1 = {"#4FC69A"} color2 = {"#1EA78C"} color3 = {"#0E956A"} /> 
            <Text style = {{fontWeight: "bold", color : "#434343"}}>Loading</Text>       
            </View>
          ) : null}
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
    justifyContent: "center",
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
  button: {
    width: "50%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#1EA78C",
    alignSelf: "center",
    marginVertical: 15
  },

  changePWHeader: {
    width: "100%", 
    backgroundColor: "#1EA78C", 
    marginHorizontal: 5, 
    marginTop:15, 
    paddingVertical: 20, 
    paddingHorizontal: 10, 
    alignItems: "center"
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

  infoContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    borderBottomWidth: 1, 
    paddingVertical: 25, 
    marginHorizontal: 5, 
    borderBottomColor: "#bcbcbc"
  },

  infoContainerBottom: {
    flexDirection: "row", 
    alignItems: "center",  
    paddingVertical: 25, 
    marginHorizontal: 5, 
  },

  boldText: {
    position: "absolute", 
    left: 15, 
    fontWeight: "bold"
  },

  fixedRightText: {
    position: "absolute", 
    right: 15
  },

  changePWBody: {
    paddingHorizontal: 10, 
    width: "100%", 
    backgroundColor: "#f0edf6", 
    marginHorizontal: 5
  },

  outlinedTextBox: {
    fontSize: 13, 
    marginVertical:2, 
    width: "97%", 
    alignSelf: "center"
  },

  buttonText: {
    textAlign: "center", 
    color: "#fff", 
    fontWeight: "bold" 
  }

});

export default AccountInfo;
