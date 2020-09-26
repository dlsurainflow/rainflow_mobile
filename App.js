import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import Login from "./src/Login.js";
import Reporting from "./src/Screens/Reporting.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
//const bottomTab = createMaterialBottomTabNavigator();

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
}
/*
export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
