import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from '../actions/ActionTypes';

const INITIAL_STATE = {
    user: null,
    auth: null,
    error: null,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_START:
            return { ...state, loading: true };
        case LOGIN_ERROR:
            return { loading: false, error: action.payload };
        case LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.payload.user,
                auth: action.payload.auth,
                error: null
            };
        default:
            return INITIAL_STATE;
    }
}