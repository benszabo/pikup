import React, { useContext, useEffect, useState } from 'react';
import RegisterComponent from '../../components/Register';
import envs from '../../config/env';
import registerUser from '../../context/actions/registerUser';
import { GlobalContext } from '../../context/Provider';
import axiosInstance from '../../helpers/axiosInstance';

const Register = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const { authDispatch } = useContext(GlobalContext);
    const { DEV_BACKEND_URL } = envs;

    console.log('BACKEND_URL: >> ', DEV_BACKEND_URL);
    console.log('BACKEND_URL: >> ', authDispatch);
    

    const onChange = ({ name, value }) => {
        setForm({ ...form, [name]: value });

        if (value !== '') {
            setErrors((prev) => {
                return { ...prev, [name]: null };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, [name]: '*Field is required' };
            });
        }
    };
    const onSubmit = ({ name, value }) => {
        //webservice call for account creation
        

        console.log('form :>> ', form);

        if (!form.userName) {
            setErrors((prev) => {
                return {...prev, userName: "*Username is required" };
            });
        }
        if (!form.password) {
            setErrors((prev) => {
                return {...prev, password: "*Password is required" };
            });
        }
        if (!form.firstName) {
            setErrors((prev) => {
                return {...prev, firstName: "*First Name is required" };
            });
        }
        if (!form.email) {
            setErrors((prev) => {
                return { ...prev, email: "*Email is required" };
            });
        }
        if (Object.values(form).length > 3) {
            registerUser(form)(authDispatch);
        }
    };
    return (
        <RegisterComponent
            onSubmit={onSubmit}
            onChange={onChange}
            form={form}
            errors={errors}
        />
    );
};
export default Register;