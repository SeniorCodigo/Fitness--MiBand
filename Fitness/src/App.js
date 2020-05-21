import React, { Component } from "react";
import MedicionesScreen from "./components/dashboard/index";
import ActividadesScreen from "./components/dashboard/actividades";
import kalMedicScreen from "./components/dashboard/kcalMedic";
import CaloriasScreen from "./components/dashboard/calorias";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createMaterialTopTabNavigator } from "react-navigation";

/*const App = () => {
  return <Dashboardx />;
};

export default App;*/

export default createMaterialTopTabNavigator(
  {
    Mediciones: { screen: kalMedicScreen },
    Actividades: { screen: ActividadesScreen },
    //Calorias: { screen: kalMedicScreen },
    Calorias: { screen: CaloriasScreen },
  },
  {
    intialRouteName: "Mediciones",

    activeTintColor: "#33AFFF",
  }
);
