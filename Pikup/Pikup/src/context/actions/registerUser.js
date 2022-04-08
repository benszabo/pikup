import { CLEAR_AUTH_STATE, REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS } from "../../constants/actionTypes";
import envs from '../../config/env';
import { decode as atob, encode as btoa } from 'base-64';
import axios from 'axios';

const { DEV_BACKEND_URL } = envs;

export const clearAuthState = () => (dispatch) => {
    dispatch({
        type: CLEAR_AUTH_STATE,
    });
};

export default ({email, password, firstName, lastName, userName, } ) => (dispatch) => {
    dispatch({
        type: REGISTER_LOADING,
    });
    var usernameAdmin = 'admin';
    var passwordAdmin = 'admin';
    var basicAuth = 'Basic ' + btoa(usernameAdmin + ':' + passwordAdmin);
    var path = DEV_BACKEND_URL + "user/v1/register/";
    axios(path, {
        headers: { 'Authorization': basicAuth },
        method: 'post',
        url: path,
        data: { // this stuff is wrong fix after deploy
            'username': userName,
            'email': email,
            'password': password,
            'role': 'ADMIN',
        }
    }).then((response) => {
        console.log(response.data);
        console.log(response.status);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            console.log(error.response.data);
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response ? error.response.data : {error: "localError"},
            });
        });
};