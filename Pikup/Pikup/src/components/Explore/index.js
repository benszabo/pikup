import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { decode as atob, encode as btoa } from 'base-64';
import { SearchBar } from 'react-native-elements';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
    Select,
    VStack,
    Stack,
    Container,
    AspectRatio,
    ScrollView,
    Divider,
    Image,
    HStack,
    Heading,
    Input,
    Pressable,
    NativeBaseProvider,
    Center,
    Box,
    CheckIcon,
} from 'native-base';

import { Button as NativeButton } from 'native-base';
import {
    FlatList,
    StyleSheet,
    Button,
    View,
    StatusBar,
    TouchableOpacity,
    Text,
} from 'react-native';
import { SafeAreaView, TextInput } from 'react-native';
import Cookies from 'js-cookie';
import styles from '../styles';

// const user_url = 'http://localhost:8080/user/v1/users';
const act_url = 'https://pikup.herokuapp.com/activity/v1/activities';
// const act_url = 'http://localhost:8080/activity/v1/activities';
const StackNav = createNativeStackNavigator();
var Buffer = require('buffer/').Buffer; // note: the trailing slash is important!

const Home = ({ navigation }) => {

    const onPressHandlerActivityCreate = () => {
        navigation.navigate('Activity');
    };
    const onPressHandlerEvents = () => {
        navigation.navigate('Events');
    };
    return (
        <View style={styles.color}>
            <Button title="Create Activity" onPress={onPressHandlerActivityCreate} />
            <Button title="View Events" onPress={onPressHandlerEvents} />
            <View style={styles.freeSpace1 }>
            </View>
        </View>
        
    );
};

const Card = ({ activity, datetime, eventDescr, loc, participantCount }) => {
    const cardImages = {
        Baseball: require('../../assets/baseball.jpeg'),
        Basketball: require('../../assets/basketball.jpeg'),
        Football: require('../../assets/football.jpeg'),
        Other: require('../../assets/other.jpeg'),
        Soccer: require('../../assets/soccer.jpeg'),
        Tennis: require('../../assets/tennis.jpeg'),
    };
    
    return (
        <Pressable onPress={() => alert(`rsvp page here for ${activity}`)}>
            <Box bg="white" shadow={2} rounded="lg" maxWidth="100%">
                <Image
                    source={cardImages[activity]}
                    alt={activity}
                    resizeMode="cover"
                    height={150}
                    roundedTop="md"
                />
                <Stack space={4} p={[4, 4, 8]}>
                    <Text color="gray.400">{activity}</Text>
                    <Heading size={['md', 'lg', 'md']} noOfLines={2}>
                        {eventDescr}
                    </Heading>
                    <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
                        {datetime}, {loc}
                    </Text>
                    <NativeButton
                        size="sm"
                        variant="outline"
                        colorScheme="secondary"
                        onPress={() => {
                            if (participantCount > 0) {
                                alert('Succesfully Joined');
                            } else {
                                alert('Unable to Join');
                            }
                        }}>
                        CLICK TO RSVP
                    </NativeButton>
                </Stack>
            </Box>
            <View style={styles.freeSpace2}>
            </View>
        </Pressable>
    );
};

