import React, { Component } from 'react';
import {View, ListView, Text} from 'react-native';
import RepositoryItem from "./RepositoryItem";

export default class RepositoryList extends Component {

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });

    constructor(props) {
        super(props);
        this.state = { ds: this.ds.cloneWithRows([]) };
    }

    componentWillMount() {
        fetch(this.props.reposUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + this.props.auth
            },
        })
            .then(result => {
                console.log('fetch: ' + JSON.stringify(result));
                if (result.status === 200) {
                    const list = JSON.parse(result._bodyInit);
                    console.log('fetch: success, name = ' + result._bodyInit);
                    this.setState({ ds: this.ds.cloneWithRows(list) })
                } else {
                    this.setState({ error: `Failed to login with ${result.status}` })
                }
            })
            .catch(error => {
                console.log('error: ' + JSON.stringify(error));
                this.setState({ error: `Failed to login with ${error}` })
            })
            .done();
    }

    render() {
        return (<ListView
            enableEmptySections
            dataSource={this.state.ds}
            renderRow={(rowData) => <RepositoryItem
                name={rowData.full_name}
                stars={rowData.stargazers_count}
            />}
        />)
    }
}