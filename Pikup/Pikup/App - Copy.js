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
    let options = {
        title: 'Select Image',
        customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    return (
        <ScrollView style={styles.color}>

            <View style={styles.container}>
                <Image
                    //make this a link user
                    source={{ uri: 'https://i.imgur.com/277Rb3w.png' }}
                    style={{ width: 100, height: 100 }}
                />
                <Text style={styles.baseText}>@FirstName</Text>
            </View>
            
            <View style={styles.buttonView}>
                <Button title="Edit Profile" />
            </View>


            <View style={styles.buttonView}>
            </View>
            <View style={styles.buttonView}>
            </View>


        </ScrollView>
    );
}

export default App;