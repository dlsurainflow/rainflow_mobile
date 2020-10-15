import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Appbar, TextInput, DefaultTheme} from 'react-native-paper';
import ReportCard from '../components/ReportCard'

const AccountInfo = (props) => {

const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [newPassword1, setNewPassword1] = useState('');
const [showChange, setShowChange] = useState(false)
const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
      primary: '#0E956A',
    },
  };

  const changePasswordHandler = () =>{
    console.log("hello")
    if(newPassword == newPassword1 && newPassword != null && newPassword != '' && currentPassword != null && currentPassword != ''){ //Check if new passwords match and current password has been entered
      console.log("change password") 
    }else{
     
      if(newPassword == null || newPassword =='' || newPassword1 == null || newPassword1 == '' || currentPassword == ''){
        alert("Please fill out all the information needed!");
      }else{
        alert("New passwords do not match. Please check again.");
      }
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



  return (
  
    <View style={styles.backgroundContainer}>
      <Appbar.Header style = {{backgroundColor: "#0E956A"}}>
      <Appbar.BackAction onPress={()=> props.navigation.navigate("UserProfile")} />
      <Appbar.Content title="Account Information" titleStyle= {{fontSize: 15}}/>
    </Appbar.Header>
      <View style={styles.contentContainer}>
        <ScrollView style = {{width: "100%"}} showsVerticalScrollIndicator = {false}>
        <View style = {styles.infoContainer}>
            <Text style = {styles.boldText}>Username</Text>
            <Text style = {styles.fixedRightText}>tammyc</Text>
        </View>
        <View style = {styles.infoContainer}>
            <Text style ={styles.boldText}>Email</Text>
            <Text style = {styles.fixedRightText}>tammara_capa@dlsu.edu.ph</Text>
        </View>
        <View style = {styles.infoContainer}>
            <Text style = {styles.boldText}>Badge</Text>
            <Text style = {styles.fixedRightText}>Silver Badge</Text>
        </View>
        <View style = {styles.infoContainer}>
            <Text style = {styles.boldText}>Points</Text>
            <Text style = {styles.fixedRightText}>35</Text>
        </View>
        <View style = {styles.infoContainerBottom}>
            <Text style ={styles.boldText}>Date Joined</Text>
            <Text style = {styles.fixedRightText}>February 2, 2020</Text>
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
                    onPress={() => {changePasswordHandler()}}
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
