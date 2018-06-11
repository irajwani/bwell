import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, FlatList, ActivityIndicator} from 'react-native';
import {withNavigation, StackNavigator} from 'react-navigation'; // Version can be specified in package.json
import {List, ListItem} from 'react-native-elements';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import { PacmanIndicator } from 'react-native-indicators';
import SignInForm from './signInForm.js'

// import { 
//   toLatLon, toLatitudeLongitude, headingDistanceTo, moveTo, insideCircle
// } from 'geolocation-utils';
//jlu@bates.edu    &&   joker1 

var firebase = require("firebase");


const glu = require('./utils.js');

//var firebase = require('firebase');


const merrill = {lat: 44.104933, lon:  -70.198711};
const cage = {lat: 44.1048221, lon: -70.2028972};
const chase = {lat: 44.1045392, lon: -70.2036695};
const hathorn = {lat: 44.106371,lon : -70.204498 };
const lib = {lat: 44.105482, lon: -70.204018};
const home = {lat: 44.107025, lon: -70.206460 };
const commons = {lat: 44.105490, lon: -70.201827}

const merrill_radius = 66.4 // meters;
const cage_radius = 45.3
const chase_radius = 15
const hathorn_radius = 20
const lib_radius = 10
const home_radius = 20
const commons_radius = 100
//const test = glu.insideCircle({lat: 51.03, lon: 4.05}, merrill, radius);


var currentLatitude;
var currentLongitude;
var currentTime;
var currentMinute;
var currentLocation;


class BWell extends Component {

	constructor(props) {
		super(props);
		this.state = {
		      isLoading: true,
		      isGetting: false,
		      initialPosition: 'unknown',
		      initialTime: new Date(),
		      initialMinute: 0,
		      currentPosition: 'unknown',
		      currentLatitude: null,
		      currentLongitude: null,
		      currentTime: new Date(),
		      currentMinute: 0.01,
		      uid: null,
		      //let user input this?
		      
			};
		let new_db = 'hi';
		this.ref = firebase.database().ref('Users/' + this.props.uid + '/');
		//this.navigate = this.props.navigation.navigate; 
		
		//Object.entries(this.props.data).map(item => ({...item[1], key: item[0]}));

		    //this.ref = firebase.database().ref('Users/' + this.props.userid + '/');
		    //this.authentication = firebase.auth();

	}
	
	// goback() {
	// 	this.props.navigation.navigate('login');
	// }

