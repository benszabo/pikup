import React from 'react';
import { View, Text, Button } from 'react-native';
import Container from '../Container';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import ProfileS from '../../screens/Profile';


const SettingsComponent = () => {
    const { navigate } = useNavigation();
    return (
        <Container style={{}}>
            <Text style={styles.linkText}> Hello from Settings </Text>
            <View style={styles.buttonView}>
                <Button
                    title="Back to Profile"
                    onPress={() => navigate(ProfileS)}
                />
            </View>
        </Container >
    );
}

export default SettingsComponent;