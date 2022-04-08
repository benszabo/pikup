import {LOGIN_SUCCESS, LOGIN_LOADING} from '../../constants/actionTypes';
import envs from '../../config/env';
import { decode as atob, encode as btoa } from 'base-64';
import axios from 'axios';

const { DEV_BACKEND_URL } = envs

export default ({ userName, password }) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING,
    });
    var usernameAdmin = 'admin';
    var passwordAdmin = 'admin';
    var basicAuth = 'Basic ' + btoa(usernameAdmin + ':' + passwordAdmin);
    var path = DEV_BACKEND_URL + "user/v1/login/" + userName + '/' + password;
    axios(path,{
        headers: { 'Authorization': basicAuth },
        method: 'get',
        url: path
    }).then((response) => {
        console.log(response.status);
        console.log(response.data);
        if (response.status == '200') {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data,
            });
        }

    },
        (error) => {
            console.log(error.response.data);
        }
    );
    console.log(path);
        };