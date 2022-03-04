import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Button, icon } from 'react-native';
import styles from '../../components/styles';
import { REGISTER } from '../../constants/routeNames';
import Input from '../Input';
import envs from '../../config/env'

const LoginComponent = ({ onSubmit, onChange, form, errors }) => {
    const { navigate } = useNavigation();
    return (
        <ScrollView style={styles.color}>
            <View style={styles.container}>
                <Text style={styles.titleText} >Pikup</Text>
                <Image
                    source={require('../../assets/pikup.png')}
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
            //error="*This field is required"
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
            
            <View style={styles.buttonView}>
            </View>
            <View style={styles.buttonView}>
                <Button
                    title="Login"
                    onPress={onSubmit}
                />
            </View>
            <View style={styles.buttonView}>
                <Button
                    title="Register"
                    onPress={() => navigate(REGISTER)}
                />

            </View>
        </ScrollView>
    );
}
export default LoginComponent;