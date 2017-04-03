
import React, { Component } from 'react';

import LoginScreen from "./src/LoginScreen";
import Repositories from "./src/RepositoriesScreen";
import {View} from "react-native";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { user : undefined, auth: undefined }
    }

    render() {
        return (
            <View>
                {this.state.user && <Repositories user={this.state.user} auth={this.state.auth} />}
                {!this.state.user && <LoginScreen
                    onLogin={(user, auth) => {
                        console.log(`[App] user = ${JSON.stringify(user)}`);
                        this.setState({ user, auth });
                    }}/>}
            </View>);
    }
};
