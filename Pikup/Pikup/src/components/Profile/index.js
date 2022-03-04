import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Button, icon, TouchableOpacity } from 'react-native';
import styles from '../../components/styles';
import { DEFAULT_PROFILE_PIC, EDITPROFILE, SETTINGS } from '../../constants/routeNames';
import { DEFAULT_IMAGE_URI } from '../../constants/defaultURI';
import ImagePicker from '../ImagePicker';

const ProfileComponent = ({sheetRef, openSheet, closeSheet, localFile, onFileSelected}) => {
    const { navigate } = useNavigation();
    console.log('localFile', localFile);
    return (
        <ScrollView style={styles.color}>
                <View style={styles.container}>
                    <Text style={styles.titleText}>Profile</Text>
                <Image
                    source={{uri: localFile?.path || DEFAULT_IMAGE_URI}}
                    /* source={require('../../assets/myProfilePic.jpg')} */
                    style={{ width: 150, height: 150, borderRadius: 90, }}
                />
                
                    <TouchableOpacity onPress={openSheet}>
                        <Text style={styles.linkText}>Choose your Photo</Text>
                    </TouchableOpacity>
                <View style={{ padding: 20 }}>
                </View>
                <Text style={styles.baseText}>YourName</Text>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title="Edit Profile"
                        onPress={() => navigate(EDITPROFILE)}
                    />
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title="Settings"
                        onPress={() => navigate(SETTINGS)}
                    />
            </View>
            <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
            </ScrollView>
            
            );
}


export default ProfileComponent;