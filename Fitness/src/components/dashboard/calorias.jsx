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
//const calFullRes = AsyncStorage.getItem("kcalRestante");

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
      outOfDietCal: 0,
      nuevoAlimento: " ",
      getAlimento: false,

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
    this.state.nelPerro = true;
    let key = await AsyncStorage.getItem("key");
    let kcalRestantes = await AsyncStorage.getItem("kcalRestantes");
    let kcalConsumidas = await AsyncStorage.getItem("kcalConsumidas");

    let alimentos = JSON.parse(key) + "";
    let calRestantes = JSON.parse(kcalRestantes) + "";
    let calConsumidas = JSON.parse(kcalConsumidas) + "";
    //alert(typeof e);

    this.setState({ medAlimentos: alimentos });

    //Se splitea los campos y se instancias los valores
    //calorías restantes y calorías consumidas
    let sentences = this.state.medAlimentos.split(",");
    this.setState({ fullCal: calRestantes });
    this.setState({ calRestantes: calRestantes });
    this.setState({ chin: parseInt(calConsumidas) });
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
    //incluir nuevo alimento
    alName[6] = JSON.stringify(this.state.nuevoAlimento[0]);
    cal[6] = parseInt(this.state.nuevoAlimento[1]);

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

  outDietDelete = async () => {
    let outDietRemove = [["", ""]];

    let userPass = await AsyncStorage.setItem(
      "outDiet",
      JSON.stringify(outDietRemove)
    );
    //let d = JSON.parse(userPass);
    //alert(d);
  };

  getCalorias = () => {
    //ConCalorias se inicializa en cero para que no se acumulen los valores
    this.state.conCalorias = 0;

    //Con el booleano nelPerro se detecta si hay nuevo alimento y se mantiene
    //el primero valor de calorías restantes provinientes del file medic.jsx
    if (this.state.nelPerro == true) {
      //Se crea la variable full para siempre tener el primer valor de
      //calorías restantes
      let full = parseInt(this.state.fullCal) + parseInt(this.state.chin);
      this.state.fullCal = full;
    }

    //Boleano para detectar cuando se detecta un nuevo alimento no recomendado para la dieta
    if (this.state.getAlimento == true) {
      //Se agrega el nuevo alimento y se resta el alimento que esta en el picker
      let conCalorias =
        this.state.conCalorias +
        this.state.nuevoAlimento[1] -
        this.state.comida;
      this.state.calRestantes -= conCalorias;
      this.outDietDelete();
    }

    const conCalorias = this.state.conCalorias + this.state.comida;
    this.state.calRestantes -= conCalorias;
    var chin = parseInt(this.state.fullCal) - parseInt(this.state.calRestantes);

    //alert(this.state.fullCal + " " + this.state.calRestantes + " " + chin);

    this.setState({ conCalorias: conCalorias });
    this.setState({ chin: parseInt(chin) });
    this.setState({ nelPerro: false });
    this.setState({ getAlimento: false });

    if (this.state.calRestantes < 0) {
      this.state.nelPerro = false;
      this.setState({ calRestantes: 0 });
      this.setState({ chin: 0 });
    }

    let calorias = [this.state.calRestantes];

    //alert(calorias);

    AsyncStorage.setItem("kcalRestantes", JSON.stringify(calorias));
    AsyncStorage.setItem("kcalConsumidas", JSON.stringify(chin));
  };
  setDataCal = async () => {
    let caloriasRestantes = [this.state.calRestantes];

    //alert(calorias);

    await AsyncStorage.setItem(
      "kcalRestantes",
      JSON.stringify(caloriasRestantes)
    );
  };

  setOutOfDiet = async () => {
    this.setState({ getAlimento: true });
    let outDiet = [this.state.outOfDiet, this.state.outOfDietCal];
    //alert("Alimento guardardo");

    //alert(calorias);

    await AsyncStorage.setItem("outDiet", JSON.stringify(outDiet));
  };

  getOutOfDiet = async () => {
    let getOutDiet = await AsyncStorage.getItem("outDiet");
    let d = JSON.parse(getOutDiet);
    this.setState({ nuevoAlimento: d });

    alert("Alimento guardado: " + d);

    //alert(calorias);
  };

  IMC = () => {
    const { peso, estatura } = this.state;
    //const estatura2 = Number(estatura);
    const altura = Number(estatura) * Number(estatura);
    const total = Number(peso) / Number(altura);
    this.setState({ total: total });
  };

  outDietCombined = () => {
    this.setOutOfDiet();
    this.getOutOfDiet();
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
        {/*<TouchableOpacity
          style={styles.buttonEnabled}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>
            Login para médicos {this.state.total}
          </Text>
        </TouchableOpacity>*/}
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
          <View style={styles.spacing} />
          <Text>Calorías</Text>
          <TextInput
            placeholder="Calorías"
            values={this.state.peso}
            onChangeText={(text) => this.setState({ outOfDietCal: text })}
          />
          <View style={styles.spacing} />
          <Button
            title="Guardar"
            color="#33AFFF"
            onPress={this.outDietCombined}
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
