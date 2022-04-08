import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import { GlobalContext } from '../context/Provider';

const AppNavContainer = () => {
    const {authState: {isLoggedIn} } = useContext(GlobalContext);
    console.log('isLoggedIn :>> ', isLoggedIn);
    return (
        <NavigationContainer>
            {isLoggedIn ? < HomeNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default AppNavContainer;
