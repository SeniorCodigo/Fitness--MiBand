import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  View,
  TouchableHighlight,
  Keyboard,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

//import styles from "./styles.jsx";
/*useEffect(() => {
  obtenerDatosStorage();
}, []);*/

export default class Medic extends React.Component {
  /*static navigationOptions = {
    header: null,
  };*/
  constructor(props) {
    super(props);

    this.state = {
      alimento: "",
      saveInputAlimento: "",
      nombreStorage: "",
      guardarNombre: "",
      fname: "",
      fkcal: "",
    };
  }

  guardarDatos = async () => {
    try {
      await AsyncStorage.setItem("alimento", alimento);
    } catch (error) {
      console.log(error);
    }

    console.log;
  };

  obtenerDatosStorage = async () => {
    try {
      const alimento = await AsyncStorage.getItem("alimento");
      guardarNombre(alimento);
    } catch (error) {
      console.log(error);
    }
  };

  saveData = () => {
    //const { fname, fkcal } = this.state;
    const myName = this.state.fname;
    AsyncStorage.setItem("myName", JSON.stringify(myName));
  };

  showData = async () => {
    const value = await AsyncStorage.getItem("myName");
    if (value !== null) {
      // We have data!!
      //console.log(value);
      alert(value);
    }
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <Text>Hola: {this.state.alimento}</Text>
          <TextInput
            placeholder="Alimento"
            style={styles.input}
            onChangeText={(text) => this.setState({ fname: text })}
          />

          <Button title="Guardar" color="#33AFFF" onPress={this.saveData} />
          <Button title="Mostrar" color="#33AFFF" onPress={this.showData} />

          <Text>{this.state.alimento}</Text>
          <TouchableHighlight style={styles.btnDelete}>
            <Text style={styles.txtDelete}>Eliminar nombre &times;</Text>
          </TouchableHighlight>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#666",
    borderBottomColor: 1,
    width: 300,
    height: 40,
  },
  btnDelete: {
    backgroundColor: "red",
    marginTop: 20,
    padding: 10,
  },
  txtDelete: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    width: 300,
  },
});
