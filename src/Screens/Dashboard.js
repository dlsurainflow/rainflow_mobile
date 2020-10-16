import React, { useEffect, useState } from "react";
import { View, BackHandler, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Appbar } from 'react-native-paper';

const Dashboard = (props) => {

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

    return(
        <View style = {{height: "100%", backgroundColor: "#333844", paddingTop: 30, paddingBottom: 0}}>
            <Appbar.Header style = {{backgroundColor: "#0E956A"}}>
            <Appbar.BackAction onPress={()=> props.navigation.navigate("UserProfile")} />
            <Appbar.Content title="Dashboard" titleStyle= {{fontSize: 15}}/>
            </Appbar.Header>
            <WebView
              geolocationEnabled = {true}
              style = {{padding: 0, margin: 0}}
              scalesPageToFit={true}
              source={{
                uri: 'https://dashboard.rainflow.live/'
              }} 
              />
        </View>
    )
};


export default Dashboard;
