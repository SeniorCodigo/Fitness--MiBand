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
      ali1: [
        {
          label: "Huevos",
          value: 184,
        },
      ],
      alimentos: [
        {
          label: "Huevo",
          value: 74,
        },
      ],

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

    let d = JSON.parse(values) + "";
    //let d = values + "";
    //let sentences = d.split(",");
    this.setState({ medAlimentos: d });
    let sentences = this.state.medAlimentos.split(",");
    //alert(sentences[1]);
    var yeah = [];
    var alName = [];
    var cal = [];

    for (var i = 0; i <= sentences.length; i++) {
      if (i % 2 == 1) {
        //this.state.fitAli = parseInt(sentences[i]);
        yeah.push(sentences[i]);
        //cal.push(yeah[i]);
        cal.push(sentences[i]);
        //alert(yeah);

        //this.setState({ fitAli: parseInt(sentences[i]) });
      } else {
        yeah.push(sentences[i]);
        alName.push(yeah[i]);
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
        label: JSON.stringify(alName), // update the value of specific key
      },
    }));

    this.setState((prevState) => ({
      ali1: {
        // object that we want to update
        ...prevState.ali1, // keep all other key-value pairs
        value: parseInt(cal), // update the value of specific key
      },
    }));
    //alimentos.label = alName;

    //alert(this.state.ali1.label + " " + this.state.ali1.value);
    //alert(alimentos.label);
    //alert(peopleArray);
    //this.state.alimentos.label = alName;
    //this.setState({ alimentos: ali1 });

    // Using Object.keys() and map() function
    // to convert convert an Object {} to an
    // Array [] of key-value pairs

    /*var result = Object.keys(ali1).map(function(key) {
      // Using Number() to convert key to number type
      // Using obj[key] to retrieve key value
      return [Number(key), ali1[key]];
    });*/
    //alert(result);
    /*this.setState({
      ali1: [{ label: JSON.stringify(alName) + "", value: parseInt(cal) }],
    });*/
    alert(this.state.ali1.label + " " + this.state.ali1.value);
    this.setState({ fitAli: yeah });
    //alert(this.state.fitAli);
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
    //this.state.conCalorias = this.state.conCalorias + this.state.favSport0;
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
            <Text style={styles.sensorField}>{this.state.medAlimentos}</Text>
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
            placeholder={placeholder}
            items={this.state.ali1}
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
