import React, {Component} from 'react';
import {Dimensions, Keyboard, Text, TextInput, TouchableHighlight, View, ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';

class PostComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
          commentString: '',
          visibleHeight: Dimensions.get('window').height,
        }
        this.height = this.state.visibleHeight
        
        //const key = params ? params.time : null
        //console.log(typeof params.timeSince)
        //console.log(params.timeSince(key))
        //console.log(timeSince(key))
        
    }

    componentWillMount () {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
      }

    keyboardWillShow (e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height
        this.setState({visibleHeight: newSize})
      }

    keyboardWillHide (e) {
       this.setState({visibleHeight: Dimensions.get('window').height})
    }

    onCommentTextChanged(event) {
        this.setState({ commentString: event.nativeEvent.text });
    }

    renderComments(key) {
        return (
        <View key={key} style={styles.rowContainer}>
            <View style={styles.textContainer}>
            <Text style={styles.title}>{key}</Text>
            </View>
            <View style={styles.separator}/>
        </View>
        )
    }
    
    render() {

        const {params} = this.props.navigation.state
        return (
            <View style={styles.wrapper} >
            <ScrollView contentContainerStyle={styles.wrapper}>
            <View style={styles.rowContainer}>
               <View style={styles.textContainer}>
                 <Text style={styles.time}>{params.timeSince(params.time)}</Text>
                 <Text style={styles.title}>
                   {params.post.message}
                 </Text>
               </View>
               <View>
                 <Text style = {styles.likes}>{params.post.likes}</Text>
                 <Icon name="caret-up" 
                       size={40} 
                       color={params.post.likes == 0 ? '#dddddd' : '#32cd32'}
                       onPress={params.toggleLike.bind(this, params.time, true)}/>
                 <Text style={styles.dislikes}>{params.post.dislikes}</Text>
                 <Icon name="caret-down" 
                            size={40} 
                            color={params.post.dislikes == 0 ? '#dddddd' : '#800'}
                            onPress={params.toggleDislike.bind(this, params.time, true)}
                            />
               </View>
             </View>
             <View style={styles.separator}/>
             {params.post.comments.map(this.renderComments.bind(this))}
             </ScrollView>
            <View style={{flexDirection : 'row', bottom : this.height - this.state.visibleHeight}} >
                <TextInput 
                value={this.state.commentString}
                placeholder="Comment"
                style={styles.searchInput}
                onChange={this.onCommentTextChanged.bind(this)}/>
                <TouchableHighlight 
                    style={styles.button}
                    underlayColor='green' 
                    onPress={ () => {params.loadComment(params.time, this.state.commentString)
                                     this.setState({commentString: ''})}} >
                <Text style={styles.buttonText}>Reply</Text>
                </TouchableHighlight>
            </View>
           </View>
        )
    }
}

export default withNavigation(PostComment)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    wrapper: {
        flex: 1
      },
    scrollcontainer: {
        padding: 15,
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#32cd32',
        borderRadius: 8,
        color: '#32cd32'
    },

    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
      },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: "#800000",
        width: 100,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

    title: {
        fontSize: 20,
        color: '#656565'
      },

    rowContainer: {
        flexDirection: 'row',
        padding: 10
      },
    
    time: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#32cd32'
      },
    
    textContainer: {
        flex: 1
      },

    separator: {
        height: 1,
        backgroundColor: 'black'
      },

    likes: {color: '#32cd32'}, dislikes: {color: '#800000'}  

  });