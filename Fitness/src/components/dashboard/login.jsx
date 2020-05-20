import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles.jsx";

const userInfo = { username: "admin", password: "pass12345" };

export default class LoginScreen extends Component {
  /*static navigationOptions = {
    header: null,
  };*/
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
    };
  }

  saveData = async () => {
    //cargar base de datos con valores por default
    let key = [[this.state.userName, this.state.password]];
    //Usuario: HGEDOC
    //Contraseña: hge01

    await AsyncStorage.setItem("userPass", JSON.stringify(key));
    //alert("Usuario " + key[0] + "Contraseña " + key[1]);
  };

  combinedFunctionData = () => {
    this.saveData();
    this.showData();
  };

  showData = async () => {
    let userPass = await AsyncStorage.getItem("userPass");
    let d = JSON.parse(userPass);

    this.setState({ values: d });
    if (d[0] == "HGEDOC,hge01") {
      this.props.navigation.navigate("Medic");
      alert("Estas logeado");
    } else {
      alert("Usuario o contraseña erroneos");
    }
  };

  remove = async () => {
    let key = [["", 0], ["", 0], ["", 0], ["", 0], ["", 0], ["", 0]];

    await AsyncStorage.setItem("key", JSON.stringify(key));
    alert("Los valores han sido removidos satisfactoriamente");
  };

  combinedFunctionRemove = () => {
    this.remove();
    this.removeCal();
  };

  render() {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <Text>Nombre de usuarioS</Text>
            <TextInput
              placeholder="Nombre de usuario"
              onChangeText={(text) => this.setState({ userName: text })}
              values={this.state.userName}
              autoCapitalize="none"
            />
            <Text>Contraseña</Text>
            <TextInput
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={(text) => this.setState({ password: text })}
              values={this.state.password}
            />
            <View style={styles.spacing} />

            <Button
              title="Login"
              color="#33AFFF"
              onPress={this.combinedFunctionData}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}
