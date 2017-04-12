import React, { Component, PropTypes } from 'react';
import {View} from "react-native";

export default class Localization extends Component {

    static childContextTypes = {
        i18n: PropTypes.func,
    };

    getChildContext() {
        return {
            i18n: this.getString.bind(this)
        };
    }

    i18n = {
        es: {
            login: 'El nombre del usuario',
            password: 'La contracena',
            required: 'es obligatorio'
        },
        en: {
            login: 'Login',
            password: 'Password',
            required: 'is required'
        }
    };

    getString(key) {
        return this.i18n[this.props.lang][key];
    }

    constructor(props) {
        super(props);
        this.lang = props.lang;
    }

    render() {
        return (
            <View>
            {this.props.children}
        </View>)
    }


}