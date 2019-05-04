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
    Input,
    Picker,
    Icon
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firebase from './Firebase'

var db = firebase.firestore()

type Props = {};
export default class AddPatient extends Component < Props > {

    constructor(props) {
        super(props);
        this.state = {
            gender: undefined,
            age: '',
            location: '',
            idnumber: '',
            phone: '',
            private_sector: '',
            fullname: ''
        };
    }

    checkPatientExixt = () => {}

    addPatient = () => {

        // return 0

        if (this.state.fullname == '' || this.state.gender == undefined) {
            alert("Please fill in all fields")

            return 0;
        } else {

            var ref = db.collection("patients")
            var patientref = ref.where("idnumber", "==", this.state.idnumber)
            patientref
                .get()
                .then((querySnapshot) => {

                    var number = querySnapshot.size

                    if (number >= 1) {

                        alert("A patient already exists with that id number")
                        return 0;
                    } else {

                        var ref = db.collection("patients")

                        ref
                            .add({
                            fullname: this.state.fullname,
                            gender: this.state.gender,
                            age: this.state.age,
                            location: this.state.location,
                            idnumber: this.state.idnumber,
                            phone: this.state.phone,
                            private_sector: '',
                            date: ''
                        })
                            .then(() => {
                                alert("Patient has been addeed successfully!")
                            })
                            .catch(error => {
                                alert("an error occured")
                            })
                    }

                })

        }

    }

    onValueChange2(value : string) {
        this.setState({gender: value});
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.myform}>
                    <Item>
                        <Input
                            onChangeText={(fullname) => this.setState({fullname})}
                            style={styles.myInput}
                            placeholder="Patient Name"/>
                    </Item>

                    <Item picker>
                        <Picker
                            mode="dropdown"
                            style={styles.myInput2}
                            placeholder="Select your SIM"
                            placeholderStyle={{
                            color: "#bfc6ea"
                        }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.gender}
                            onValueChange={this
                            .onValueChange2
                            .bind(this)}>
                            <Picker.Item label="Choose Gender" value=""/>
                            <Picker.Item label="Male" value="Male"/>
                            <Picker.Item label="Female" value="Female"/>

                        </Picker>
                    </Item>
                    <Item last>
                        <Input
                            onChangeText={(age) => this.setState({age})}
                            style={styles.myInput}
                            placeholder="Age"/>
                    </Item>

                    <Item>
                        <Input
                            onChangeText={(location) => this.setState({location})}
                            style={styles.myInput}
                            placeholder="Location"/>
                    </Item>

                    <Item>
                        <Input
                            onChangeText={(idnumber) => this.setState({idnumber})}
                            style={styles.myInput}
                            placeholder="Id number"/>
                    </Item>

                    <Item>
                        <Input
                            onChangeText={(phone) => this.setState({phone})}
                            style={styles.myInput}
                            placeholder="Phone"/>
                    </Item>

                </View>

                <TouchableOpacity onPress={this.addPatient} style={styles.myTouch}>
                    <Text style={styles.myTouchText}>Next</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 5,
        backgroundColor: '#F5FCFF'
    },

    myform: {
        backgroundColor: '#ccc',
        padding: 20,
        borderRadius: 10
    },

    floatView: {
        zIndex: 1,
        position: 'absolute',
        bottom: 30,
        backgroundColor: 'rgba(65, 112, 244,.9)',
        padding: 10,
        width: 80,
        height: 80,
        right: 10,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        borderRadius: 100
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

    },
    myInput: {
        height: 50,
        padding: 10,
        marginTop: 20,

        borderBottomWidth: 1,
        borderBottomColor: 'black'

    },
    myInput2: {
        height: 50,

        marginRight: 0,
        padding: 10,
        marginTop: 20
    }
});
