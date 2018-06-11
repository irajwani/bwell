import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import {withNavigation, StackNavigator} from 'react-navigation'
// import axios from 'axios';
import {parseString} from 'react-native-xml2js';

//import XMLParser from 'react-xml-parser';



export default class Nescac extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      Body: ''

    };
    //could place toggle here to change state every few seconds
    //and in general any function to interact with the state with this.seState( which takes a second argument to represent time to perform this.setState())

  }

  
  componentDidMount() {
    let {params} = this.props.navigation.state;
    console.log(typeof params.selection);
    var title = 'hello' // step two achieved. FUNCTION SCOPE: Define variable you wish to be populated inside a function nested within this function beforehand within the outer function;
    function fetchListener() { //function we attach to the XMLHttpRequest as an EventListener

      const xml = this.responseText;

       //FINALLY OUTSIDE THE PARSE FUNCTION



      //alert(this.readyState);
      //return title;
      //alert(title); //so far I can get variable here in the reqListener function but of course I still can't use setState
      //this.setState({body: title})
      //var title = body.rss.channel[0].item[2].title.toString();
      //Step one achieved

} //now we're out of the reqListener function

//this.setState({body: title});
var url = `http://www.nescac.com/sports/${params.selection}/2017-18/schedule?print=rss`;
var request = new XMLHttpRequest(); //Ahh, another Constructor
request.addEventListener("load", fetchListener);
//attach your own function as the second argument to dictate whatever you wish to perform with the XML information
//request.addEventListener("loadend", parseListener);

//fb logic,
request.onreadystatechange = (e) => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
      //alert(request.readyState);
      var title_1 = '';
      var title_2 = '';
      var title_3 = '';
      var desc_1 = '';
      var desc_2 = '';
      var desc_3 = '';
      var date_1 = '';
      var date_2 = '';
      var date_3 = '';
      //var body = '';

      var single_item = [];


      parseString(request.responseText, {trim: true}, function (err, result) {
                              //const json = JSON.stringify(result, '\t');
                             // var json = result.json();

                             var body = JSON.parse(JSON.stringify(result, '\t')).rss.channel[0];
                             //TAKE ONE ELEMENT ONLY
                             //SO the question is: how does one do the below process sequentially for individual objects in state by iterating over the elements below and store them in each of those keys. CLASSIC ONE LINER

                            // for (let title in body.item) {
                            //                                             }
                              //wbody.item.map     //[2].description.toString();
                              //alert(typeof body.item[2].description.toString());
                              //test = JSON.stringify(body);

                              //FUNDAMENTAL MAP PROCEDURE FOR LOOP:
                              //I know custom components can have a prop with Key and the <View /> scene allows it but how does one apply this principle otherwise?
                              // body.item.map( (i, key) => (

                              //   alert(i.description.toString())

                              //   ) );





                              //alert(body.item[2];

                              single_item = body.item;

                              title_1 = body.item[body.item.length - 1].title.toString();
                              desc_1 =  body.item[body.item.length - 1].description.toString();
                              date_1 =  body.item[body.item.length - 1].pubDate.toString();


                              title_2 = body.item[body.item.length - 2].title.toString();
                              desc_2 =  body.item[body.item.length - 2].description.toString();
                              date_2 =  body.item[body.item.length - 2].pubDate.toString();

                              title_3 = body.item[body.item.length - 3].title.toString();
                              desc_3 =  body.item[body.item.length - 3].description.toString();
                              date_3 =  body.item[body.item.length - 3].pubDate.toString();


                              return single_item, title_1, title_2, title_3, desc_1, desc_2, desc_3, date_1, date_2, date_3, body;
                               })
      //alert(text);


      return this.setState(
        {
        title_1: title_1,
        title_2: title_2,
        title_3: title_3,
        date_1: date_1,
        date_2: date_2,
        date_3: date_3,
        desc_1: desc_1,
        desc_2: desc_2,
        desc_3: desc_3,
      }
      );
  } else {
    alert(request.status);
  }
};




request.open("GET", url, /* async = */ true)
//request.responseType = "document";
request.responseType = "";
request.send();


//this.props.imad = title;
// .then(title => {
//   this.setState({
//     body: title,
//   })

// });


//xml fetch setup done, now extract xml text
//alert(request.responseText)
//var athletics_xml = request.responseText;
//var parsed_xml = new XMLParser().parseFromString(athletics_xml)
// var title = parsed_xml.getElementsByTagName('title')

// this.setState({
//   isLoading: false,
//   Sports: athletics_xml
// });

// alert(body.readyState);

  }



  render() {
    //this.props.title = 'yo I always win'
    var xml = 'booga wooga wooogaaaa'//this.state.Sports;
// parseString(xml, function (err, result) {
//     alert( result.text() );
// });

    //brilliant use of isLoading
    if (this.state.isLoading) { //basically keep the activity ActivityIndicator running until the state is set after a successful Fetch request
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <View style={styles.container}>



      <Text style={styles.infotext}> Details: {this.state.desc_1} </Text>
      <Text style={styles.timelocationtext}> When: {this.state.date_1} </Text >
      

      <Text style={styles.infotext}> Details: {this.state.desc_2} </Text>
      <Text style={styles.timelocationtext}> When: {this.state.date_2} </Text>
      
      <Text style={styles.infotext}> Details: {this.state.desc_3} </Text>
      <Text style={styles.timelocationtext}> When: {this.state.date_3} </Text>





      </View>

      //new theory:

//       <View>
//     { this.state.Body.item.map((item) => (
//     <View>
//       <Text>{item.title.toString()}</Text>

//     </View>
//   )) }
// </View>


    );
  }
}

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
    borderColor: 'green',
    borderWidth: 2,
     color: "#b30000",
    fontSize: 15,
  },
  contentContainer: {
    paddingVertical: 20,
    backgroundColor: '#ffcc99',
    borderColor: 'pink'
  
  }
  
  
  
  })
