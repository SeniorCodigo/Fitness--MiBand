import React, { Component } from "react";
import {
  Button,
  Text,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  View,
} from "react-native";

import { createStackNavigator } from "react-navigation";
import { Medic } from "./medic";

import AsyncStorage from "@react-native-community/async-storage";

import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
// import RNPickerSelect, { defaultStyles } from './debug';

/*alimentos = [
  {
    label: "Huevo",
    value: 74,
  },
  {
    label: "Pollo 100 g",
    value: 195,
  },
  {
    label: "Tortilla de maíz",
    value: 52,
  },
  {
    label: "Pizza una rebanada",
    value: 298,
  },
];*/

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {
      firstTextInput: null,
      favSport0: null,
      favSport1: null,
      lastTextInput: null,
      favSport5: null,
    };

    this.state = {
      nelPerro: true,
      peso: null,
      estatura: null,
      total: null,
      calRestantes: 2000,
      conCalorias: 0,
      comida: 0,
      chin: 0,
      medAlimentos: "",
      fitAli: [],
      kaka: [(label = []), (value = [])],
      yes: [{ Label: "yes", value: 0 }],
      ali1: [
        {
          label: "Perra",
          value: 0,
        },
      ],
      alimentos: [
        {
          label: "Carga la base de datos en MOSTRAR",
          value: 0,
        },
      ],
      calMed: 0,

      numbers: [
        {
          label: "1",
          value: 1,
          color: "orange",
        },
        {
          label: "2",
          value: 2,
          color: "green",
        },
      ],
      favSport0: undefined,
      favSport1: undefined,
      favSport2: undefined,
      favSport3: undefined,
      favSport4: "baseball",
      previousFavSport5: undefined,
      favSport5: null,
      favNumber: undefined,
    };

    this.InputAccessoryView = this.InputAccessoryView.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  /*showData = async () => {
    let values = await AsyncStorage.getItem("key");

    let d = JSON.parse(values);

    alert(d);
  };*/

  getDataMedic = async () => {
    let values = await AsyncStorage.getItem("key");
    //var c = await AsyncStorage.getItem("cal");

    let d = JSON.parse(values) + "";
    //let d = values + "";
    //let sentences = d.split(",");
    this.setState({ medAlimentos: d });

    //this.setState({ calMed: c });
    let sentences = this.state.medAlimentos.split(",");
    //alert(sentences[1]);
    this.setState({ calRestantes: sentences[12] });
    var yeah = [];
    var alName = [];
    var cal = [];

    for (var i = 0; i <= sentences.length; i++) {
      if (i % 2 == 1) {
        //this.state.fitAli = parseInt(sentences[i]);
        yeah.push(sentences[i]);
        //cal.push(yeah[i]);
        cal.push(parseInt(yeah[i]));
        //alert(yeah);

        //this.setState({ fitAli: parseInt(sentences[i]) });
      } else {
        yeah.push(sentences[i]);
        alName.push(JSON.stringify(yeah[i]));
        //alName.push(sentences[i]);
        //this.setState({ fitAli: sentences[i] });
      }
    }
    this.setState((prevState) => ({
      kaka: {
        // object that we want to update
        ...prevState.kaka, // keep all other key-value pairs
        value: cal, // update the value of specific key
      },
    }));
    this.setState((prevState) => ({
      kaka: {
        // object that we want to update
        ...prevState.kaka, // keep all other key-value pairs
        label: alName, // update the value of specific key
      },
    }));

    //Ali1
    this.setState((prevState) => ({
      ali1: {
        // object that we want to update
        ...prevState.ali1, // keep all other key-value pairs
        label: JSON.parse(JSON.stringify(alName)), // update the value of specific key
      },
    }));

    this.setState((prevState) => ({
      ali1: {
        // object that we want to update
        ...prevState.ali1, // keep all other key-value pairs
        value: cal, // update the value of specific key
      },
    }));

    this.setState({
      alimentos: [
        {
          label: alName[0] + "",
          value: cal[0],
        },
        {
          label: alName[1] + "",
          value: cal[1],
        },
        {
          label: alName[2] + "",
          value: cal[2],
        },
        {
          label: alName[3] + "",
          value: cal[3],
        },
        {
          label: alName[4] + "",
          value: cal[4],
        },
        {
          label: alName[5] + "",
          value: cal[5],
        },
      ],
    });

    this.state.yes = String(this.state.alimentos);
    //alert(result);
    alert(this.state.ali1.label + " " + this.state.ali1.value);
    this.setState({ fitAli: yeah });
  };

  getCalorias = () => {
    this.state.conCalorias = 0;
    const conCalorias = this.state.conCalorias + this.state.comida;
    this.state.calRestantes -= conCalorias;
    const chin = 2000 - this.state.calRestantes;
    this.setState({ conCalorias: conCalorias });
    this.setState({ chin: chin });

    if (this.state.calRestantes < 0) {
      this.state.nelPerro = false;
      this.setState({ calRestantes: 0 });
      this.setState({ chin: 0 });
    }
  };

  IMC = () => {
    const { peso, estatura } = this.state;
    //const estatura2 = Number(estatura);
    const altura = Number(estatura) * Number(estatura);
    const total = Number(peso) / Number(altura);
    this.setState({ total: total });
  };

  InputAccessoryView() {
    return (
      <View style={defaultStyles.modalViewMiddle}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState(
              {
                favSport5: this.state.previousFavSport5,
              },
              () => {
                this.inputRefs.favSport5.togglePicker(true);
              }
            );
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <View testID="needed_for_touchable">
            <Text
              style={[
                defaultStyles.done,
                { fontWeight: "normal", color: "red" },
              ]}
            >
              Cancel
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text>Name | Prefer</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            this.inputRefs.favSport5.togglePicker(true);
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <View testID="needed_for_touchable">
            <Text style={defaultStyles.done}>Done</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    const placeholder = {
      label: "Tipo de alimentos...",
      value: null,
      color: "#9EA0A4",
    };
    //this.setState({ ali1: ali1 });

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonEnabled}
          onPress={() => this.props.navigation.navigate("Medic")}
        >
          <Text style={styles.buttonText}>
            Referencias médicas {this.state.total}
          </Text>
        </TouchableOpacity>
        {/*<Button title="Mostrar" color="#33AFFF" onPress={this.showData} />*/}
        <Button title="Mostrar" color="#33AFFF" onPress={this.getDataMedic} />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.package}>
            <Text style={styles.sensorField}>MedRef: </Text>
            <Text style={styles.sensorField}>{this.state.medAlimentos[6]}</Text>
          </View>
          <View style={styles.package}>
            <Text style={styles.sensorField}>Label: </Text>
            <Text style={styles.sensorField}>{label}</Text>
          </View>

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

          <View style={styles.package}>
            <Text style={styles.sensorField}>Calorias Restantes:</Text>
            <Text style={styles.sensorField}>{this.state.calRestantes}</Text>
          </View>
          <View paddingVertical={5} />
          <View style={styles.package}>
            <Text style={styles.sensorField}>Calorias Consumidas:</Text>
            <Text style={styles.sensorField}>{this.state.chin}</Text>
          </View>
          <View style={styles.package}>
            <Text style={styles.sensorField}>Calorias Restantes:</Text>
            <Text style={styles.sensorField}>{this.state.calMed}</Text>
          </View>
          <View style={styles.spacing} />
          <Button
            title="Agregar Alimentos"
            color="#33AFFF"
            onPress={this.getCalorias}
            disabled={false}
          />
          <View style={styles.spacing} />
          <Text>Selecionar alimentos</Text>
          {/* and iOS onUpArrow/onDownArrow toggle example */}
          <RNPickerSelect
            onPress={this.getDataMedic}
            placeholder={placeholder}
            items={this.state.alimentos}
            onValueChange={(value) => {
              this.setState({
                comida: value,
              });
            }}
          />
          <View>
            <Text>{this.state.comida} Kcal</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

/*const MedicStackNavigator = createStackNavigator({
  Medic: {
    screen: MedicScreen,
  },
});*/

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
