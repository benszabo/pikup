import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {decode as atob, encode as btoa} from 'base-64';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {
  FlatList,
  StyleSheet,
  View,
  Button,
  StatusBar,
  Text,
} from 'react-native';
import {SafeAreaView, TextInput} from 'react-native';

// const user_url = 'http://localhost:8080/user/v1/users';
const act_url = 'http://localhost:8080/activity/v1/activities';
const Stack = createNativeStackNavigator();

const Home = ({navigation}) => {
  const onPressHandlerActivityCreate = () => {
    navigation.navigate('Activity');
  };
  const onPressHandlerEvents = () => {
    navigation.navigate('Events');
  };
  return (
    <View>
      <Button title="Create Activity" onPress={onPressHandlerActivityCreate} />
      <Button title="View Events" onPress={onPressHandlerEvents} />
    </View>
  );
};

const Activity = ({navigation}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [event, setEvent] = React.useState(null);
  const [eventDetails, onChangeDetails] = React.useState(null);
  const [location, onChangeLocation] = React.useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [participants, onChangeParticipants] = React.useState(null);
  const [data, setData] = React.useState('');

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
    setDate(date);
    console.log(date.toString());
    hideDatePicker();
  };

  const callAPI = () => {
    axios({
      method: 'get',
      url: act_url,
    }).then(response => {
      console.log(response.status);
      console.log(response.data);
      setData(response.data.firstname);
    });
  };

  const postData = () => {
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('admin:admin'));
    axios
      .post(
        act_url,
        {
          createdBy: 'Cristobal',
          activityName: event,
          memberCount: participants,
          dateTime: date,
        },
        headers,
      )
      .then(response => {
        setData(console.log(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView>
      <View>
        <Button title="Home" onPress={onPressHanlder} />
      </View>
      <Text style={styles.textStyle}>Event Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEvent}
        placeholder="Enter Event Name"
        value={event}
      />
      <Text style={styles.textStyle}>Details</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeDetails}
        value={eventDetails}
        placeholder="Event Details"
      />
      <Text style={styles.textStyle}>Location</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeLocation}
        value={location}
        placeholder="Event Location"
      />
      <Text style={styles.textStyle}>Time and Date</Text>
      <View>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <Text style={styles.textStyle}>Number of Participants Required</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeParticipants}
        value={participants}
        keyboardType="numeric"
        placeholder="Participant #"
      />
      <Button title="Create Event" onPress={postData}></Button>
      <Text>{event} created</Text>
    </SafeAreaView>
  );
};

const Events = ({navigation}) => {
  const [activities, setActivities] = useState([]);

  const Act = ({actName, actTime}) => (
    <View style={flatliststyles.item}>
      <Text style={flatliststyles.title}>{actName}</Text>
      <Text style={flatliststyles.time}>{actTime}</Text>
    </View>
  );
  const renderItem = ({item}) => (
    <Act actName={item.activityName} Act actTime={item.dateTime} />
  );

  const onPressHandlerGoHome = () => {
    navigation.navigate('Home');
  };
  useEffect(() => {
    axios({
      method: 'get',
      url: act_url,
    }).then(response => {
      //   console.log(response.status);
      setActivities(response.data);
      //   console.log(response.data);
    });
  }, []);

  return (
    <View style={flatliststyles.container}>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen
          name="Activity"
          component={Activity}
          options={{title: 'Creating Activity'}}
        />
        <Stack.Screen
          name="Events"
          component={Events}
          options={{title: 'Events'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textStyle: {
    margin: 12,
  },
});
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

export default App;
