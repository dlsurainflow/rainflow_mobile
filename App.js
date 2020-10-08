import { StatusBar } from "expo-status-bar";
import React from "react";
//import { StyleSheet, Text } from "react-native";
import "react-native-gesture-handler";

//SCREENS START
import LoginScreen from "./src/Login.js";
import SignupScreen from "./src/Screens/Signup.js";
import ReportingScreen from "./src/Screens/Reporting.js";
import ReportHistoryScreen from "./src/Screens/ReportHistory.js";
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
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Reporting"
      >
        <Stack.Screen
          name="Reporting"
          component={ReportingScreen}
          options={{ title: "Reporting" }}
        />
        <Stack.Screen
          name="ReportHistory"
          component={ReportHistoryScreen}
          options={{ title: "ReportHistory" }}
        />
      </Stack.Navigator>
    </>
  );
  const MapComp = (props) => (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomeMap"
      >
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
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
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
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Signup"
      >
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
        activeColor="#f0edf6"
        shifting
      >
        <bottomTab.Screen
          name="Reporting - Rain Intensity"
          children={ReportComp}
          options={{
            tabBarColor: "#4FC69A",
            tabBarLabel: "Report",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="cellphone-message"
                color="#ffff"
                size={26}
              />
            ),
          }}
        />

        <bottomTab.Screen
          name="HomeMap"
          children={MapComp}
          options={{
            tabBarColor: "#1EA78C",
            tabBarLabel: "Map",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="compass" color="#ffff" size={26} />
            ),
          }}
        />

        <bottomTab.Screen
          name="User Profile"
          children={ProfileComp}
          options={{
            tabBarColor: "#0E956A",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-circle"
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
