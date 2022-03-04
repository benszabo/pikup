import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import ProfileComponent from '../../components/Profile';

const ProfileS = () => {
    const sheetRef = useRef(null);
    const [localFile, setLocalFile] = useState(null);
    const closeSheet = () => {
        if (sheetRef.current) {
            sheetRef.current.close();
        }

    };
    const openSheet = () => {
        if (sheetRef.current) {
            sheetRef.current.open();
        }

    };
    const onFileSelected = (image) => {
        closeSheet();
        setLocalFile(image);
        console.log('image', image);
    };
    return (
        <ProfileComponent
            sheetRef={sheetRef}
            closeSheet={closeSheet}
            openSheet={openSheet}
            onFileSelected={onFileSelected}
            localFile={localFile}
        /> 
    );
};

export default ProfileS;