import React from 'react';
import { TouchableOpacity, View, Text, Button } from 'react-native';
import Container from '../Container';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import ProfileS from '../../screens/Profile';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from '../../components/Icon';


const ImagePicker = React.forwardRef(({onFileSelected }, ref) => {
    const options = [
        {
            name: "Taken from Camera",
            icon: <Icon size={20} name="camera" />,
            onPress: () => {
                ImageCropPicker.openCamera({
                    width: 300,
                    height: 300,
                    cropping: true,
                    freeStyleCropEnabled: true,

                }).then((images) => {
                    onFileSelected(images);
                })
                    .catch((error) => {
                        console.log('error', error);
                    });
            },
        },
        {
            name: "Choose from Gallery",
            icon: <Icon size={20} name="image" />,
            onPress: () => {
                ImageCropPicker.openPicker({
                    width: 300,
                    height: 300,
                    cropping: true,
                    freeStyleCropEnabled: true,

                }).then((images) => {
                    onFileSelected(images);
                })
                    .catch((error) => {
                        console.log('error', error);
                    });
            },
        },
    ];
    return (
        <RBSheet
            ref={ref}
            height={150}
            openDuration={250}
            closeOnDragDown
            customStyles={{
                container: {
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }
            }}
        >
            <View style={{ paddingHorizontal: 20,}}>
                {options.map(({ name, onPress, icon }) => (
                    <TouchableOpacity
                        style={styles.pickerOption}
                        key={name}
                        onPress={onPress}>
                        {icon}
                        <Text style={styles.pickerText}>{name}</Text>
                        
                    </TouchableOpacity>
                ))}
            </View>
        </RBSheet>
    );
});
export default ImagePicker;