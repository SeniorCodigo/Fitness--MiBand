import React from "react";
import { Text, StyleSheet } from "react-native";

import { createStackNavigator } from "react-navigation";
import MedicScreen from "./medic";
import LoginScreen from "./login";

export default class NavigateLogin extends React.Component {
  render() {
    return <App1StackNavigator />;
  }
}

const App1StackNavigator = createStackNavigator({
  Login: LoginScreen,
  Medic: MedicScreen,
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
