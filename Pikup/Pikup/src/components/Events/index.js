import React from 'react';
import { View, Text } from 'react-native';
import Container from '../Container';
import  BottomTabNavigator from '../../navigations/BottomTabNavigator'
import styles from '../styles';


const EventComponent = () => {
    return (
        <Container style={{}}>
            <Text style={styles.baseText}> Hello from Events </Text>
    </Container >
    );
}

export default EventComponent;