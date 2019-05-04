/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firebase from './Firebase'

var db = firebase.firestore()

type Props = {};
export default class Login extends Component < Props > {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    jumpToMainPage = () => {
        //navigation.replace(Demo)

        setTimeout(() => {
            this
                .props
                .navigation
                .reset([NavigationActions.navigate({routeName: 'MainPageScreen2'})], 0)

        }, 100)
    }

    loginFn = () => {

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {

                this.jumpToMainPage()
                //alert("hehe, success")
                console.log("USer sign in success")

            })
            .catch(error => {
                alert(error)
                console.log(error)
            })

    }

    componentDidMount() {}

    render() {
        return (
            <View style={styles.container}>

                <Text
                    style={{
                    fontSize: 20,
                    padding: 20
                }}>

                    Login
                </Text>

                <Item>
                    <Input
                        onChangeText={(email) => this.setState({email})}
                        style={styles.myInput}
                        placeholder="Username"/>
                </Item>
                <Item last>
                    <Input
                        onChangeText={(password) => this.setState({password})}
                        style={styles.myInput}
                        placeholder="Password"/>
                </Item>

                <TouchableOpacity onPress={this.loginFn} style={styles.myTouch}>
                    <Text style={styles.myTouchText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20

    },
    myInput: {
        height: 50,
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#ededed',
        borderWidth: 0,
        borderBottomColor: '#fff'

    },
    myTouch: {
        backgroundColor: 'rgb(0, 173, 167)',
        margin: 2,
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 10
    },

    myTouchText: {
        padding: 20,
        color: '#fff',
        fontSize: 15

    }

});
