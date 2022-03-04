import { useState } from '@react-navigation/native';
import React from 'react';
import styles from '../styles';
import { onChangeText, TextInput, View, icon, Text, flexDirection } from 'react-native';


const Input = ({ onChangeText, icon, iconPosition, style, value, label, placeholder, error, ...props }) => {
    
    const [focused, setFocused] = React.useState(false);
    const getFlexDirection = () => {
        if (icon && iconPosition) {
            if (iconPosition === 'left') {
                return 'row';
            } else if (iconPosition === 'right') {
                return 'row-reverse';
            }
        }
    };
    const getBorderColor = () => {
        if (focused) {
            return '#73C2FB';
        }
        if (error) {
            return 'red';
        }else {
            return 'black';
        }
    };
    return (
        <View style={styles.inputContainer}>
            {label && <Text style={styles.baseText}>{label}</Text>}

            <View
                style={
                    [styles.wrapper,
                    {borderColor: getBorderColor(), flexDirection: getFlexDirection() },
                    {alignItems: icon ? 'center' : 'baseline'}
                ]}>
                <View>{icon && icon}</View>

                <TextInput
                   style={[styles.inputText, style]}
                   value={value}
                   onChangeText={onChangeText}
                   placeholder={placeholder}
                   iconPosition={iconPosition}
                   onFocus={() => {
                       setFocused(true);
                   }}
                   onBlur={() => {
                       setFocused(false);
                   }}
                   {...props}     
                    />
            </View>
            {error && <Text style={styles.errorColor}>{error}</Text>}
        </View>
    );
};

export default Input