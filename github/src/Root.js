import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View} from "react-native";
import Repositories from "./screens/repositories/RepositoriesScreen";
import LoginScreen from "./screens/login/LoginScreen";

class Root extends Component {

    state = { user: null, props: null };

    componentWillReceiveProps(newProps) {
        this.setState({ user: newProps.user, auth: newProps.auth });
    }

    render() {
        return (
            <View>
                {this.state.user && <Repositories user={this.state.user} auth={this.state.auth}/>}
                {!this.state.user && <LoginScreen />}
            </View>);
    }
}

const mapStateToProps = (state) => {
    let loginState = state.login;
    return {
        user: loginState.user,
        auth: loginState.auth
    };
};

export default connect(mapStateToProps, null)(Root);