import React from 'react';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FAIcon5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Text } from 'react-native';

const getIconFont = (type) => {
    switch (type) {
        case "zocialIcon":
            return ZocialIcon;
        case "materialIcon":
            return MaterialIcon;
        case "octIcon":
            return OcticonIcon;
        case "materialCommunityIcon":
            return MaterialCommunityIcon;
        case "ionIcon":
            return Ionicon;
        case "foundationIcon":
            return FoundationIcon;
        case "evilIcon":
            return EvilIcon;
        case "entypoIcon":
            return EntypoIcon;
        case "faIcon":
            return FAIcon;
        case "faIcon5":
            return FAIcon5;
        case "simpleLineIcon":
            return SimpleLineIcon;
        case "antDesign":
            return AntDesign;
        case "feather":
            return Feather;
        case "fontisto":
            return Fontisto;
        default:
            return FAIcon;
    }
};
    const Icon = ({type, ...props}) => {
        const FontIcon = getIconFont(type);

        return <FontIcon {...props} />;
    };

export default Icon;