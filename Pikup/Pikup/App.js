import React from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

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
                
                <Image
                    //make this a link user
                   source={require('./assets/dummy.png')}
                    style={{ width: 100, height: 100 }}
                />
                <Text style={styles.baseText}>@FirstName</Text>
            </View>

            <View style={styles.buttonView}>
                <Button title="Edit Profile" />
            </View>


            <View style={styles.buttonView}>
                <TouchableOpacity onPress={launchCamera}>
                    <Text>Directly Launch Camera</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.buttonView}>
            </View>


        </ScrollView>
    );
}

export default App;