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
import firebase from './Firebase'

var db = firebase.firestore()

type Props = {};
export default class Home extends Component < Props > {

    jumpToLoginPage = () => {
        //navigation.replace(Demo)

        setTimeout(() => {
            this
                .props
                .navigation
                .reset([NavigationActions.navigate({routeName: 'Login'})], 0)

        }, 1000)
    }

getCurrentUser=()=>{
    firebase.auth().onAuthStateChanged((user)=> {
        if (user) {
         this.jumpToMainPage()
        } else {
            this.jumpToLoginPage()
        }
      });
      
}

    jumpToMainPage = () => {

        setTimeout(() => {
            this
                .props
                .navigation
                .reset([NavigationActions.navigate({routeName: 'MainPageScreen2'})], 0)

        }, 1000)
    }

    componentDidMount() {
      this.getCurrentUser()
    }
    render() {
        return (
            <View style={styles.container}>

                <Text
                    style={{
                    fontSize: 30,
                    color: '#fff',
                    backgroundColor: 'rgb(65, 128, 244)',
                    padding: 10,
                    borderRadius: 10,
                    letterSpacing: 5
                }}>

                    Testmart App
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