const Activity = ({ navigation }) => {
    const [isLoading, setLoading] = React.useState(true);
    const [eventDetails, onChangeDetails] = React.useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [members, setMembers] = React.useState(null);
    const [data, setData] = React.useState('');
    const [activity, setActivity] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [zip, setZip] = React.useState('');

    const onPressHanlder = () => {
        navigation.navigate('Home');
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        console.warn('A date has been picked: ', date);
        setDate(date.toString());
        console.log(date.toString());
        hideDatePicker();
    };

    const callAPI = () => {
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa('admin:admin'));
        axios(
            {
                method: 'get',
                url: act_url,
            },
            headers,
        ).then(response => {
            console.log(response.status);
            console.log(response.data);
            setData(response.data.firstname);
        });
    };

    var path = 'https://pikup.herokuapp.com/activity/v1/activities';
    var username = 'admin';
    var password = 'admin';

    const postData = () => {
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios(path, {
            headers: { Authorization: basicAuth },
            method: 'post',
            url: path,
            data: {
                id: 2,
                createdBy: 'Admin2',
                activityName: activity,
                memberCount: members,
                dateTime: date,
                activityStreet: address,
                activityCity: city,
                activityState: state,
                activityZip: zip,
                activityDescription: eventDetails,
            },
        })
            .then(response => {
                setData(console.log(response.data));
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    return (
        <NativeBaseProvider>
            <ScrollView style={styles.color}>
                <VStack space="2.5" mt="4" px="8">
                    <Heading size="md">Activity</Heading>
                    <Stack direction="row" mb="2.5" mt="1.5" space={3}>
                        <Select
                            shadow={2}
                            selectedValue={activity}
                            minWidth="100"
                            accessibilityLabel="Choose Activirt"
                            placeholder="Choose Activity"
                            _selectedItem={{
                                bg: 'blue.400',
                                endIcon: <CheckIcon size="5" />,
                            }}
                            _light={{
                                bg: 'coolGray.100',
                            }}
                            _dark={{
                                bg: 'coolGray.800',
                            }}
                            onValueChange={itemValue => setActivity(itemValue)}>
                            <Select.Item shadow={2} label="Baseball" value="Baseball" />
                            <Select.Item shadow={2} label="Basketball" value="Basketball" />
                            <Select.Item shadow={2} label="Football" value="Football" />
                            <Select.Item shadow={2} label="Hockey" value="Hockey" />
                            <Select.Item shadow={2} label="Other" value="Other" />
                            <Select.Item shadow={2} label="Soccer" value="Soccer" />
                            <Select.Item shadow={2} label="Tennis" value="Tennis" />
                        </Select>
                    </Stack>
                    <Divider />
                    <Stack direction="column" mb="2.5" mt="1.5" space={3}>
                        <Heading size="md">Details</Heading>
                        <Box alignItems="center">
                            <Input
                                mx="3"
                                placeholder="Details..."
                                w="100%"
                                maxWidth="360px"
                                onChangeText={onChangeDetails}
                                value={eventDetails}
                            />
                        </Box>
                    </Stack>
                    <Divider />
                    <Stack direction="column" mb="2.5" mt="1.5" space={3}>
                        <Heading size="md">Location</Heading>
                        <Box alignItems="center">
                            <Input
                                mx="3"
                                placeholder="City"
                                w="100%"
                                maxWidth="360px"
                                onChangeText={setCity}
                                value={city}
                            />
                            <Input
                                mx="3"
                                placeholder="State"
                                w="100%"
                                maxWidth="360px"
                                onChangeText={setState}
                                value={state}
                            />
                            <Input
                                mx="3"
                                placeholder="Address"
                                w="100%"
                                maxWidth="360px"
                                onChangeText={setAddress}
                                value={address}
                            />
                            <Input
                                mx="3"
                                placeholder="Zip"
                                w="100%"
                                maxWidth="360px"
                                onChangeText={setZip}
                                value={zip}
                            />
                        </Box>
                    </Stack>
                    <Divider />
                    <Stack direction="column" mb="2.5" mt="1.5" space={3}>
                        <Heading size="md">Members</Heading>
                        <Box alignItems="center">
                            <Input
                                mx="3"
                                placeholder="Member Count"
                                w="100%"
                                maxWidth="360px"
                                onChangeText={setMembers}
                                value={members}
                            />
                        </Box>
                    </Stack>
                    <Divider />
                    <Stack direction="column" mb="2.5" mt="1.5" space={3}>
                        <Heading size="md">Date & Time</Heading>
                        <Box alignItems="center">
                            <Button
                                title="Show Date & Time Picker"
                                onPress={showDatePicker}
                            />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="datetime"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </Box>
                    </Stack>
                    <Divider />
                    <NativeButton onPress={postData} size="sm" colorScheme="blue">
                        Create Activity!
                    </NativeButton>
                    <View style={styles.freeSpace}>
                    </View>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

const Events = ({ navigation }) => {
    const [activities, setActivities] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [filter, setFilter] = useState('');

    const onPressHandlerGoHome = () => {
        navigation.navigate('Home');
    };
    // const CORS_PROXY_API = `https://cors.ryanking13.workers.dev/?u=`;
    var path = 'https://pikup.herokuapp.com/activity/v1/activities';
    var username = 'admin';
    var password = 'admin';

    useEffect(() => {
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios(path, {
            headers: { Authorization: basicAuth },
            method: 'get',
            url: path,
        }).then(
            response => {
                console.log(response.status);
                console.log(response.data);
                setActivities(response.data);
                setFilteredDataSource(response.data);
                setMasterDataSource(response.data);
            },
            error => {
                console.log(error.response.data);
            },
        );
        console.log(path);
    }, []);

    const searchFilterFunction = text => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.activityName
                    ? item.activityName.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };
    const ItemView = ({ item }) => {
        return (
            <Card
                activity={item.activityName}
                datetime={item.dateTime}
                eventDescr={item.activityDescription}
                loc={item.activityCity}
                participantCount={item.memberCount}
            />
        );
    };
    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 20,
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                }}
            />
        );
    };

    const getItem = item => {
        // Function for click on an item
        alert(
            'Activity : ' +
            item.activityName +
            '\nDateTime : ' +
            item.dateTime +
            '\nPlayers Required: ' +
            item.memberCount,
        );
    };
    return (
        <NativeBaseProvider>
            <View style={styles.color}>
                <SearchBar
                    round
                    searchIcon={{ size: 24 }}
                    onChangeText={text => searchFilterFunction(text)}
                    onClear={text => searchFilterFunction('')}
                    placeholder="Search for event..."
                    value={search}
                />
                <FlatList
                    data={filteredDataSource}
                    renderItem={ItemView}
                    ItemSeparatorComponent={ItemSeparatorView}
                    keyExtractor={item => item.id}
                    style={styles.freeSpace}
                />
                
            </View>
        </NativeBaseProvider>
    );
};

const ExploreComponent = () => {
        return (
            <StackNav.Navigator >
                <StackNav.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Home' }}
                />
                <StackNav.Screen
                    name="Activity"
                    component={Activity}
                    options={{ title: 'Creating Activity' }}
                />
                <StackNav.Screen
                    name="Events"
                    component={Events}
                    options={{ title: 'Events' }}
                />
            </StackNav.Navigator>
    );
};

/*const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    textStyle: {
        margin: 12,
    },
}); */
const flatliststyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#E3EDFB',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    time: {
        fonttSize: 16,
    },
});
const searchStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
});

export default ExploreComponent;