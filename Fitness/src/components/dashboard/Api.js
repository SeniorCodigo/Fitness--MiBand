import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";
import axios from "axios";

const Forms = () => {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [criptomonedas, guardarCriptomonedas] = useState("");
  const [Kcal] = useState("");

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const urlFat =
        "https://api.edamam.com/api/food-database/parser?nutrition-type=logging&ingr=red%20apple&app_id=409c963a&app_key=f493a15bcf31bda75fcb88febe18db99";
      const resultado = await axios.get(url);
      const response = await axios.get(urlFat);
      console.log(resultado);
      //Kcal = response.data.parsed[0].food.nutrients.ENERC_KCAL;
      console.log(response.data.parsed[0].food.nutrients.ENERC_KCAL);
      guardarCriptomonedas(resultado.data.Data);
      Kcal(response.data.parsed[0].food.nutrients.ENERC_KCAL);
    };
    consultarAPI();
  }, []);

  //Función para tener la moneda
  const obtenerMoneda = (moneda) => {
    //console.log(moneda);
    guardarMoneda(moneda);
  };

  const timestamp = Math.round(new Date().getTime() / 1000);
  //const oauth_nonce= ${timestamp}${Math.floor(Math.random() * 1000);

  return (
    <View>
      <Text style={style.label}>Monedas</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={(moneda) => obtenerMoneda(moneda)}
        itemStyle={{ height: 120 }}
      >
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dollar" value="USD" />
        <Picker.Item label="Peso" value="MXN" />
        <Picker.Item label="Euro " value="EUR" />
        <Picker.Item label="Libra Esterlina " value="GBP" />
      </Picker>

      {/*\<Picker
        selectedValue={moneda}
        onValueChange={moneda => obtenerMoneda(moneda)}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccione -" value="" />
        {criptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>*/}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    fontFamily: "Lato-Black",
    textTransform: "uppercase",
    fontSize: 22,
    marginVertical: 20,
  },
});

export default Forms;
