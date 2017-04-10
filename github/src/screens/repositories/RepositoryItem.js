import React, {Component} from 'react';
import {Text, View} from "react-native";

export default class RepositoryItem extends Component {

    render() {
        const { name, stars } = styles;

        return (
            <View style={{ flexDirection: 'row', margin: 8, flexGrow: 1 }}>
                <Text style={name}>
                    {this.props.name}
                </Text>
                <Text style={stars}>
                    {this.props.stars}
                </Text>
            </View>
        );
    }
}

const styles = {
    name: {
        color: 'black',
        fontSize: 16
    },
    stars: {
        color: 'blue',
        fontSize: 12,
        alignSelf: 'flex-end',
        flexGrow: 1,
        textAlign: 'right'
    }
};
