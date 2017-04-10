import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import Provider from "react-redux/src/components/Provider";

import reducers from './src/reducers';
import Root from "./src/Root";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {user: undefined, auth: undefined}
    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Root />
            </Provider>);
    }
};
