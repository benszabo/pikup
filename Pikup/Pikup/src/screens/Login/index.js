import React, { useState, Component, useContext } from 'react';
import LoginComponent from '../../components/Login';
import loginUser from '../../context/actions/loginUser';
import { GlobalContext } from '../../context/Provider';


const Login = () => {
    const { authDispatch, authState: { error, loading }, } = useContext(GlobalContext);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

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
        //validations
        console.log('form :>> ', form);
       
        if (!form.userName) {
            setErrors((prev) => {
                return { ...prev, userName: "*Username is required" };
            });
        }
        if (!form.password) {
            setErrors((prev) => {
                return { ...prev, password: "*Password is required" };
            });
        }
         //webservice call for login
        if (Object.values(form).length === 2) {
            loginUser(form)(authDispatch);
        }        
    };
        return (
            <LoginComponent
                onSubmit={onSubmit}
                onChange={onChange}
                form={form}
                errors={errors}
            />
        );
    };
export default Login;