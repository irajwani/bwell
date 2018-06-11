import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    ScrollView,
    View
  } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostComment from './postcomment.js';
var firebase = require("firebase");


function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return seconds == 0 ? "Just now" : Math.floor(seconds) + " seconds";
    
    }

class PostYak extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          postString: '',
          posts: {},
        }
        //this.ref = firebase.database()
      }

    getDB(snapshot) {
        this.setState({posts: snapshot.val()});
        console.log(this.state.posts);
    }  
    
    nextPage(key) {
        this.props.navigation.navigate(
           'postcomment', 
           {time: key, 
            post: this.state.posts[key],
            timeSince: timeSince,
            toggleLike: this.toggleLike.bind(this),
            toggleDislike: this.toggleDislike.bind(this),
            loadComment: this.loadComment.bind(this)}
            );
        // this.props.navigator.push({
        //   title: 'Post',
        //   component: PostResult
        // });
      }

    createPost() {
        //set the key to be the current date timestamp
        var key = Date.now()
        this.state.posts[key] = {
            message : this.state.postString,
            likes : 0,
            dislikes: 0,
            comments : [0: 'example comment'],
            origin_time : new Date()
        };
        this.setState({
            posts : this.state.posts,
            postString : '',
        });
        var updates = {}
        updates['/Posts/' + key] = this.state.posts[key]
        //firebase.database().ref('Posts').set({posts: this.state.posts})
        firebase.database().ref().update(updates)
      }
    
    toggleLike(key, isLiked) {
        var post = this.state.posts[key];
        post.likes += 1
        //post.likes == 0 ? post.likes += 1 : post.likes -= 1;
        this.setState({ posts: this.state.posts });
        var updates = {}
        updates['/Posts/' + key] = this.state.posts[key]
        //firebase.database().ref('Posts').set({posts: this.state.posts})
        firebase.database().ref().update(updates)
        if (isLiked) {
            this.props.navigation.navigate('postcomment', 
               {time: key, 
                post: this.state.posts[key], 
                timeSince: timeSince,
                toggleLike: this.toggleLike.bind(this),
                toggleDislike: this.toggleDislike.bind(this),
                loadComment: this.loadComment.bind(this)})
            }
        }

    toggleDislike(key, isDisliked) {
            var post = this.state.posts[key];
            post.dislikes += 1
            //post.likes == 0 ? post.likes += 1 : post.likes -= 1;
            this.setState({ posts: this.state.posts });
            var updates = {}
            updates['/Posts/' + key] = this.state.posts[key]
            //firebase.database().ref('Posts').set({posts: this.state.posts})
            firebase.database().ref().update(updates)
            if (isDisliked) {
                this.props.navigation.navigate('postcomment', 
                   {time: key, 
                    post: this.state.posts[key], 
                    timeSince: timeSince,
                    toggleLike: this.toggleLike.bind(this),
                    toggleDislike: this.toggleDislike.bind(this),
                    loadComment: this.loadComment.bind(this)})
                }
            }
        
    loadComment(key, comment) {
            this.state.posts[key].comments.push(comment);
            //console.log(this.state.posts[key].comments);
            this.setState({ posts : this.state.posts });
            var updates = {}
            updates['/Posts/' + key] = this.state.posts[key]
            //firebase.database().ref('Posts').set({posts: this.state.posts})
            firebase.database().ref().update(updates)
          }    

    renderPost(key) {
        return (
         <TouchableOpacity key={key} onPress={this.nextPage.bind(this, key)}>  
            <View key={key} style={styles.rowContainer}>
            {/* 1st subview, the message itself */}
                <View style={styles.textContainer}>
                <Text style={styles.time}>{timeSince(key)}</Text>
                <Text> {Date(this.state.posts[key].origin_time)} </Text>
                <Text style={styles.title}>
                    {this.state.posts[key].message}
                </Text>
                </View>
                {/*  2nd subview, the number of likes */}
                <View>
                    <Text style={styles.likes}>{this.state.posts[key].likes}</Text>
                    <Icon   name="caret-up" 
                            size={45} 
                            color={this.state.posts[key].likes == 0 ? '#dddddd' : '#32cd32'}
                            onPress={this.toggleLike.bind(this, key, false)}
                            />
                    <Text style={styles.dislikes}>{this.state.posts[key].dislikes}</Text>
                    <Icon   name="caret-down" 
                            size={45} 
                            color={this.state.posts[key].dislikes == 0 ? '#dddddd' : '#800'}
                            onPress={this.toggleDislike.bind(this, key, false)}
                            />
                    
                </View>
            </View>
         </TouchableOpacity>   
        );
      }
    

    render() {
        
        firebase.database().ref('Posts/').once('value', this.getDB.bind(this), function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        
        var posts = Object.keys(this.state.posts).reverse(); //list new posts first
 
        return ( 
            <ScrollView style={styles.scrollcontainer}>
            
                <Hoshi
                        label={'Post a BatesYak'}
                        value={this.state.postString}
                        onChangeText={(postString) => {this.setState({postString: postString})}}
                        autoCorrect={false}
                        // this is used as active border color
                        borderColor={'#800000'}
                        // this is used to set backgroundColor of label mask.
                        // please pass the backgroundColor of your TextInput container.
                        backgroundColor={'#F9F7F6'}
                        inputStyle={{ color: '#800000' }}
                        maxLength={180}
                        multiline={true}
                    />

                <TouchableHighlight 
                style={styles.button}
                onPress={this.createPost.bind(this)}
                >
                    <Text style={styles.buttonText}>
                    Yak
                    </Text>
                </TouchableHighlight>
                
                {posts.map(this.renderPost.bind(this))}
            
            </ScrollView>
     )
    }


}

export default PostYak
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
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
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 20,
        color: '#000000'

      },

    rowContainer: {
        flexDirection: 'row',
        padding: 10
      },
    
    time: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#89368c'
      },
    
    textContainer: {
        flex: 1
      },

    likes: {color: '#32cd32'}, dislikes: {color: '#800000'}  

  });

// this.state.posts = {
//     (TimePosted) : {
//       message : "..."
//       likes : 0
//       comment : ["...", "..."]
//     },
//     (TimePosted) : {...}
//     (TimePosted) : {...}
//   }  

////how to firstly utilize the iterator property of arrays and objects and secondly create a custom Iterable object:
// const arr = [1,2,3];
// const iter = arr[Symbol.iterator]();
// iter.next();
// keep doing this until array has been exhausted
// const customIterable = {
//     [Symbol.iterator]() {
//         let counter = 0;
//         return {
//             next() {
//                 if (counter < 5) {
//                 counter++;
//                 return { done: false, value: counter };
//                 } else {
//                 return { done: true, value: undefined };
//                 }
//             }
//         }
//     }
// }

// for (const x of customIterable) {
//     console.log(x);
// }