/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

import SignInForm from './signInForm.js'
//import GeoAttendance from './geoattendance.js'
import BWell from './bwell.js'
import Commons from './commons.js'
import SportPicker from './sportpicker.js'
import Nescac from './nescac.js'
import PostYak from './batesyak/postyak.js'
import PostComment from './batesyak/postcomment.js'

 var firebase = require("firebase");

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



const RootStack = StackNavigator( 
  {

    login: {
      screen: SignInForm 

    },

    ga: {
      screen: BWell

    },

    commons: {
      screen: Commons
    },

    sportpicker: SportPicker,

    nescac: Nescac,

    postyak: PostYak,

    postcomment: PostComment,


  }
  ,
  {
    initialRouteName: 'login',
    // the shared navigationOptions, which we can always override within the component
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#800000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'American Typewriter'
      },
    },
  }
  );

export default class App extends Component {

  componentWillMount() {
      const config = {
         apiKey: "AIzaSyB2Ydsrp9LkWo26w_C5s_k_qAtJA40jnkM",
         authDomain: "bateslife-199822.firebaseapp.com",
         databaseURL: "https://bateslife-199822.firebaseio.com",
         projectId: "bateslife-199822",
         storageBucket: "bateslife-199822.appspot.com",
         messagingSenderId: "30236129686"
       };

      firebase.initializeApp(config);


    }

  render() {
    console.disableYellowBox = true
    console.log('starting app');
    return <RootStack />;
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
