Import React, {Component} from 'react';

import {
AppRegistry, 
FlatList, 
StyleSheet, 
Text, 
View, 
Image, 
Alert, 
Platform, 
TouchableHighlight, 
RefreshControl,
TextInput,
} from 'react-native'

import {Firebase} from 'react-native-firebase'

const androidConfig ={
    apiKey: "AIzaSyCFwizmbsVH2_j2ouVGWenlYDOIydANz8Q",
    authDomain: "fitness-2f4d6.firebaseapp.com",
    databaseURL: "https://fitness-2f4d6.firebaseio.com",
    projectId: "fitness-2f4d6",
    storageBucket: "fitness-2f4d6.appspot.com",
    messagingSenderId: "712305545362",
    appId: "1:712305545362:web:a95ea67014c1550ad4564b",
    measurementId: "G-78JB1RXKFT"
}
firebase.initializeApp(androidConfig);
  firebase.analytics();





