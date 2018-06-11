import React, {Component} from 'react';

import { View, Text, Picker, StyleSheet } from 'react-native'
import {withNavigation, StackNavigator} from 'react-navigation'
//import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import {Button} from 'react-native-elements'

let sports = {football: 'fball', menbasketball: 'mbkb' };

class SportPicker extends Component {
    constructor(props){
        super(props);
        this.state = {selection: 'mbkb'}

        }

    updateSport = (sport) => {
      this.setState({ selection: sport })
   }
   render() {
      return (
         <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-between'}}>
            <Picker selectedValue = {this.state.selection} onValueChange = {this.updateSport}>
               <Picker.Item label = "Men's Basketball" value = "mbkb" />
               <Picker.Item label = "Women's Basketball" value = "wbkb" />
               <Picker.Item label = "Football" value = "fball" />
               <Picker.Item label = "Men's Lacrosse" value = "mlax" />
               <Picker.Item label = "Squash" value = "squash" />
               <Picker.Item label = "Swimming & Diving" value = "swimdive" />
               <Picker.Item label = "Women's Tennis" value = "wten" />
               <Picker.Item label = "Men's Tennis" value = "mten" />
               <Picker.Item label = "Baseball" value = "bsb" />
            </Picker>
            <Text> You selected: </Text>
            <Text style = {styles.text}>{this.state.selection}</Text>
           
            <Button
  title="SCHEDULE"
  onPress={() => {this.props.navigation.navigate('nescac', {selection: this.state.selection} )}}
  titleStyle={{ fontWeight: "700" }}
  buttonStyle={{
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }}
  containerStyle={{ marginTop: 20, marginBottom: 20 }}
/>
         </View>
      )
   }
}

export default withNavigation(SportPicker);

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   }
})
