import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
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
const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
      primary: '#0E956A',
    },
  };

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
        <View style = {{flexDirection: "row", alignItems: "center", borderBottomWidth: 1, paddingVertical: 25, marginHorizontal: 5, borderBottomColor: "#bcbcbc"}}>
            <Text style = {{position: "absolute", left: 15, fontWeight: "bold"}}>Username</Text>
            <Text style = {{position: "absolute", right: 15}}>tammyc</Text>
        </View>
        <View style = {{flexDirection: "row", alignItems: "center", borderBottomWidth: 1, paddingVertical: 25, marginHorizontal: 5, borderBottomColor: "#bcbcbc"}}>
            <Text style = {{position: "absolute", left: 15, fontWeight: "bold"}}>Email</Text>
            <Text style = {{position: "absolute", right: 15}}>tammara_capa@dlsu.edu.ph</Text>
        </View>
        <View style = {{flexDirection: "row", alignItems: "center", borderBottomWidth: 1, paddingVertical: 25, marginHorizontal: 5, borderBottomColor: "#bcbcbc"}}>
            <Text style = {{position: "absolute", left: 15, fontWeight: "bold"}}>Badge</Text>
            <Text style = {{position: "absolute", right: 15}}>Silver Badge</Text>
        </View>
        <View style = {{flexDirection: "row", alignItems: "center", borderBottomWidth: 1, paddingVertical: 25, marginHorizontal: 5, borderBottomColor: "#bcbcbc"}}>
            <Text style = {{position: "absolute", left: 15, fontWeight: "bold"}}>Points</Text>
            <Text style = {{position: "absolute", right: 15}}>35</Text>
        </View>
        <View style = {{flexDirection: "row", alignItems: "center", paddingVertical: 25, marginHorizontal: 5, borderBottomColor: "#bcbcbc"}}>
            <Text style = {{position: "absolute", left: 15, fontWeight: "bold"}}>Date Joined</Text>
            <Text style = {{position: "absolute", right: 15}}>February 2, 2020</Text>
        </View>
        
        <TouchableOpacity style = {{width: "100%", backgroundColor: "#1EA78C", marginHorizontal: 5, marginTop:15, paddingVertical: 20, paddingHorizontal: 10, alignItems: "center"}} onPress = {()=>console.log("change password")}>
            <Text style = {{color: "#fff", fontWeight: "bold"}}> Change Password</Text>
        </TouchableOpacity>
        <View style = {{paddingHorizontal: 10, width: "100%", backgroundColor: "#f0edf6", marginHorizontal: 5}}>
            <TextInput
                type = 'outlined'
                label="Current Password"
                value={currentPassword}
                theme={theme}
                secureTextEntry={true}
                style = {{fontSize: 13, marginVertical:2, width: "97%", alignSelf: "center"}}
                onChangeText={text => setCurrentPassword(text)}
            />
            <TextInput
                type = 'outlined'
                label="New Password"
                value={newPassword}
                theme={theme}
                secureTextEntry={true}
                style = {{fontSize: 13, marginVertical:2, width: "97%", alignSelf: "center"}}
                onChangeText={text => setNewPassword(text)}
            />
            <TextInput
                type = 'outlined'
                label="Repeat New Password"
                value={newPassword1}
                theme={theme}
                secureTextEntry={true}
                style = {{fontSize: 13, marginVertical:2, width: "97%", alignSelf: "center"}}
                onChangeText={text => setNewPassword1(text)}
            />

        <TouchableOpacity
            style={styles.button}
            onPress={() => {console.log("confirm change password")}}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
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


});

export default AccountInfo;
