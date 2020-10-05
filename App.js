import { StatusBar } from "expo-status-bar";
import React from "react";
//import { StyleSheet, Text } from "react-native";
import "react-native-gesture-handler";

//SCREENS START
import LoginScreen from "./src/Login.js";
import SignupScreen from "./src/Screens/Signup.js";
import ReportingScreen from "./src/Screens/ReportingRainIntensity.js";
import ReportingFLScreen from "./src/Screens/ReportingFloodLevel.js";
import HomeMap from "./src/Screens/HomeMap.js";
//SCREENS END

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const Stack = createStackNavigator();
const bottomTab = createMaterialBottomTabNavigator();


export default function App() {

  const ReportComp = (props) => (
    <>
      <Stack.Navigator initialRouteName="Reporting - Rain Intensity">
        <Stack.Screen
          name="Reporting - Rain Intensity"
          component={ReportingScreen}
          options={{ title: "Reporting - Rain Intensity" }}
        />
        <Stack.Screen
          name="Reporting - Flood Level"
          component={ReportingFLScreen}
          options={{ title: "Reporting - Flood Level" }}
        />
      </Stack.Navigator>
    </>
  );
  const MapComp = (props) => (
    <>
      <Stack.Navigator initialRouteName="HomeMap">
        <Stack.Screen
          name="HomeMap"
          component={HomeMap}
          options={{ title: "HomeMap" }}
        />
      </Stack.Navigator>
    </>
  );


  const ProfileComp = (props) => (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="HomeMap"
          component={HomeMap}
          options={{ title: "HomeMap" }}
        />
         <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: "Signup" }}
        />
      </Stack.Navigator>
    </>
  );

  const SignupComp = (props) => (

    <>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: "Signup" }}
        />
      </Stack.Navigator>
    </>
    
  );
  return (
    <NavigationContainer>

    <bottomTab.Navigator
        initialRouteName="HomeMap"
        backBehavior="none"
        barStyle={{ backgroundColor: "#fff" }}
        activeColor="#fff"  
        // inactiveColor="purple"
        shifting
      >
        <bottomTab.Screen
          name="HomeMap"
          children={MapComp}
          options={{
            tabBarColor: '#00AC49',
            tabBarLabel: "Map",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cart-plus" color="#ffff" size={26} />
            ),
          }}
        />
       
        <bottomTab.Screen
          name="Reporting - Rain Intensity"
          children={ReportComp}
          options={{
            tabBarColor: '#E72614',
            tabBarLabel: "Report",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home-heart" color="#ffff" size={26} />
            ),
           
          }}
        />

<bottomTab.Screen
          name="User Profile"
          children={ProfileComp}
          options={{
            tabBarColor: '#EBC50E',
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="contactless-payment"
                color="#ffff"
                size={26}
              />
            ),
          }}
        />
        
        
      </bottomTab.Navigator>
    </NavigationContainer>
  );
}

