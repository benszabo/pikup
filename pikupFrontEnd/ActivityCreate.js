// import * as React from 'react';
// import {useEffect, useState} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import axios from 'axios';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import {decode as atob, encode as btoa} from 'base-64';
// import {SearchBar} from 'react-native-elements';
// import SearchInput, {createFilter} from 'react-native-search-filter';
// import {Picker} from '@react-native-picker/picker';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {
//   Select,
//   VStack,
//   Container,
//   Input,
//   NativeBaseProvider,
//   Center,
//   Box,
//   CheckIcon,
// } from 'native-base';

// import {
//   FlatList,
//   StyleSheet,
//   View,
//   Button,
//   StatusBar,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import {SafeAreaView, TextInput} from 'react-native';

// // const user_url = 'http://localhost:8080/user/v1/users';
// const act_url = 'http://localhost:8080/activity/v1/activities';
// const Stack = createNativeStackNavigator();

// const Home = ({navigation}) => {
//   const onPressHandlerActivityCreate = () => {
//     navigation.navigate('Activity');
//   };
//   const onPressHandlerEvents = () => {
//     navigation.navigate('Events');
//   };
//   return (
//     <View>
//       <Button title="Create Activity" onPress={onPressHandlerActivityCreate} />
//       <Button title="View Events" onPress={onPressHandlerEvents} />
//     </View>
//   );
// };

// const Activity = ({navigation}) => {
//   const [isLoading, setLoading] = React.useState(true);
//   const [eventDetails, onChangeDetails] = React.useState(null);
//   const [location, onChangeLocation] = React.useState(null);
//   const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
//   const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
//   const [date, setDate] = React.useState(new Date());
//   const [open, setOpen] = React.useState(false);
//   const [members, setMembers] = React.useState(null);
//   const [data, setData] = React.useState('');
//   const [activity, setActivity] = React.useState('');

