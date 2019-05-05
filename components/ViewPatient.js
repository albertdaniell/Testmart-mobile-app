/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    List,
    ListItem,
    Body,
    Button,
    Picker
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Col, Row, Grid} from 'react-native-easy-grid';
import firebase from './Firebase'

var db = firebase.firestore()

type Props = {};
export default class ViewPatient extends Component < Props > {

    constructor(props) {

        super(props)
        this.state = {
            userid: '',
            pname: '',
            page: '',
            pdate: '',
            pgender: '',
            pid: '',
            ploc: '',
            pphone: '',
            showDetails: true,
            showForm: false,
            antimalaria: '',
            rdtTestYes: null,
            rdTextNo: null,
            rdTest: null,
            test1: '',
            test2: '',
            reason: '',
            amount_paid: '',
            mrdTData: []
        }

    }

    recordTreatment = () => {

        var ref = db
            .collection('patients')
            .doc(this.state.userid)
            .collection('mrdt')
        ref
            .add({
            rdt_test: this.state.rdTest,
            test1_result: this.state.test1,
            test2_result: this.state.test2,
            image: '',
            antimalaria_given: this.state.antimalaria,
            reason: this.state.reason,
            amount_paid: this.state.amount_paid

        })
            .then(snapshot => {

                alert("data has been added")

                this.setState({showDetails: true})
                this.getUserMrdt()

            })
            .catch(error => {
                alert("Error occured")
            })
    }

    onValueChangeAntimalaria = (value : string) => {
        this.setState({antimalaria: value})

    }

    onValueChangeTest1 = (value : string) => {
        this.setState({test1: value})

    }

    onValueChangeTest2 = (value : string) => {
        this.setState({test2: value})

    }

    onValueChangeReason = (value : string) => {
        this.setState({reason: value})

    }

    rdtTestYes = () => {
        this.setState({rdtTestYes: true, rdtTestNo: false, rdTest: true})
    }

    rdtTestNo = () => {
        this.setState({rdtTestNo: true, rdtTestYes: false, rdTest: false})
    }

    getUserMrdt = () => {

        ref = db
            .collection("patients")
            .doc(this.state.userid)
            .collection('mrdt');

        ref
            .get()
            .then(snapshot => {
                const mrdTData = [];
                snapshot.forEach((doc) => {

                    const {antimalaria_given,amount_paid, rdt_test, reason, test1_result, test2_result} = doc.data();
                    mrdTData.push({
                        key: doc.id,
                        doc,
                        amount_paid,
                        rdt_test,
                        reason,
                        test1_result,
                        test2_result,
                        antimalaria_given
                    })

                    //alert(doc.data())
                })

                this.setState({mrdTData})

               // alert(this.state.mrdTData)
            })

    }

    getUserDetails = () => {
        ref = db
            .collection("patients")
            .doc(this.state.userid);
        ref
            .get()
            .then(doc => {
                if (doc.exists) {
                    //alert("yeeeaah")

                    this.setState({
                        pname: doc
                            .data()
                            .fullname,
                        pgender: doc
                            .data()
                            .gender,
                        page: doc
                            .data()
                            .age,
                        pphone: doc
                            .data()
                            .phone,
                        pid: doc
                            .data()
                            .idnumber,
                        ploc: doc
                            .data()
                            .location,
                        pdate: doc
                            .data()
                            .daate
                    })
                } else {
                    alert("shit")
                }
            })
            .catch(error => {
                alert(error)
            })
    }

    dataEntry = () => {
        this.setState({
            showDetails: !this.state.showDetails,
            showForm: !this.state.showForm
        })
    }

