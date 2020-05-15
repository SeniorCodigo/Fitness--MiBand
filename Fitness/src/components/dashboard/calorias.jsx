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

import AsyncStorage from "@react-native-community/async-storage";

import RNPickerSelect, { defaultStyles } from "react-native-picker-select";

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
      peso: null,
      estatura: null,
      total: null,
      calRestantes: 0,
      conCalorias: 0,
      comida: 0,
      nelPerro: false,
      chin: 0,
      perris: 0,
      chuchis: 0,
      medAlimentos: "",
      fullCal: 0,
      outOfDiet: "",

      alimentos: [
        {
          label: "Carga la base de datos",
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

  getDataMedic = async () => {
    let values = await AsyncStorage.getItem("key");
    let valuesc = await AsyncStorage.getItem("kcal");
    let valuese = await AsyncStorage.getItem("kcalConsumidas");

    let d = JSON.parse(values) + "";
    let c = JSON.parse(valuesc) + "";
    let e = JSON.parse(valuese) + "";
    //alert(typeof e);

    this.setState({ medAlimentos: d });

    //Se splitea los campos
    let sentences = this.state.medAlimentos.split(",");
    this.setState({ fullCal: c });
    this.setState({ calRestantes: c });
    this.setState({ chin: parseInt(e) });
    //alert(this.state.chin);

    var yeah = [];
    var alName = [];
    var cal = [];
    //Ciclo para introducir los valores que provienen de Asynstorage
    for (var i = 0; i <= sentences.length; i++) {
      if (i % 2 == 1) {
        yeah.push(sentences[i]);

        cal.push(parseInt(yeah[i]));
      } else {
        yeah.push(sentences[i]);
        alName.push(JSON.stringify(yeah[i]));
      }
    }

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

    //alert(this.state.alimentos);
  };

  combinedFunction = () => {
    this.getDataMedic();
    this.setDataCal();
  };

  getCalorias = () => {
    //let valKcalConsumidas = await AsyncStorage.getItem("kcalConsumidas");

    this.state.conCalorias = 0;
    const conCalorias = this.state.conCalorias + this.state.comida;
    //alert(this.state.calRestantes);
    this.state.calRestantes -= conCalorias;
    var chin = 0;
    var chin1 = 0;
    chin1 = parseInt(this.state.chin);
    //alert(typeof this.state.chin + " " + typeof chin);
    chin = parseInt(this.state.fullCal) - parseInt(this.state.calRestantes);
    //chin += chin1;

    //chin += chin1;
    //alert(this.state.fullCal + " " + this.state.calRestantes);

    //alert(chin);
    //chin -= this.state.calRestantes;

    this.setState({ conCalorias: conCalorias });
    this.setState({ chin: chin });

    if (this.state.calRestantes < 0) {
      this.state.nelPerro = false;
      this.setState({ calRestantes: 0 });
      this.setState({ chin: 0 });
    }

    let calorias = [this.state.calRestantes];

    //alert(calorias);

    AsyncStorage.setItem("kcal", JSON.stringify(calorias));
    AsyncStorage.setItem("kcalConsumidas", JSON.stringify(chin));
  };
  setDataCal = async () => {
    let calorias = [this.state.calRestantes];

    //alert(calorias);

    await AsyncStorage.setItem("kcal", JSON.stringify(calorias));
  };

  setOutOfDiet = async () => {
    let outDiet = [this.state.outOfDiet];
    alert("Alimento guardardo");

    //alert(calorias);

    await AsyncStorage.setItem("outDiet", JSON.stringify(outDiet));
  };

  getOutOfDiet = async () => {
    let getOutDiet = await AsyncStorage.getItem("outDiet");
    let d = JSON.parse(getOutDiet);

    alert("Alimento: " + d);

    //alert(calorias);
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
        <View style={styles.spacing} />
        <Button
          title="Cargar base de datos"
          color="#33AFFF"
          onPress={this.getDataMedic}
        />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {/*} <Text>Peso</Text>
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
    </TouchableOpacity>*/}

          <View style={styles.package}>
            <Text style={styles.sensorField}>Calorías Restantes:</Text>
            <Text style={styles.sensorField}>{this.state.calRestantes}</Text>
          </View>
          <View paddingVertical={5} />
          <View style={styles.package}>
            <Text style={styles.sensorField}>Calorías Consumidas:</Text>
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
          <Text>Seleccionar alimentos</Text>
          <RNPickerSelect
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
          <View style={styles.spacing} />
          <Text>Anotar alimento fuera de su dieta</Text>
          <TextInput
            placeholder="Alimento"
            values={this.state.peso}
            onChangeText={(text) => this.setState({ outOfDiet: text })}
          />
          <View style={styles.spacing} />
          <Button title="Guardar" color="#33AFFF" onPress={this.setOutOfDiet} />
          <View style={styles.spacing} />
          <Button
            title="Mostrar alimento"
            color="#33AFFF"
            onPress={this.getOutOfDiet}
          />
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