//   const onPressHanlder = () => {
//     navigation.navigate('Home');
//   };

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = date => {
//     console.warn('A date has been picked: ', date);
//     setDate(date);
//     console.log(date.toString());
//     hideDatePicker();
//   };

//   const callAPI = () => {
//     axios({
//       method: 'get',
//       url: act_url,
//     }).then(response => {
//       console.log(response.status);
//       console.log(response.data);
//       setData(response.data.firstname);
//     });
//   };

//   const postData = () => {
//     var headers = new Headers();
//     headers.append('Authorization', 'Basic ' + btoa('admin:admin'));
//     axios
//       .post(
//         act_url,
//         {
//           createdBy: 'Cristobal',
//           activityName: activity,
//           memberCount: members,
//           dateTime: date,
//         },
//         headers,
//       )
//       .then(response => {
//         setData(console.log(response.data));
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
//   return (
//     <NativeBaseProvider>
//       <Container>
//         <SafeAreaView>
//           <View>
//             <Button title="Home" onPress={onPressHanlder} />
//           </View>
//           <Text style={styles.textStyle}>Activity Type</Text>
//           <VStack alignItems="center" space={4}>
//             <Select
//               shadow={2}
//               selectedValue={activity}
//               minWidth="200"
//               accessibilityLabel="Choose Activirt"
//               placeholder="Choose Activity"
//               _selectedItem={{
//                 bg: 'blue.400',
//                 endIcon: <CheckIcon size="5" />,
//               }}
//               _light={{
//                 bg: 'coolGray.100',
//               }}
//               _dark={{
//                 bg: 'coolGray.800',
//               }}
//               onValueChange={itemValue => setActivity(itemValue)}>
//               <Select.Item shadow={2} label="Baseball" value="base" />
//               <Select.Item shadow={2} label="Basketball" value="bask" />
//               <Select.Item shadow={2} label="Football" value="foot" />
//               <Select.Item shadow={2} label="Hockey" value="hock" />
//               <Select.Item shadow={2} label="Other" value="oth" />
//               <Select.Item shadow={2} label="Soccer" value="soc" />
//               <Select.Item shadow={2} label="Tennis" value="tenn" />
//             </Select>
//           </VStack>
//           <Text style={styles.textStyle}>Event Details</Text>
//           <Box alignItems="center">
//             <Input
//               mx="3"
//               placeholder="Details..."
//               w="100%"
//               maxWidth="360px"
//               onChangeText={onChangeDetails}
//               value={eventDetails}
//             />
//           </Box>
//           <Text style={styles.textStyle}>Location</Text>
//           <Box alignItems="center">
//             <Input
//               mx="3"
//               placeholder="Address..."
//               w="100%"
//               maxWidth="360px"
//               onChangeText={onChangeLocation}
//               value={location}
//             />
//           </Box>
//           <Text style={styles.textStyle}>Time and Date</Text>
//           <View>
//             <Button title="Show Date Picker" onPress={showDatePicker} />
//             <DateTimePickerModal
//               isVisible={isDatePickerVisible}
//               mode="datetime"
//               onConfirm={handleConfirm}
//               onCancel={hideDatePicker}
//             />
//           </View>
//           <Text style={styles.textStyle}>
//             Members Required
//             <Box w="100" maxW="300">
//               <Select
//                 selectedValue={members}
//                 accessibilityLabel="Choose Service"
//                 placeholder="Choose Service"
//                 _selectedItem={{
//                   bg: 'teal.600',
//                   endIcon: <CheckIcon size="5" />,
//                 }}
//                 mt={1}
//                 onValueChange={itemValue => setMembers(set)}>
//                 <Select.Item label="UX Research" value="ux" />
//                 <Select.Item label="Web Development" value="web" />
//                 <Select.Item label="Cross Platform Development" value="cross" />
//                 <Select.Item label="UI Designing" value="ui" />
//                 <Select.Item label="Backend Development" value="backend" />
//               </Select>
//             </Box>
//           </Text>
//           <Button title="Create Event" onPress={postData}></Button>
//         </SafeAreaView>
//       </Container>
//     </NativeBaseProvider>
//   );
// };

// const Events = ({navigation}) => {
//   const [activities, setActivities] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filteredDataSource, setFilteredDataSource] = useState([]);
//   const [masterDataSource, setMasterDataSource] = useState([]);
//   const [filter, setFilter] = useState('');

//   const Act = ({actName, actTime}) => (
//     <View style={flatliststyles.item}>
//       <Text style={flatliststyles.title}>{actName}</Text>
//       <Text style={flatliststyles.time}>{actTime}</Text>
//     </View>
//   );
//   const renderItem = ({item}) => (
//     <Act actName={item.activityName} Act actTime={item.dateTime} />
//   );

//   const onPressHandlerGoHome = () => {
//     navigation.navigate('Home');
//   };
//   useEffect(() => {
//     axios({
//       method: 'get',
//       url: act_url,
//     }).then(response => {
//       //   console.log(response.status);
//       setActivities(response.data);
//       setFilteredDataSource(response.data);
//       setMasterDataSource(response.data);
//       //   console.log(response.data);
//     });
//   }, []);
//   const searchFilterFunction = text => {
//     // Check if searched text is not blank
//     if (text) {
//       // Inserted text is not blank
//       // Filter the masterDataSource
//       // Update FilteredDataSource
//       const newData = masterDataSource.filter(function (item) {
//         const itemData = item.activityName
//           ? item.activityName.toUpperCase()
//           : ''.toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//       });
//       setFilteredDataSource(newData);
//       setSearch(text);
//     } else {
//       // Inserted text is blank
//       // Update FilteredDataSource with masterDataSource
//       setFilteredDataSource(masterDataSource);
//       setSearch(text);
//     }
//   };
//   const ItemView = ({item}) => {
//     return (
//       // Flat List Item
//       <Text s onPress={() => getItem(item)}>
//         {item.activityName.toUpperCase()}
//         {' - '}
//         {item.dateTime}
//       </Text>
//     );
//   };
//   const ItemSeparatorView = () => {
//     return (
//       // Flat List Item Separator
//       <View
//         style={{
//           height: 0.5,
//           width: '100%',
//           backgroundColor: '#C8C8C8',
//         }}
//       />
//     );
//   };

//   const getItem = item => {
//     // Function for click on an item
//     alert(
//       'Activity : ' +
//         item.activityName +
//         '\nDateTime : ' +
//         item.dateTime +
//         '\nPlayers Required: ' +
//         item.memberCount,
//     );
//   };
//   return (
//     <NativeBaseProvider>
//       <View style={searchStyles.container}>
//         <SearchBar
//           round
//           searchIcon={{size: 24}}
//           onChangeText={text => searchFilterFunction(text)}
//           onClear={text => searchFilterFunction('')}
//           placeholder="Search for event..."
//           value={search}
//         />
//         <Center>
//           <Box w="3/4" maxW="300">
//             <Select
//               selectedValue={filter}
//               minWidth="200"
//               accessibilityLabel="Choose Service"
//               placeholder="Filter By"
//               _selectedItem={{
//                 bg: 'teal.600',
//                 endIcon: <CheckIcon size="5" />,
//               }}
//               mt={1}
//               onValueChange={itemValue => setFilter(itemValue)}>
//               <Select.Item label="Category" value="cat" />
//               <Select.Item label="Location" value="loc" />
//               <Select.Item label="Date" value="date" />
//             </Select>
//           </Box>
//         </Center>

//         <FlatList
//           data={filteredDataSource}
//           // renderItem={renderItem}
//           renderItem={ItemView}
//           ItemSeparatorComponent={ItemSeparatorView}
//           keyExtractor={item => item.id}
//         />
//       </View>
//     </NativeBaseProvider>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
//         <Stack.Screen
//           name="Activity"
//           component={Activity}
//           options={{title: 'Creating Activity'}}
//         />
//         <Stack.Screen
//           name="Events"
//           component={Events}
//           options={{title: 'Events'}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   textStyle: {
//     margin: 12,
//   },
// });
// const flatliststyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: '#E3EDFB',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
//   time: {
//     fonttSize: 16,
//   },
// });
// const searchStyles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//   },
//   itemStyle: {
//     padding: 10,
//   },
// });

// export default App;
