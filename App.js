
import React, {useEffect, useState} from "react";

import "react-native-gesture-handler";

//SCREENS START
import LoginScreen from "./src/Login.js";
import SignupScreen from "./src/Screens/Signup.js";
import ReportingScreen from "./src/Screens/Reporting.js";
import ReportHistoryScreen from "./src/Screens/ReportHistory.js";
import HomeMap from "./src/Screens/HomeMap.js";
import UserProfileScreen from "./src/Screens/UserProfile.js";
//SCREENS END

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AnimatedSplash from "react-native-animated-splash-screen";

const Stack = createStackNavigator();
const bottomTab = createMaterialBottomTabNavigator();


export default function App() {
  
  const [loadSplash, setLoadSplash] = useState(false)

  useEffect(()=>{
    setTimeout(async() => {
      setLoadSplash(true)
    }, 2500);
  }
  , [])

  const ReportComp = (props) => (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ReportingScreen">
        <Stack.Screen
          name="ReportingScreen"
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
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeMap">
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
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="UserProfile">
      <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{ title: "UserProfile" }}
        />

          {/*   <Stack.Screen
       
      
          name="Signup"
          component={SignupScreen}
          options={{ title: "Signup" }}
      />*/}
      </Stack.Navigator>
    </>
  );



  const Navbar = (props) => {
      return(
    <bottomTab.Navigator
        initialRouteName="HomeMap"
        backBehavior="none"
        barStyle = {{backgroundColor: "#fff"}}
        activeColor="#f0edf6" 
        shifting
      >

<bottomTab.Screen
          name="Reporting"
          children={ReportComp}
          options={{
            tabBarColor: '#4FC69A', 
            tabBarLabel: "Report",
        
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons 
                name="alert-octagon" 
                color="#ffff" 
                size={26} />
            ),
           
          }}
        />

        <bottomTab.Screen
          name="HomeMap"
          children={MapComp}
          options={{
            tabBarColor: '#1EA78C',

            tabBarLabel: "Map",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons 
                name="compass" 
                color="#ffff" 
                size={26} />
            ),
          }}
        />
       
      

<bottomTab.Screen
          name="User Profile"
          children={ProfileComp}
          options={{
            tabBarColor: '#0E956A',
         
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

      )
  }

  return (
    <AnimatedSplash
    translucent={true}
    isLoaded={loadSplash}
    logoImage={require("./assets/Logo.png")}
    backgroundColor={"#434343"}
    logoHeight={150}
    logoWidth={200}
  >
   <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="MainMenu">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="MainMenu" component={Navbar} />
    </Stack.Navigator>
   </NavigationContainer>
   </AnimatedSplash>
  );
}

