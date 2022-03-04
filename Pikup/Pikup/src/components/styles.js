import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonView: {
        alignSelf: 'center',
        width: '80%',
        padding: 10,
        borderRadius: 10,
        
    },
    wrapper: {
        height: 40,
        borderWidth: 2,
        borderRadius: 4,
        paddingHorizontal: 5,
        width: '100%',
    },
    inputContainer: {
        padding: 0
    },
    color: {
        //backgroundColor: '#D9DDDC',
        backgroundColor: '#D7BFDC',
        padding: 20,
        alignContent: 'center',
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
    linkText: {
        fontFamily: "Times New Roman",
        fontSize: 16,
        color: '#702963'
        //color: 'purple'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputText: {
        flex: 1,
        width: '100%',
    },
    errorColor: {
        fontFamily: "Comic Sans",
        color: '#FF2400',
        paddingTop: 4,
        fontSize: 12,
    },
    errorColorOnly: {
        color: '#FF2400'
    },
    standardColor: {
        color: 'orange',
    },
    tabStyle: {
        position: 'absolute',
        paddingBottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: 'orange',
        borderRadius: 15,
        height: 90,
    },
    pickerText: {
        fontSize: 18,
        paddingLeft: 15,
    },
    pickerOption: {
        flexDirection: 'row',
        paddingTop: 20,
        alignItems: 'center',

    }
});


