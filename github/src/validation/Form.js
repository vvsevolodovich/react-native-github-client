import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

export default class Form extends Component {

    static childContextTypes = {
        register: PropTypes.func.isRequired,
        unregister: PropTypes.func.isRequired,
        components: PropTypes.object,
        errors: PropTypes.object,
        validateState: PropTypes.func.isRequired
    };

    static contextTypes = {
        i18n: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);

        this.components = {};
        this.state = {
            errors: {}
        };
    }

    getChildContext() {
        return {
            register: this.register,
            unregister: this.unregister,
            components: this.components,
            errors: this.state.errors,
            validateState: this.validateState
        };
    }

    getErrors() {
        return Object.keys(this.components).reduce((errors, name) => {
            const component = this.components[name];

            if (component.props.required && !component.state.value) {
                errors[name] = `${this.context.i18n(name)} ${this.context.i18n('required')}`;
            }

            return errors;
        }, {});
    }

    register = (component) => {
        this.components[component.props.name] = component;
    };

    unregister = (component) => {
        const errors = Object.assign({}, this.state.errors);

        delete this.components[component.props.name];
        delete errors[component.props.name];

        this.setState({ errors });
    };

    validate() {
        const errors = this.getErrors();
        this.setState({ errors });

        Object.keys(this.components).forEach((name) => {
            this.components[name].setState({
                isUsed: true,
                isChanged: true,
                error: errors[name]
            });
        });
        console.log('[Form] errors ' + JSON.stringify(errors));

        return Object.keys(errors).length === 0;
    }


    validateState = (component) => {

        const name = component.props.name;

        if (name) {
            let error = undefined;
            if (component.props.required && !component.state.value) {
                error = `${name}${strings.formValidation.required}`;
            }

            this.setState({
                errors: {
                    ...this.state.errors,
                    [name]: error
                }
            });

            component.setState({ error });
        }
    };

    render() {
        const errorLabels = Object.values(this.state.errors).map((error) => {
            return (<Text key={error} style={{ color: 'red' }}>{error}</Text>);
        });

        return (
            <TouchableWithoutFeedback style={this.props.style} onPress={this.validate.bind(this)}>
                <View style={{ flexGrow: 1 }}>
                    {this.props.children}
                </View>
            </TouchableWithoutFeedback>);
    }
}
