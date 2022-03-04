import React, { useState } from 'react';
import LoginComponent from '../../components/Login';
import authState from '../../context/initialStates/authState';

const Login = () => {
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
        //webservice call for login
        if (!form.userName) {
            setErrors((prev) => {
                return { ...prev, userName: "*Username is required" };
            });
        }
        else if (!form.password) {
            setErrors((prev) => {
                return { ...prev, password: "*Password is required" };
            });
        }
        else {
            let base64 = require('base-64');
                fetch("https://pikup.herokuapp.com/user/v1/login/" + form.userName + "/" + form.password, {
                    "method": "GET",
                    "headers": {
                        "Authorization": 'Basic ' + base64.encode('admin:admin')
                    }
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response.content);
                        console.log(response.originator.name)
                    })
                    .catch(err => {
                        console.log(err);
                    });
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