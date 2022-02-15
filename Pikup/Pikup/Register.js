import React from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Button } from 'react-native';

const App = () => {
    const Separator = () => (
        <View style={styles.Separator} />
        );
    const styles = StyleSheet.create({
        buttonView: {
            alignSelf: 'center',
            padding: 10,
            width: '80%',
        },
        container: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        color: {
            //backgroundColor: '#D9DDDC',
            backgroundColor: '#D7BFDC',
            padding: 20,
            alignContent: 'center'
        },
        baseText: {
            fontFamily: "Cochin",
            fontSize: 20,
            padding: 3,
            fontWeight: "bold",
            color: 'black'
            //color: '#98FB98'

        },
        titleText: {
            fontFamily: "Comic Sans",
            fontSize: 75,
            fontWeight: "bold",
            color: 'black'
            //color: '#4B382A'
        },
    });
    return (
        <ScrollView style={styles.color}>

            <View style={styles.container}>
                <Text style={styles.titleText}>Register</Text>
                <Image
                    source={require('./assets/dummy.png')}
                    style={{width:100, height:100}}
                />
            </View>
                <Text style={styles.baseText}>Username</Text>
            <TextInput
                style={{
                   // padding: 10,
                    height: 40,
                    borderColor: 'black',
                    borderWidth: 3

                }}
                placeholder="Enter your username..."
            />
                <Text style={styles.baseText}>Password</Text>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'black',
                    borderWidth: 3
                }}
                placeholder="Enter your password..."
            />
            <Text style={styles.baseText}>First Name</Text>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'black',
                    borderWidth: 3
                }}
                placeholder="Enter your first name..."
            />
            <View style={styles.buttonView}>
            </View>
            <View style={styles.buttonView}>
            </View>
            <View style={styles.buttonView}>
            <Button title="Register" />
            </View>
            
        </ScrollView>
    );
}

export default App;