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
    FlatList,
    Image,
    ActivityIndicator,
    YellowBox
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {
    Container,
    Header,
    Title,
    Content,
    Form,
    Item,
    Label,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,

    Tabs,
    Tab,
    TabHeading,
    List,
    ListItem,
    Input,
    Grid,
    Col
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firebase from './Firebase';

var db = firebase.firestore()

type Props = {};
export default class MainPage2 extends Component < Props > {

    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings(['Setting a timer']);

            

        this.state = {
            patients: [],
            isLoading: true,
            useremail: '',
            private_sector:'',
        }
    }

    getCurrentUser = () => {
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    // alert(user.email)

                    this.setState({useremail: user.email})

                   // alert(this.state.useremail)

                    //get the current private_sector

                    db
                        .collection("users")
                        .where("email", "==", this.state.useremail)
                        .get()
                        .then(querySnapshot => {
                            // alert(querySnapshot.size)

                            if (querySnapshot.size >= 1) {
                                //alert("heheh")
                               // alert(querySnapshot.data())

                               querySnapshot.forEach(doc=>{

                                this.setState({
                                    private_sector: doc.data().fullname
                                })
                               })


                              // alert(this.state.private_sector)
                            } else {
                              //  alert(0)
                            }

                        })
                        .catch(error => {
                            alert(error)
                        })
                } else {
                   // alert(0)
                    // this.jumpToLoginPage()
                }
            });

    }

    componentDidMount() {
        this.getCurrentUser()
       setTimeout(()=>{
        this.getAllPatients()
       },2000)

    }

    func = () => {
        alert(0)
    }

    getAllPatients = () => {

        const patients = [];

        var ref = db.collection("patients")

        getPatientsRef = ref.where("private_sector","==",this.state.private_sector)
            .get()
            .then(querySnapshot => {

                //alert(querySnapshot.size)

                querySnapshot.forEach(doc => {

                    // alert(doc.data().age) this.setState({     patients:doc.data() })
                    const {fullname, phone, age, private_sector, gender} = doc.data();
                    //     // alert(doc.data())    // alert(0)
                    patients.push({
                        key: doc.id,
                        doc,
                        fullname,
                        phone,
                        age,
                        gender,
                        private_sector

                    })

                    //alert("heheh")    alert(0)

                    this.setState({patients, isLoading: false})

                })

            })
            .catch(error => {})
    }

    pull = () => {
        this.getAllPatients()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.floatView}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddPatient')}
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
                {/* {
                   this.state.isLoading?
               <View style={{flex:1,justifyContent:'center',alignItems:'center',heigh:'100%'}}>

                   <ActivityIndicator size="large" color="#0000ff" />
                   </View>
                   :null


            } */}

                <FlatList
                    onRefresh={this.pull}
                    refreshing={this.state.isLoading}
                    data={this.state.patients}
                    renderItem={({item}) => <ListItem avatar>
                    <Left>
                        <Image
                            style={{
                            width: 50,
                            height: 40
                        }}
                            source={require('../android/app/src/main/assets/images/patient.png')}></Image>
                    </Left>
                    <Body>
                        <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('ViewPatient',{
                            pid:item.key
                        })}
                        >
                            <Text
                                style={{
                                marginBottom: 5,
                                padding: 2
                            }}>{item.fullname} </Text>
                        </TouchableOpacity>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward"/>
                    </Right>
                </ListItem>}/>

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
    }
});