    componentDidMount() {
        const {navigation} = this.props;
        const pid = this
            .props
            .navigation
            .getParam('pid', 'NO-ID');

        this.setState({userid: pid})

        setTimeout(() => {
            this.getUserDetails()
            this.getUserMrdt()
        }, 0)

    }
    render() {

        return (
            <View style={{
                height: '100%'
            }}>
                <View
                    style={{
                    backgroundColor: 'rgb(216, 216, 216)',
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text
                        style={{
                        color: 'black',
                        fontSize: 30
                    }}>{this.state.pname}</Text>
                </View>

                {this.state.showDetails
                    ? <ScrollView>
                    <View style={styles.container}>
                            <List>
                                <ListItem itemDivider>
                                    <Text>Gender</Text>
                                </ListItem>
                                <ListItem>
                                    <Body>
                                        <Text>{this.state.pgender}</Text>
                                    </Body>
                                </ListItem>

                                <ListItem itemDivider>
                                    <Text>Age</Text>
                                </ListItem>
                                <ListItem>
                                    <Body>
                                        <Text>{this.state.page}</Text>
                                    </Body>
                                </ListItem>

                                <ListItem itemDivider>
                                    <Text>Location</Text>
                                </ListItem>
                                <ListItem>
                                    <Body>
                                        <Text>{this.state.ploc}</Text>
                                    </Body>
                                </ListItem>

                                <ListItem itemDivider>
                                    <Text>Phone number</Text>
                                </ListItem>
                                <ListItem>
                                    <Body>
                                        <Text>{this.state.pphone}</Text>
                                    </Body>
                                </ListItem>
                            </List>

                            <View
                                style={{
                                padding: 10
                            }}>
                                <Text>

                                    mrDT data
                                </Text>
                                <FlatList
                                    data={this.state.mrdTData}
                                    renderItem={({item}) =>
                                    
                                    
                                   <View>
                                  
                                     
                                     
                                     <View style={{backgroundColor:'rgb(255, 193, 140)',marginLeft:20,padding:10,marginTop:10,marginBottom:10,borderRadius:4}}>
                                     <Text>Test : {item.key}</Text>
                                     {
                                        
                                         item.rdt_test? <View>
                                             
                                         <Text>RDT Test: true</Text>
                                         <Text>RDT Test 1: {item.test1_result}</Text>
                                         <Text>RDT Test 2: {item.test2_result}</Text>

                                         <Text>Antimalaria given: {item.antimalaria_given}</Text>

                                         <Text>Amount: {item.amount_paid}</Text>


                                             </View>:
                                             <View>
                                             
                                         <Text>No RTD test done</Text>
                                         <Text>Reason: {item.reason}</Text>
                                         <Text>Antimalaria given: {item.antimalaria_given}</Text>

                                         <Text>Amount: {item.amount_paid}</Text>

                                             </View>

                                         
                                     }

                                        

                                    </View>
                                   </View>
                                     }/>

                                  
                            </View>

                        </View>
                    </ScrollView>
                    : <ScrollView>
                        <View>
                            <List
                                style={{
                                alignItems: 'center'
                            }}>
                                <ListItem itemHeader>
                                    <Text
                                        style={{
                                        fontSize: 20,
                                        textAlign: 'center'
                                    }}>Data Entry form</Text>

                                </ListItem>
                            </List>

                            <Text
                                style={{
                                fontStyle: 'italic',
                                padding: 10
                            }}>Please fill in this data collection form where neccessary</Text>
                            <Text
                                style={{
                                padding: 10,
                                fontWeight: 'bold'
                            }}>Was an RDT Test done for this patient?</Text>

                            <View
                                style={{
                                flexDirection: 'row',
                                height: 100,
                                padding: 10
                            }}>

                                <View
                                    style={{
                                    flex: 1,
                                    padding: 10
                                }}>
                                    {this.state.rdtTestYes
                                        ? <TouchableOpacity
                                                onPress={this.rdtTestYes}
                                                style={{
                                                backgroundColor: 'rgb(99, 255, 151)',
                                                alignItems: 'center',
                                                padding: 10
                                            }}>
                                                <Text>
                                                    Yes
                                                </Text>
                                            </TouchableOpacity>

                                        : <TouchableOpacity
                                            onPress={this.rdtTestYes}
                                            style={{
                                            backgroundColor: '#ccc',
                                            alignItems: 'center',
                                            padding: 10
                                        }}>
                                            <Text>
                                                Yes
                                            </Text>
                                        </TouchableOpacity>
}

                                </View>
                                <View
                                    style={{
                                    flex: 1,
                                    padding: 10
                                }}>
                                    {this.state.rdtTestNo
                                        ? <TouchableOpacity
                                                onPress={this.rdtTestNo}
                                                style={{
                                                backgroundColor: 'rgb(255, 153, 98)',
                                                alignItems: 'center',
                                                padding: 10
                                            }}>
                                                <Text>
                                                    No
                                                </Text>
                                            </TouchableOpacity>
                                        : <TouchableOpacity
                                            onPress={this.rdtTestNo}
                                            style={{
                                            backgroundColor: '#ccc',
                                            alignItems: 'center',
                                            padding: 10
                                        }}>
                                            <Text>
                                                No
                                            </Text>
                                        </TouchableOpacity>
}
                                </View>

                            </View>

                            {this.state.rdTest
                                ? <View>
                                        <Text
                                            style={{
                                            padding: 10,
                                            fontWeight: 'bold'
                                        }}>What was the result of test 1?</Text>

                                        <View
                                            style={{
                                            height: 100,
                                            padding: 10
                                        }}>
                                            <Item picker>
                                                <Picker
                                                    mode="dropdown"
                                                    placeholder="Choose reason"
                                                    placeholderStyle={{
                                                    color: "#bfc6ea",
                                                    margin: 10
                                                }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={this.state.test1}
                                                    onValueChange={this
                                                    .onValueChangeTest1
                                                    .bind(this)}>
                                                    <Picker.Item label="Test result" value=""/>
                                                    <Picker.Item label="Positive" value="Positive"/>
                                                    <Picker.Item label="Negative" value="Negative"/>
                                                    <Picker.Item label="Invalid" value="Invalid"/>

                                                </Picker>
                                            </Item>

                                        </View>

                                        <Text
                                            style={{
                                            padding: 10,
                                            fontWeight: 'bold'
                                        }}>What was the result of test 2?</Text>

                                        <View
                                            style={{
                                            height: 100,
                                            padding: 10
                                        }}>
                                            <Item picker>
                                                <Picker
                                                    mode="dropdown"
                                                    placeholder="Choose reason"
                                                    placeholderStyle={{
                                                    color: "#bfc6ea",
                                                    margin: 10
                                                }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={this.state.test2}
                                                    onValueChange={this
                                                    .onValueChangeTest2
                                                    .bind(this)}>
                                                    <Picker.Item label="Test result" value=""/>
                                                    <Picker.Item label="Positive" value="Positive"/>
                                                    <Picker.Item label="Negative" value="Negative"/>
                                                    <Picker.Item label="Invalid" value="Invalid"/>

                                                </Picker>
                                            </Item>

                                        </View>

                                        <Text
                                            style={{
                                            padding: 10,
                                            fontWeight: 'bold'
                                        }}>Upload an RDT test result</Text>

                                        <View>
                                            <Text
                                                style={{
                                                padding: 10,
                                                fontStyle: 'italic'
                                            }}>Image will show here</Text>
                                        </View>

                                    </View>
                                : <View>
                                    <Text
                                        style={{
                                        padding: 10,
                                        fontWeight: 'bold'
                                    }}>Give reason why</Text>

                                    <Item picker>
                                        <Picker
                                            mode="dropdown"
                                            placeholder="Choose reason"
                                            placeholderStyle={{
                                            color: "#bfc6ea",
                                            margin: 10
                                        }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.reason}
                                            onValueChange={this
                                            .onValueChangeReason
                                            .bind(this)}>
                                            <Picker.Item label="Choose reason" value=""/>
                                            <Picker.Item label="RDT out of stock" value="out of stock"/>
                                            <Picker.Item label="Client or patient cannot afford RDT" value="Cannot afford"/>

                                        </Picker>
                                    </Item>
                                </View>
}

                            <Text
                                style={{
                                padding: 10,
                                fontWeight: 'bold',
                                marginTop: 20
                            }}>Which Antimalaria have you given the client?</Text>

                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    placeholder="Choose"
                                    placeholderStyle={{
                                    color: "#bfc6ea",
                                    margin: 10
                                }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.antimalaria}
                                    onValueChange={this
                                    .onValueChangeAntimalaria
                                    .bind(this)}>
                                    <Picker.Item label="Choose" value=""/>
                                    <Picker.Item label="QAACT" value="QAACT"/>
                                    <Picker.Item label="Others" value="Other"/>

                                </Picker>
                            </Item>

                            <Text
                                style={{
                                padding: 10,
                                fontWeight: 'bold',
                                marginTop: 20
                            }}>Payment ({this.state.amount_paid})</Text>
                            <Input
                                keyBoardType="number"
                                onChangeText={(amount_paid) => this.setState({amount_paid})}
                                style={{
                                padding: 10,
                                margin: 10,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                marginBottom: 20
                            }}
                                placeholder='Enter the payment amount in number format'/>
                            <Button
                                onPress={this.recordTreatment}
                                style={{
                                width: '100%',
                                alignItems: 'center'
                            }}>
                                <Text
                                    style={{
                                    color: 'white',
                                    width: '100%',
                                    textAlign: 'center'
                                }}>Submit</Text>
                            </Button>

                        </View>
                    </ScrollView>
}

                <View style={styles.floatView}>
                    <TouchableOpacity
                        onPress={this.dataEntry}
                        style={{
                        alignItems: 'center',
                        width: '100%',
                        zIndex: 2
                    }}>
                        <Text
                            style={{
                            color: '#fff',
                            letterSpacing: 2,
                            fontSize: 18
                        }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#F5FCFF',
        height: '100%'
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
    }
});
