import React, { Component } from 'react';
import {Button, Image, TextInput, View} from "react-native";

export default class LoginScreen extends Component {

    onLogin() {
        console.log('Hello!')
    };

    constructor(props) {
        super(props);
        this.state = { login: '', password: '' }
    }

    render() {
        const { container, textInput } = styles;

        return (
            <View style={container}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('./GitHub-Logo.png')}
                    />
                </View>
                <TextInput
                    style={textInput}
                    placeholder='login'
                    onTextChanged={(value) => {
                        this.setState({ login: value });
                    }}
                />
                <TextInput
                    style={textInput}
                    secureTextEntry
                    placeholder='password'
                    onTextChanged={(value) => {
                        this.setState({ password: value });
                    }}
                />
                <Button title='Login' onPress={this.onLogin.bind(this)} />
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