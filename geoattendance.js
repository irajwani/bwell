import React from 'react';
//import Moment from 'react-moment';

import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'native-base';
//import { Avatar, Card } from 'react-native-elements';
//https://github.com/Iwark/react-native-spreadsheet
//https://cmichel.io/google-drive-in-react-native
//import Timer from 'react-native-timer-component';


//AIzaSyClApbAjcQ47QdXG7A6BxjBlcO7wNQhsZo --> Google geocoding API key
//AIzaSyB0Kk1f9qoKA2TobbCjIMkPAoo4pq_TAOI --> Google Places API keyq

var firebase = require("firebase");

class GeoAttendance extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      initialPosition: 'unknown',
      initialTime: 'unknown',
      initialMinute: 0,
      currentPosition: 'unknown',
      currentLatitude: '',
      currentLongitude: '',
      currentTime: 0.001,
      currentMinute: 0.01,
      uid: 'not logged in',
      name: 'Imad', //let user input this?
      attended: 0,
    };

    this.ref = firebase.database().ref('Users/' + this.props.userid + '/');
    this.authentication = firebase.auth();
  }

  watchID: ?number = null; //set a watchID to clear the watch after some duration of time

  componentDidMount = () => {

    //1. get current location
    navigator.geolocation.getCurrentPosition(
      position => {
        var JSONData = JSON.stringify(position);
        var ParsedData = JSON.parse(JSONData);
        const initialPosition = ParsedData.coords.latitude;
        //.toString()).substr(0,13);
        var initialTime = (ParsedData.timestamp)

        var date = new Date(initialTime);
        //brute force it I guess,
        initialTime = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        var initialMinute = date.getMinutes();
        // var hours = date.getHours();
        // var minutes = "0" + date.getMinutes();
        // // Seconds part from the timestamp
        // var seconds = "0" + date.getSeconds();
        // // Will display time in 10:30:23 format
        // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        // alert(formattedTime);

        this.setState({ initialPosition, initialTime: initialTime, initialMinute: initialMinute });
      },
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10,
        distanceFilter: 2,
      }
    );
    //2. Watch the user's location for changes
    this.watchID = navigator.geolocation.watchPosition(position => {
      const JSONData = JSON.stringify(position);
      var ParsedData = JSON.parse(JSONData);
      var currentLatitude = ParsedData.coords.latitude;
      var currentLongitude = ParsedData.coords.longitude;
      var currentTime = ParsedData.timestamp;
      var date = new Date(currentTime);
      //brute force it I guess,
      currentTime = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
      var currentMinute = date.getMinutes();

      // var date = new Date(currentTime * 1000);
      //
      // var hours = date.getHours();
      // var minutes = "0" + date.getMinutes();
      // // Seconds part from the timestamp
      // var seconds = "0" + date.getSeconds();
                                      // // Will display time in 10:30:23 format
      // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);


      //alert(formattedTime);


      this.setState({
        currentLatitude: currentLatitude,
        currentLongitude: currentLongitude,
        currentTime: currentTime,
        currentMinute: currentMinute
      });
    });


  };


  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
  };


  render() {
    var data = 'emptyyy'
      //var snapshot = 'nothing here'
    var attended = 'placeholder for classes attended'
    //snapshot = this.ref.once('value')
    // data = snapshot.val();
    // //this.setState({ attended: snapshot.val().attended })
    // alert(data.name)


    // 44.104460, -70.204015 bottom left
    // 44.104830, -70.203663 upper left
    // 44.104543, -70.203009 upper right
    // 44.104167, -70.203361 bottom right
    //if (this.state.currentLatitude > 44.104153 & this.state.currentLatitude < 44.104822 & this.state.currentLongitude > -70.203999 & this.state.currentLongitude < -70.202976 ) {
    if ( //need to adjust coordinates
      (this.state.currentLatitude > 44.104167) &
      (this.state.currentLatitude < 44.104830) &
      (this.state.currentLongitude > -70.204015) &
      (this.state.currentLongitude < -70.203009)
    ) {

      

      //retrieve user information real quick and update the state with it
      this.ref.once('value').then(
        function(snapshot) {
                  data = snapshot.val();
                  attended = data.attended;

                }
              );

      this.setState({ attended: attended });
      alert(this.state.attended)

      if ( Math.abs(this.state.currentMinute-this.state.initialMinute) < 35 ) {



        return (
      <View style={styles.container}>

        <Text style={styles.boldText}>
          Initial Position and Time. Keep grinding mate, class isn't over yet.
        </Text>

        <Text>
          {this.state.initialPosition} + {this.state.initialMinute}
        </Text>

        <Text style={styles.boldText}>
          Current position:
        </Text>

        <Text>
          {this.state.currentLatitude}
          {' '}
          and
          {' '}
          {this.state.currentLongitude}
          +
          {' '}
          {this.state.currentMinute}
        </Text>

        <Button
          rounded
          success
          onPress={() => {
            alert('whyd you press me?')
          }}>
          <Text>Check In!</Text>
        </Button>
        <Text> Attended Number: {this.state.attended} </Text>

      </View>
    )
    }

    else {

      this.ref.set({name: this.state.name, attended: this.state.attended + 1});
      //maybe reset the state once you've pushed value to firebase
      //this.setState({attended: 0})

      return (
        <View>

          <Text style={{ color: 'red', fontSize: 15, fontFamily: 'Iowan Old Style' }}>Good job you made it. Don't forget to remind Mike that he's a beast.</Text>



        </View>
      )
    }


    } else {

      return (
        <View style={styles.container}>

          <Text style={styles.boldText}>
            Initial position: You're not at the location
          </Text>

          <Text>
            {this.state.initialPosition}
          </Text>

          <Text style={styles.boldText}>
            Current position:
          </Text>

          <Text>
            {this.state.currentLatitude}
            {this.state.currentLongitude} + {this.state.currentTime}
          </Text>

          <Button
            rounded
            success
            onPress={() => {
              this.authentication.signOut().then( result => {   this.props.navigation.navigate('login');;  } ).catch(err => console.error ) ;

            }}>
            <Text>Sign Out!</Text>
          </Button>

        </View>
      );




    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  boldText: {
    fontSize: 13,
    color: 'blue',
  },
});
