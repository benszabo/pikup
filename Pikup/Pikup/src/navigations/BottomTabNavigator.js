import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EVENTS, EXPLORE, PROFILE, PROFILE_NAVIGATOR, SETTINGS } from '../constants/routeNames';
import Events from '../screens/Events';
import Explore from '../screens/Explore';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import styles from '../components/styles';
import ProfileNavigator from './ProfileNavigator';
import Icon from '../components/Icon';



const BottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="PROFILE"
            screenOptions={{
                headerShown: false,
                //tabBarActiveBackgroundColor: '#73C2FB',
                tabBarActiveTintColor: '#73C2FB',
                tabBarInactiveTintColor: '#702963',
                tabBarStyle: {height: 60, position: 'absolute', left: 20, right: 20, bottom: 20, borderRadius: 15,  }
            }}
        >
            <Tab.Screen name={EVENTS} component={Events}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon type="faIcon5" size={25} name="football-ball" style={{ color: focused ? '#73C2FB' : '#702963' }} />
                        )
                }}
            />
            <Tab.Screen name={EXPLORE} component={Explore}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon type="materialIcon" size={30} name="explore" style={{color: focused ? '#73C2FB' : '#702963' }} />
                )
            }}
            />
            <Tab.Screen name={PROFILE_NAVIGATOR} component={ProfileNavigator}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Icon type="materialCommunityIcon" size={30} name="human-greeting-variant" style={{ color: focused ? '#73C2FB' : '#702963' }}/>
                )
            }}
            />
        </Tab.Navigator>
    );
};
export default BottomTabNavigator;
