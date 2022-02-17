import React from 'react';
import axios from 'axios';
import {decode as atob, encode as btoa} from 'base-64';

import {
  View,
  useState,
  useEffect,
  Button,
  Text,
  StyleSheet,
} from 'react-native';
import {
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const burl = 'http://localhost:8080';
// const url = 'https://reactnative.dev/movies.json';

const App = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [text, onChangeText] = React.useState(null);
  const [eventDetails, onChangeDetails] = React.useState(null);
  const [location, onChangeLocation] = React.useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
  const [participants, onChangeParticipants] = React.useState(null);
  const [data, setData] = React.useState('');

  const callAPI = () => {
    axios({
      method: 'get',
      url: `${burl}/users`,
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
        `${burl}/api/v1/users`,
        {
          username: 'John',
          email: 'john@gmail.com',
          password: 'p@sSword',
          create_time: '2020-12-24',
          id: '5',
          role: 'participant',
        },
        headers,
      )
      .then(response => {
        setData(response.data[-1].event);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleDateConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  const handleTimeConfirm = time => {
    console.warn('A time has been picked: ', time);
    hideTimePicker();
  };

  return (
    <SafeAreaView>
      <Text style={styles.textStyle}>Event Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Enter Event Name"
        value={text}
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
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <Button title="Show Time Picker" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      <Text style={styles.textStyle}>Number of Participants Required</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeParticipants}
        value={participants}
        keyboardType="numeric"
        placeholder="Participant #"
      />
      <Button title="Call API" onPress={postData}></Button>
      <Text>API Val {text}</Text>
    </SafeAreaView>
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

export default App;
