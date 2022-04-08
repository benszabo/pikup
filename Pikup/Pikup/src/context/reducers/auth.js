import { LOGIN_SUCCESS, LOGIN_LOADING, CLEAR_AUTH_STATE, REGISTER_LOADING } from "../../constants/actionTypes";
import authState from '../initialStates/authState';

const auth = (state, { type, payload }) => {

    switch (type) {
        case REGISTER_LOADING:
            return {
                ...state,
                loading: true,
            };

        case LOGIN_LOADING:
            return {
                ...state,
                loading: true,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload,
                isLoggedIn: true,
            };

        case CLEAR_AUTH_STATE:
            return {
                ...state,
                loading: false,
                data: null,
                isLoggedIn: null,
            };

        default:
            return state;;

    };

}

export default auth;