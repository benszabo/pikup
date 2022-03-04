import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {BOTTOM_TAB_NAVIGATOR, EDITPROFILE, EVENTS, EXPLORE, PROFILE, PROFILE_NAVIGATOR, SETTINGS } from '../constants/routeNames';
import Settings from '../screens/Settings';
import BottomTabNavigator from './BottomTabNavigator';
import EditProfile from '../screens/EditProfile';
import ProfileS from '../screens/Profile';

const HomeNavigator = () => {
    const HomeStack = createNativeStackNavigator();
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name={BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator}></HomeStack.Screen>
            {/*<HomeStack.Screen name={PROFILE_NAVIGATOR} component={ProfileNavigator}></HomeStack.Screen>*/}
    </HomeStack.Navigator>
    );
};
export default HomeNavigator;
