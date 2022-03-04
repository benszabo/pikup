import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import { CONTACT_DETAIL, CONTACT_LIST, CREATE_CONTACT, EDITPROFILE, EVENTS, EXPLORE, PROFILE, SETTINGS } from '../constants/routeNames';
import Settings from '../screens/Settings';
import Events from '../screens/Events';
import Explore from '../screens/Explore';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import ProfileS from '../screens/Profile';

const ProfileNavigator = () => {
    const ProfileStack = createNativeStackNavigator();
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={PROFILE}>
            <ProfileStack.Screen name={EDITPROFILE} component={EditProfile}></ProfileStack.Screen>
            <ProfileStack.Screen name={PROFILE} component={ProfileS}></ProfileStack.Screen>
            <ProfileStack.Screen name={SETTINGS} component={Settings}></ProfileStack.Screen>
        </ProfileStack.Navigator>
    );
};
export default ProfileNavigator;
