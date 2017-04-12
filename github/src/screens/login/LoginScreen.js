import React, {Component} from 'react';
import {Button, Text, Image, TextInput, View} from "react-native";

import { connect } from 'react-redux';
import { loginStart, loginEnd, loginError } from '../../actions/LoginActions';
import {FormInput} from "../../validation/FormInput";
import Form from "../../validation/Form";

class LoginScreen extends Component {

    onLogin() {
        this.props.loginStart(this.state.login, this.state.password);
    };

    constructor(props) {
        super(props);
        this.state = {login: '', password: ''}
    }

    form = null;

    renderInputs() {
        const {textInput} = styles;

        return (
            <View>
                <FormInput
                    required
                    style={textInput}
                    name="Login"
                    placeholder='login'
                    onChangeText={(value) => {
                        this.setState({login: value});
                    }}
                />
                <FormInput
                    required
                    name="Password"
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
                <Form ref={(id) => { this.form = id; }}>
                    {this.renderInputs()}
                </Form>
                {this.renderError()}
                <Button title='Login' onPress={() => {
                    if (this.form.validate()) {
                        this.onLogin();
                    }
                }}/>
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
    }
};

const mapStateToProps = (state) => {
    return { error: state.login.error };
};

export default connect(mapStateToProps, { loginStart, loginEnd, loginError })(LoginScreen);