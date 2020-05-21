import React from "react";
import { Text, StyleSheet } from "react-native";

import { createStackNavigator } from "react-navigation";
import CaloriasScreen from "./calorias";
import MedicScreen from "./medic";
import LoginScreen from "./login";
import NavigateScreen from "./navigateLoginMedic";
import MedicionesScreen from "./mediciones";

export default class KcalMedic extends React.Component {
  render() {
    return <AppStackNavigator />;
  }
}

const AppStackNavigator = createStackNavigator({
  Mediciones: MedicionesScreen,
  Calorias: CaloriasScreen,
  Medic: MedicScreen,
  Login: LoginScreen,

  Navigate: NavigateScreen,
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
