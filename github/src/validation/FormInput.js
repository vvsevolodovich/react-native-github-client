
import React, { Component, PropTypes } from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

class FormInput extends Component {

    static contextTypes = {
        register: PropTypes.func,
        unregister: PropTypes.func,
        errors: PropTypes.objectOf(PropTypes.string),
        validateState: PropTypes.func,
        i18n: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);

        if (context && context.register) {
            context.register(this);
        }

        this.state = { error: null };
    }

    componentWillUnmount() {
        if (this.context && this.context.unregister) {
            this.context.unregister(this);
        }
    }

    applyValue(newValue) {
        this.setState({ isUsed: true, value: newValue }, () => {
            if (this.context && this.context.validateState) {
                this.context.validateState(this);
            }
            this.props.onChangeText(newValue);
        });
    }

    input = null;

    render() {
        const { textInputStyle } = styles;
        const isInvalid = !!this.state.error;
        let applyTextInputStyle = textInputStyle;

        return (
            <View style={[{ flexDirection: 'column', justifyContent: 'flex-end', flexGrow: 1 }, this.props.style]}>
                <TextInput
                    secureTextEntry={this.props.secureTextEntry}
                    textInputStyle={applyTextInputStyle}
                    placeholder={this.context.i18n(this.props.placeholder)}
                    value={this.state.value || this.props.defaultValue}
                    keyboardType={this.props.keyboardType}
                    onChangeText={(newValue) => {
                            this.applyValue(newValue);
                        }
                    }
                />
                {isInvalid && <Text style={{ marginTop: 20, color: 'red', fontSize: 12 }}>{this.state.error}</Text>}
            </View>
        );
    }
}

const styles = {
    textInputStyle: {
        height: 32,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Roboto-Regular'
    },
    requiredStyle: {
        fontSize: 12,
        color: '#F00',
        fontFamily: 'Roboto-Regular'
    }
};

export { FormInput };
