import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import styles from '../../styles';
import {firebaseApp} from './authentication';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            result: ''
        };
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({result: ''});
                this.props.navigator.push({name: 'topics'});
            }
        });
    }

    signIn(){
        let {email, password} = this.state;

        firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
            this.setState({result: error.message});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.feedback}>{this.state.result}</Text>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.setState({email: text})}/>
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        secureTextEntry={true}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.setState({password: text})}/>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.signIn()}>
                        <Text style={styles.button}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.links}>
                    <TouchableOpacity
                        onPress={() => this.props.navigator.push({name: 'signUp'})}>
                        <Text style={styles.link}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.link}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
