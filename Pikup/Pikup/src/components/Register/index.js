import { useNavigation, useState } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Button } from 'react-native';
import styles from '../../components/styles';
import { LOGIN } from '../../constants/routeNames';
import Container from '../Container';
import Input from '../Input';
import envs from '../../config/env'

const RegisterComponent = ({ onSubmit, onChange, form, errors }) => {
    const [value, onChangeText] = React.useState('');
    const { navigate } = useNavigation();
    return (
        <Container>
            <View style={styles.container}>
                <Text style={styles.titleText} >Pikup</Text>
                <Image
                    source={require( '../../assets/pikup.png')}
                    style={{ width: 100, height: 100 }}
                />
            </View>
            <Input
                label="Username"
                placeholder="Enter your username"
                onChangeText={(value) => {
                    onChange({ name: 'userName', value });
                }}
                error={errors.userName}
            />
            <Input
                label="Password"
                placeholder="Enter your password"
                secureTextEntry={true}
                icon={<Text>HIDE</Text>}
                iconPosition="right"
                onChangeText={(value) => {
                    onChange({ name: 'password', value });
                }}
                error={errors.password}
            />
            <Input
                label="First Name"
                placeholder="Enter your First Name"
                onChangeText={(value) => {
                    onChange({ name: 'firstName', value });
                }}
                error={errors.firstName}
            />
            <Input
                label="Last Name"
                placeholder="Enter your Last Name"
                onChangeText={(value) => {
                    onChange({ name: 'lastName', value });
                }}
                error={errors.lastName}
            />
            <Input
                label="Email"
                placeholder="Enter your email"
                onChangeText={(value) => {
                    onChange({ name: 'email', value });
                }}
                error={errors.email}
            />
            <View style={styles.buttonView}>
            </View>
            <View style={styles.buttonView}>
                <Button
                    title="Back to Login"
                    onPress={() => navigate(LOGIN)}
                />
            </View>
            <View style={styles.buttonView}>
                <Button
                    title="Register"
                    onPress={onSubmit}
                />
            </View>
            <View style={{padding: 20 }}>
            </View>
        </Container>
    );
}
export default RegisterComponent;