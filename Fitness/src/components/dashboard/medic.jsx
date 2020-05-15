import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  View,
  TouchableHighlight,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

//import styles from "./styles.jsx";
/*useEffect(() => {
  obtenerDatosStorage();
}, []);*/

import styles from "./styles.jsx";

export default class Medic extends Component {
  /*static navigationOptions = {
    header: null,
  };*/
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
    };
  }

  saveData = async () => {
    /*const firstPair = [this.state.desayuno1, this.state.calDes1];
    const secondPair = [this.state.desayuno2, this.state.calDes2];
    const thirdPair = [this.state.comida1, this.state.calCom1];
    const fourthPair = [this.state.comida2, this.state.calCom2];
    const fithPair = [this.state.cena1, this.state.calCena1];
    const sixthPair = [this.state.cena2, this.state.calCena2];
    const firstPair = desayuno1;*/
    /*let key = [
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
    //await AsyncStorage.setItem("first", JSON.stringify(firstPair));
    /*await AsyncStorage.multiSet(
        "first",
        JSON.stringify(firstPair),
        "second",
        JSON.stringify(secondPair),
        "third",
        JSON.stringify(thirdPair),
        "fourth",
        JSON.stringify(fourthPair),
        "fith",
        JSON.stringify(fithPair),
        "sixth",
        JSON.stringify(sixthPair)
      );*/
    await AsyncStorage.setItem("key", JSON.stringify(key));

    /*alert(
      firstPair + secondPair + thirdPair + fourthPair + fithPair + sixthPair
    );*/
  };

  showData = async () => {
    //const values = "";

    /*await AsyncStorage.multiGet("key", (stores) => {
      stores.map((result, i, store) => {
        let key = store[i][0];
        let value = store[i][1];
        let multi = result;
        this.state.values = result;
        //alert(key + value);
        //alert("result " + result);
        alert("value: " + this.state.values);
      });
    });*/
    let key = await AsyncStorage.getItem("key");
    let d = JSON.parse(key);
    this.setState({ values: d });
    alert(d);

    /*try {
      values = JSON.stringify(
        await AsyncStorage.multiGet([firstPair, secondPair])
      );
    } catch (e) {
      // read error
    }*/
  };

  render() {
    //const { params1, params2 } = this.props.route.params;

    return (
      <>
        <ScrollView>
          <View style={styles.contenedor}>
            <Text>Desayuno</Text>
            <View style={styles.spacing} />
            <Text>Opción 1</Text>
            <View style={styles.package}>
              <Text style={styles.sensorField}>Valores:</Text>
              <Text style={styles.sensorField}>{this.state.values[1]}</Text>
            </View>

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

            <Button title="Guardar" color="#33AFFF" onPress={this.saveData} />
            <View style={styles.spacing} />
            <Button title="Mostrar" color="#33AFFF" onPress={this.showData} />
          </View>
        </ScrollView>
      </>
    );
  }
}
