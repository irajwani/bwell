import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { CardList } from 'react-native-card-list';
import {human, material, iOSColors} from 'react-native-typography';


export default class Commons extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      isLoading: true 
      
      
    };
  }
  
  
  
  
//http://motyar.info/webscrapemaster/api/?url=http://bates.edu/dining/menu/&xpath=//div[@id=full-menu-wrap]/div/div/div[@class=menu-content]/div[@class=meal-wrap]
  componentDidMount() {
    return fetch(
      'http://motyar.info/webscrapemaster/api/?url=http://bates.edu/dining/menu/&xpath=//div[@id=full-menu-wrap]/div/div/div[@class=menu-content]/div[@class=meal-wrap]'
    ).then(response => response.json()) //convert response to JSON response which creates an object automatically called responseJson
      .then(responseJson => {
        const breakfast = responseJson[0].text.replace(/\t\t\t\t\t\t/, '');
        const lunch = responseJson[1].text.replace(/\t\t\t\t\t\t/, '');
        const dinner = responseJson[2].text.replace(/\t\t\t\t\t\t/, '');
        this.setState(
          { 
            isLoading: false,
            cards: [
                    {
                      id: "0",
                      title: <Text style = {styles.breakfast}> Breakfast </Text> ,
                      picture: require('./images/pancakes.jpeg'),
        
                      content: <Text style={material.body2}>{breakfast}</Text> 
                    },
                    {
                      id: "1",
                      title: <Text style = {styles.lunch}> Lunch Time </Text>,
                     picture: require('./images/lunch.jpeg'),
                      content: <Text style = {material.body2}> {lunch} </Text>
                    },
                    {
                      id: "2",
                      title: <Text style = {styles.dinner}> Supper </Text>,
                      picture: require('./images/dinner.jpeg'),
                      content: <Text style = {material.body2Red}> {dinner} </Text>
                    }
              
                ],
            // Breakfast: breakfast,
            // Lunch: lunch,
            // Dinner: dinner
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
         <CardList cards={this.state.cards} />
      
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
  ,
  breakfast: {
   ...human.title4Object,  
   color: iOSColors.white
    
  }
  ,
  lunch: {
   ...human.title4Object,  
   color: iOSColors.tealBlue
    
  }
  ,
  dinner: {
   ...human.title4Object,  
   color: iOSColors.red
    
  }
  
})

// <Text> Meal: {this.state.Dinner} </Text>