import React from 'react';
import styles from '../styles';
import { View, ScrollView } from 'react-native';

const Container = ({style, children }) => {

    return (
        <ScrollView style = {styles.color}>
            <View style={style}>{children}</View>
        </ScrollView>
        );
};

export default Container;