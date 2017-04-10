import React, { Component } from 'react';
import {Text, View} from 'react-native';
import RepositoryList from "./RepositoryList";

export default class Repositories extends Component {

    constructor(props) {
        super(props);
        console.log('[Repositories] props = ' + JSON.stringify(props));
    }

    render() {
        const { header } = styles;

        const name = this.props.user.name;
        const reposUrl = this.props.user.repos_url;
        const auth = this.props.auth;

        return (
            <View>
                <Text style={header}>{name}</Text>
                <RepositoryList reposUrl={reposUrl} auth={auth} />
            </View>
        );
    }
}

const styles = {
    header: {
        margin: 8,
        padding: 8,
        fontSize: 14,
        color: 'black',
        borderWidth: 2,
        borderColor: 'black'
    }
};
