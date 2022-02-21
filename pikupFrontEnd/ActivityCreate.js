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
import DatePicker from 'react-native-date-picker';

const user_url = 'http://localhost:8080/user/v1/users';
const act_url = 'http://localhost:8080/activity/v1/activities';

const ActApp = () => {
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

export default ActApp;
