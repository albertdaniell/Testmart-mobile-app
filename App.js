/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";
import HomeScreen from './components/Home'
import Demo from './components/Demo'
import Login from './components/Login'
import MainPage from './components/MainPage'
import MainPage2 from './components/MainPage2'
import Patients from './components/Patients'
import AddPatient from './components/AddPatient'

const TabNavigator = createBottomTabNavigator({
    MainPage: {
        screen: MainPage,
        navigationOptions: {
            header: null
        }
    }
})

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    Demo: {
        screen: Demo,
        navigationOptions: {
            header: null
        }
    },

    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    MainPageScreen2: {
        screen: TabNavigator,
        navigationOptions: {
            title: 'Testmart'
        }
    },
    Patients: {
        screen: Patients,
        navigationOptions: {
            title: 'Patients'
        }
    },
    AddPatient: {
        screen: AddPatient,
        navigationOptions: {
            title: 'Add Patient'
        }
    }

});

const MainPageNavigator = createStackNavigator({Page: MainPage2})

const AppContainer = createAppContainer(AppNavigator);

type Props = {};
export default class App extends Component < Props > {
    render() {
        return (

            <AppContainer></AppContainer>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#F5FCFF'
    }
});
