import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from './ActionTypes';

import {encode} from '../util/Util';

export const loginStart = (login, password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_START });
        let base64 = encode(`${login}:${password}`);
        fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64
            },
        })
            .then(result => {
                console.log('fetch: ' + JSON.stringify(result));
                if (result.status === 200) {
                    console.log('fetch: success, name = ' + result.name);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: {
                            user: JSON.parse(result._bodyInit),
                            auth: base64
                        }
                    });
                } else {
                    dispatch({
                        type: LOGIN_ERROR,
                        payload: `Failed to login with ${result.status}`
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: `Failed to login with ${error}`
                });
            })
            .done();
    };
};

export const loginEnd = ({ user, auth }) => {
    return { type: LOGIN_SUCCESS, payload: { user, auth } };
};

export const loginError = (error) => {
    return { type: LOGIN_ERROR, payload: error };
};

