import React, { useState } from 'react';
import RegisterComponent from '../../components/Register';
const Register = () => {
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
                return {...prev, email: "*Email is required" };
            });
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