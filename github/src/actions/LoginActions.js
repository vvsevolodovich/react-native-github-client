import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from './ActionTypes';

export const loginStart = () => {
    return { type: LOGIN_START };
};

export const loginEnd = ({ user, auth }) => {
    return { type: LOGIN_SUCCESS, payload: { user, auth } };
};

export const loginError = (error) => {
    return { type: LOGIN_ERROR, payload: error };
};

