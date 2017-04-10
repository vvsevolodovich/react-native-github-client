import React, {Component} from 'react';
import {Button, Text, Image, TextInput, View} from "react-native";

import { connect } from 'react-redux';
import { loginStart, loginEnd, loginError } from '../../actions/LoginActions';

class LoginScreen extends Component {

    onLogin() {
        this.props.loginStart(this.state.login, this.state.password);
    };

    constructor(props) {
        super(props);
        this.state = {login: '', password: ''}
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
        return (this.props.error &&
            <Text style={{fontSize: 14, color: 'red', margin: 16}}>
                {this.props.error}
            </Text>);
    }

    render() {
        const {container, textInput} = styles;

        return (
            <View style={container}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={require('./../../GitHub-Logo.png')}
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

const mapStateToProps = (state) => {
    return { error: state.login.error };
};

export default connect(mapStateToProps, { loginStart, loginEnd, loginError })(LoginScreen);