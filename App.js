import { StatusBar } from "expo-status-bar";
import React from "react";
//import { StyleSheet, Text } from "react-native";
import "react-native-gesture-handler";
import LoginScreen from "./src/Login.js";
import ReportingScreen from "./src/Screens/Reporting.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
//const bottomTab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Reporting" component={ReportingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
/*
export default class App extends Component {
  Auth = () => (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" children={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}*/
/*
export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}
*/
