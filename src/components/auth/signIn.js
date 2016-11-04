import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import styles from '../../styles';
import { firebaseApp } from './authentication';

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
            if (user) {
                this.setState({ result: '' });
                this.props.navigator.push({ name: 'Topics' });
            }
        });
    }

    signIn() {
        const { email, password } = this.state;

        firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
            this.setState({ result: error.message });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.mainTitle}>Answer Me</Text>
                <Text style={styles.feedback}>{this.state.result}</Text>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onChangeText={(email) => this.setState({ email })} />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    onChangeText={(password) => this.setState({ password })} />
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.signIn()}>
                    <Text style={styles.button}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.links}>
                    <TouchableOpacity
                        onPress={() => this.props.navigator.push({ name: 'SignUp' })}>
                        <Text style={styles.link}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigator.push({ name: 'ForgotPassword' })}>
                        <Text style={styles.link}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
