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
export default class MainPage2 extends Component < Props > {
    render() {
        return (
            <View style={styles.container}>
                <Text>Main page</Text>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