	tick() {
		navigator.geolocation.getCurrentPosition(
			position => {
			  var JSONData = JSON.stringify(position);
			  var ParsedData = JSON.parse(JSONData);
			  const initialPosition = ParsedData.coords.latitude;
			  //.toString()).substr(0,13);
			  // var initialTime = (ParsedData.timestamp)
	  
			  // var date = new Date(initialTime);
			  // //brute force it I guess,
			  // initialTime = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
			  // var initialMinute = date.getMinutes();
			  // var hours = date.getHours();
			  // var minutes = "0" + date.getMinutes();
			  // // Seconds part from the timestamp
			  // var seconds = "0" + date.getSeconds();
			  // // Will display time in 10:30:23 format
			  // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
			  // alert(formattedTime);
	  
			  this.setState({ initialPosition });
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
			currentLatitude = ParsedData.coords.latitude;
			currentLongitude = ParsedData.coords.longitude;
		  //   currentTime = ParsedData.timestamp;
		  //   var date = new Date(currentTime);
		  //   //brute force it I guess,
		  //   currentTime = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
		  //   currentMinute = date.getMinutes();
			//currentLocation = {lat: currentLatitude, lon: currentLongitude};
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
			  currentLocation: {lat: currentLatitude, lon: currentLongitude},
			  isLoading: false
			});
			
		  //   const {params} = this.props.navigation.state;
		  // 	let db = params ? params.data : null;
			   
		  // 	//console.log(new_db);
		  // 	const userid = params ? params.userid : null;
		  // 	let attended = params ? params.attended : null;
		  // 	const name = params ? params.name : null;
	  
			  // currentLocation = {lat: this.state.currentLatitude, lon: this.state.currentLongitude};
			//console.log(this.state.currentLocation);
			//console.log(this.state.initialMinute)
			//console.log(this.state.currentMinute);
	  
	  
		  });
		this.setState({
		  currentTime: new Date()
		});
	  }


 	componentDidMount() {
		//0. get initial time
	
	 this.timerID = setInterval(
			() => this.tick(),
			10000
		  ); //In this case, simply increment the clock every 10 seconds
		
	}
		//1. get current location
	 

   //  		//need some way to extract attendance and then store in state for this particular session properly
	  // firebase.database().ref('Users/' + this.props.userid + '/').once('value').then(
					
		 //        	snapshot => {

		 //                  return snapshot.val().attended;

		 //                  // name = data.name;
		 //                  // attended = data.attended;
		 //                  // return attended
		 //                  //this.setState({name: name, attended: attended});
		 //                  //console.log(this.state.attended);
		 //                  //console.log(attended);
		 //                  //return attended

		 //                }
		                
		 //              )
	  // 					.catch(function(error) { console.log(error); })
	  // 						.finally(function(a) 
		 //              { //attended = a;
		 //              	//console.log(a); 
		 //              	this.setState({isGetting: false, attended: a});
		 //                console.log(this.state.isGetting);
		 //                console.log(this.state.attended);

		 //            	//console.log(attended);
		 //              	//console.log('Im done');
		 //              	//return this.setState({attended: attended, isGetting: false});
		 //              	   });
    	


		//console.log(attended);
		//0. Get user info to signify we are working with this particular user
		//this.setState({uid: this.props.userid});



	

	componentWillUnmount = () => {
		navigator.geolocation.clearWatch(this.watchID);
		clearInterval(this.timerID);
  };

	


	render() {

			// firebase.database().ref('Users/').on('value', function(snapshot) {
			// 	console.log(snapshot.val());
			//   });
			console.log('Initializing Attendance Component');
			//console.log(this.state.uid);
			//console.log(this.state.currentMinute);
			//console.log(Math.abs(this.state.currentMinute-this.state.initialMinute) );
			//console.log(insideCircle({lat: this.state.currentLatitude, lon: this.state.currentLongitude}, merrill, radius))
			if(this.props.uid !== null) {
				//retrieve your data from Firebase real quick
				
				if (this.state.isLoading) {
					return(<View style={styles.container}> <PacmanIndicator animating={this.state.isLoading} color='#800000' /> </View>)
				}else{
					if(this.state.isGetting) 
					{ return(<View style={styles.container}> <PacmanIndicator animating={this.state.isLoading} color='#800000' /> </View>)} 
						else {
						   let condition = glu.insideCircle({lat: this.state.currentLatitude, lon: this.state.currentLongitude}, merrill, merrill_radius) & Math.abs(this.state.currentTime.getMinutes()-this.state.initialTime.getMinutes()) >= 35
						   console.log(condition); 		 
						   while( condition === 0 )
						
						   {
							   return (
							<View style={styles.container}> 
								<Text style={styles.headingtext}> You're NOT at the location, or you are there but haven't finished class. Keep me awake if its the latter. No need to use me if its the former</Text>
								<Text style={styles.infotext}> Your name is : {this.props.name} </Text>
								<Text style={styles.infotext}> Your user Id on firebase is {this.props.uid} </Text>
								<Text style = {styles.infotext}> You've attended this class {this.props.attended} times </Text> 
								<Text style={styles.timelocationtext}> In terms of minutes, it is currently  {this.state.currentTime.getMinutes()} versus when you entered and it was {this.state.initialTime.getMinutes()} </Text>
								<Text style={styles.timelocationtext}> Therefore {this.state.currentTime.getMinutes() - this.state.initialTime.getMinutes()} minutes have elapsed since class began</Text>
								<Text style={styles.timelocationtext}> Latitude: {this.state.currentLatitude} and Longitude: {this.state.currentLongitude} </Text>
								<FlatList contentContainerStyle={styles.contentContainer}
											data = { Object.entries(this.props.data).map(item => ({...item[1], key: item[0]})) }
											renderItem={({item}) => <Text> {item.name} has attendance of: {item.attended} </Text>}
								/>
								<Button
										title="Give Up/Log Out"
										onPress={() => {this.props.navigation.navigate('login')} }
										style = {{
									backgroundColor: '#7a42f4',
									padding: 10,
									margin: 15,
									height: 40,}}
										/>
								<Button
										title="Commons Menu"
										onPress={() => { this.props.navigation.navigate('commons') }}
										style = {{
									backgroundColor: '#7a42f4',
									padding: 10,
									margin: 15,
									height: 40,}}
										/>
							</View>)  }

							//alert('good job, you finished class, adding 1 to your attendance');
							
								console.log('donezo');
								this.ref.set({name: this.props.name, attended: this.props.attended + 1});
						   		return( <SignInForm /> )	
						   


						// 	return(  
							
						// 	<View> 
							
						// 	<Text> Oh, sick you finished class. Adding 1 to your attendance. </Text>
						// 	<FlatList
						// 				data = {new_db}
						// 				renderItem={({item}) => <Text> {item.name} has attendance of: {item.attended} </Text>}
						// 		/>
							
						// 	</View>
							





						//   ) 
					     
						// return(

						//  <View style={styles.container}> 
						// 		<Text style={styles.bodytext}>
						// 			Keep Grinding mate, class isn't over yet or alternatively you elected to leave before the class period of fifty minutes ended.
								
						// 			Youve attended this class {attended} times 
								
						// 		</Text>
								
						// 		<Text> Your current coordinates: </Text>
						// 		<Text> Latitude: {this.state.currentLatitude} and Longitude: {this.state.currentLongitude} </Text>
						// 		<FlatList
						// 				data = {new_db}
						// 				renderItem={({item}) => <Text> {item.name} has attendance of: {item.attended} </Text>}
						// 		/>
						//    </View>
						// )
						   
					 
				              }
					


				}

				//console.log(insideCircle({lat: this.state.currentLatitude, lon: this.state.currentLongitude}, merrill, radius))
				
				}else{ 
					return(<View style={styles.container}> <Text> Hopefully I'll never appear on a users screen </Text> </View>) 
				}



		}


}

export default withNavigation(BWell);

const styles = StyleSheet.create({

container: {  
	flex: 1,
	marginTop: 5,
	marginBottom: 5,
	borderColor: '#0099AA',
	borderWidth: 5,
	flexDirection: 'column',
	justifyContent: 'space-evenly',
    alignItems: 'center',
	backgroundColor: '#fff',
			},
headingtext: {
	fontFamily: 'papyrus',
	fontWeight: "100",
	borderColor: '#800000',
	borderWidth: 2,
 	color: "red",
	fontSize: 14,
},
infotext: {
	fontFamily: 'Chalkboard SE',
	fontWeight: "100",
	borderColor: '#800000',
	borderWidth: 2,
 	color: "#0033cc",
	fontSize: 15,
},
timelocationtext: {
	fontFamily: 'Courier New',
	fontWeight: "100",
	borderColor: '#800000',
	borderWidth: 2,
 	color: "#29a329",
	fontSize: 15,
},
contentContainer: {
	paddingVertical: 20,
	backgroundColor: '#ffcc99',
	borderColor: 'pink'

}



})