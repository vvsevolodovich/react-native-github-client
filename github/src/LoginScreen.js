import React, {Component} from 'react';
import {Button, Text, Image, TextInput, View} from "react-native";

import { Buffer } from 'buffer';

export default class LoginScreen extends Component {

    encode(value) {
        return new Buffer(value).toString('base64');
    }

    onLogin() {
        this.setState({ error : null });
        let base64 = this.encode(`${this.state.login}:${this.state.password}`);
        console.log('fetch: login ' + this.state.login);
        console.log('fetch: base64 ' + base64);
        fetch('https://api.github.com/user/repos', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64
            },
        })
            .then(result => {
                console.log('fetch: ' + JSON.stringify(result));
                if (result.status === 200) {
                    console.log('fetch: success!')
                } else {
                    this.setState({ error: `Failed to login with ${result.status}` })
                }
            })
            .catch(error => {
                console.log('error: ' + JSON.stringify(error));
                this.setState({ error: `Failed to login with ${error}` })
            })
            .done();

    };

    constructor(props) {
        super(props);
        this.state = {login: '', password: '', error: null}
    }

    renderInputs() {
        const {textInput} = styles;

        return (
            <View>
                <TextInput
                    style={textInput}
                    placeholder='login'
                    onChangeText={(value) => {
                        this.setState({login: value});
                    }}
                />
                <TextInput
                    style={textInput}
                    secureTextEntry
                    placeholder='password'
                    onChangeText={(value) => {
                        this.setState({password: value});
                    }}
                />
            </View>);
    }

    renderError() {
        return (this.state.error &&
            <Text style={{fontSize: 14, color: 'red', margin: 16}}>
                {this.state.error}
            </Text>);
    }

    render() {
        const {container, textInput} = styles;

        return (
            <View style={container}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={require('./GitHub-Logo.png')}
                    />
                </View>
                {this.renderInputs()}
                {this.renderError()}
                <Button title='Login' onPress={this.onLogin.bind(this)}/>
            </View>
        )
    }
}

const styles = {
    container: {
        padding: 32,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexGrow: 1
    },
    textInput: {
        margin: 16,
        fontSize: 18,
        color: 'black'
    }
};