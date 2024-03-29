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

//import styles from "./styles.jsx";
/*useEffect(() => {
  obtenerDatosStorage();
}, []);*/

import styles from "./styles.jsx";

export default class Medic extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      desayuno1: "",
      calDes1: 0,
      desayuno2: "",
      calDes2: 0,
      comida1: "",
      calCom1: 0,
      comida2: "",
      calCom2: 0,
      cena1: "",
      calCena1: 0,
      cena2: "",
      calCena2: 0,
      values: "",
      caloriasRes: 0,
      peso: null,
      altura: null,
      total: null,
      userPassNull: false,
    };
  }

  saveData = async () => {
    /*let key = [["", 0], ["", 0], ["", 0], ["", 0], ["", 0], ["", 0]];

    await AsyncStorage.setItem("key", JSON.stringify(key));
    //cargar base de datos con valores por default
    key = [
      ["key1", "1"],
      ["key2", "2"],
      ["key3", "3"],
      ["key4", "4"],
      ["key5", "5"],
      ["key6", "6"],
    ];*/
    let key = [
      [this.state.desayuno1, this.state.calDes1],
      [this.state.desayuno2, this.state.calDes2],
      [this.state.comida1, this.state.calCom1],
      [this.state.comida2, this.state.calCom2],
      [this.state.cena1, this.state.calCena1],
      [this.state.cena2, this.state.calCena2],
    ];

    await AsyncStorage.setItem("key", JSON.stringify(key));
    alert("Los valores se guardaron satisfactoriamente");
  };

  saveDataCal = async () => {
    //cargar base de datos con valores por default
    //let calorias = [4000];

    let calorias = [this.state.caloriasRes];
    //resetear las calorías consumidas para cuando se ingresen nuevas calorías restantes
    let calConsumidas = 0;

    await AsyncStorage.setItem("kcalRestantes", JSON.stringify(calorias));
    await AsyncStorage.setItem("kcalConsumidas", JSON.stringify(calConsumidas));
  };

  combinedFunctionData = () => {
    this.saveData();
    this.saveDataCal();
  };

  showData = async () => {
    let key = await AsyncStorage.getItem("key");
    let d = JSON.parse(key);

    this.setState({ values: d });
    //alert(d);
  };

  showDataCal = async () => {
    let key = await AsyncStorage.getItem("kcalRestantes");
    let d = JSON.parse(key);

    this.setState({ values: d });
    //alert(d);
  };

  combinedFunctionShow = () => {
    this.showData();
    this.showDataCal();
  };
  remove = async () => {
    let key = [["", 0], ["", 0], ["", 0], ["", 0], ["", 0], ["", 0]];

    await AsyncStorage.setItem("key", JSON.stringify(key));
    alert("Los valores han sido removidos satisfactoriamente");
  };
  removeCal = async () => {
    let cal = [0];

    await AsyncStorage.setItem("kcalRestantes", JSON.stringify(cal));
    //alert("Los valores han sido removidos satisfactoriamente");
  };
  combinedFunctionRemove = () => {
    this.remove();
    this.removeCal();
  };

  userPassDelete = async () => {
    let userPassRemove = [["", ""]];

    let userPass = await AsyncStorage.setItem(
      "userPass",
      JSON.stringify(userPassRemove)
    );
    let d = JSON.parse(userPass);
    //alert(d);

    this.state.userPassNull = true;

    if (this.state.userPassNull == true) {
      this.props.navigation.navigate("Mediciones");
    }
  };

  IMC = () => {
    const { peso, estatura } = this.state;
    //const estatura2 = Number(estatura);
    const altura = Number(estatura) * Number(estatura);
    const total = Number(peso) / Number(altura);
    this.setState({ total: total });
  };

  render() {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <Text>Peso</Text>
            <TextInput
              placeholder="Peso"
              values={this.state.peso}
              onChangeText={(text) => this.setState({ peso: text })}
            />
            <Text>Edad</Text>
            <TextInput
              placeholder="Estatura"
              values={this.state.estatura}
              onChangeText={(text) => this.setState({ estatura: text })}
            />
            <View style={styles.spacing} />

            <TouchableOpacity
              style={styles.buttonEnabled}
              onPress={this.IMC}
              //onPress={this.getAverage}
            >
              <Text style={styles.buttonText}>IMC: {this.state.total}</Text>
            </TouchableOpacity>
            <Text>Desayuno</Text>
            <View style={styles.spacing} />
            <Text>Opción 1</Text>
            <Text>{this.state.values}</Text>

            <TextInput
              placeholder="Alimento"
              style={styles.input}
              onChangeText={(text) => this.setState({ desayuno1: text })}
            />

            <TextInput
              placeholder="Calorias"
              style={styles.input}
              onChangeText={(text) => this.setState({ calDes1: text })}
            />

            <Text>Opción 2</Text>
            <TextInput
              placeholder="Alimento"
              style={styles.input}
              onChangeText={(text) => this.setState({ desayuno2: text })}
            />

            <TextInput
              placeholder="Calorias"
              style={styles.input}
              onChangeText={(text) => this.setState({ calDes2: text })}
            />

            <Text>Comida</Text>
            <View style={styles.spacing} />
            <Text>Opción 1</Text>
            <TextInput
              placeholder="Alimento"
              style={styles.input}
              onChangeText={(text) => this.setState({ comida1: text })}
            />

            <TextInput
              placeholder="Calorias"
              style={styles.input}
              onChangeText={(text) => this.setState({ calCom1: text })}
            />

            <Text>Opción 2</Text>
            <TextInput
              placeholder="Alimento"
              style={styles.input}
              onChangeText={(text) => this.setState({ comida2: text })}
            />

            <TextInput
              placeholder="Calorias"
              style={styles.input}
              onChangeText={(text) => this.setState({ calCom2: text })}
            />

            <Text>Cena</Text>
            <View style={styles.spacing} />
            <Text>Opción 1</Text>
            <TextInput
              placeholder="Alimento"
              style={styles.input}
              onChangeText={(text) => this.setState({ cena1: text })}
            />

            <TextInput
              placeholder="Calorias"
              style={styles.input}
              onChangeText={(text) => this.setState({ calCena1: text })}
            />

            <Text>Opción 2</Text>
            <TextInput
              placeholder="Alimento"
              style={styles.input}
              onChangeText={(text) => this.setState({ cena2: text })}
            />

            <TextInput
              placeholder="Calorias"
              style={styles.input}
              onChangeText={(text) => this.setState({ calCena2: text })}
            />
            <View style={styles.package}>
              <Text style={styles.sensorField}>Calorias</Text>
            </View>
            <TextInput
              placeholder="Calorias que puedes consumir"
              style={styles.input}
              onChangeText={(text) => this.setState({ caloriasRes: text })}
            />

            <Button
              title="Guardar"
              color="#33AFFF"
              onPress={this.combinedFunctionData}
            />
            <View style={styles.spacing} />
            <Button
              title="Eliminar dieta"
              color="red"
              onPress={this.combinedFunctionRemove}
            />
            <View style={styles.spacing} />
            <TouchableOpacity
              style={styles.buttonEnabled}
              onPress={this.userPassDelete}
            >
              <Text style={styles.buttonText}>Regresar a mediciones</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}
