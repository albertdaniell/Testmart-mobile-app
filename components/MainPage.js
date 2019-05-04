/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
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
export default class MainPage extends Component < Props > {
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.floatView}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('AddPatient')}

                        style={{
                        alignItems: 'center',
                        width:'100%',
                       
                        
                    }}>
                        <Text
                            style={{
                            color: '#fff',
                            letterSpacing: 2,
                            fontSize: 18
                        }}>Add</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('Patients')}
                 style={styles.p1}>

                    <Text
                        style={{
                        color: '#fff',
                        fontSize: 18
                    }}>Patients</Text>
                    <Text
                        style={{
                        color: '#fff',
                        fontSize: 25
                    }}>20</Text>
                    <Image style={{width:70,height:50,position:'absolute',right:10,top:20}} source={require('../android/app/src/main/assets/images/patient.png')}></Image>


                </TouchableOpacity>

                <TouchableOpacity style={styles.p2}>

                    <Text
                        style={{
                        color: '#fff',
                        fontSize: 18
                    }}>Malaria</Text>
                    <Text
                        style={{
                        color: '#fff',
                        fontSize: 25
                    }}>20</Text>

                    <Image style={{width:70,height:50,position:'absolute',right:10,top:20}} source={require('../android/app/src/main/assets/images/malaria.png')}></Image>

                </TouchableOpacity>

                <TouchableOpacity style={styles.p3}>

                    <Text
                        style={{
                        color: '#fff',
                        fontSize: 18
                    }}>Patients</Text>
                    <Text
                        style={{
                        color: '#fff',
                        fontSize: 25
                    }}>20</Text>

                    <Image style={{width:80,height:'100%',position:'absolute',right:10,top:5}} source={require('../android/app/src/main/assets/images/test.png')}></Image>

                </TouchableOpacity>

                <TouchableOpacity style={styles.p4}>

                    <Text
                        style={{
                        color: '#fff',
                        fontSize: 18
                    }}>Patients</Text>
                    <Text
                        style={{
                        color: '#fff',
                        fontSize: 25
                    }}>20</Text>
                </TouchableOpacity>

               

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5FCFF'
    },

    p1: {
        padding: 10,
        backgroundColor: 'rgb(244, 65, 103)',
        borderRadius: 10,
        marginTop: 20,
        height: 120
    },
    p2: {
        padding: 10,
        backgroundColor: 'rgb(244, 208, 65)',
        borderRadius: 10,
        marginTop: 10,
        height: 120
    },
    p3: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        marginTop: 10,
        height: 120
    },
    p4: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        marginTop: 10,
        height: 120
    },
    floatTouch:{
   position:'absolute',
   top:20,
   marginTop:10

        
    },

    floatView: {
        zIndex:1,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(65, 112, 244,.9)',
        padding: 10,
        width:80,
        height:80,
        right:10,
        alignItems:'center',
        flex:1,
        justifyContent:'center',
        borderRadius:100
    },
});
