import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker'
import { Context as ClientContext } from '../client/context/ClientContext';
import { Context as UserContext } from '../user/context/UserContext';
import { Context as WorkContext } from '../work/context/WorkContext';
import NumericInput from 'react-native-numeric-input';


const AppointmentForm = ({ onSubmit, initialValues, navigation }) => {
  const clientContext = useContext(ClientContext);
  const userContext = useContext(UserContext);
  const workContext = useContext(WorkContext);

  useEffect(() => {
    clientContext.getClients();
    userContext.getUsers();
    workContext.getWorks();

    const listener = navigation.addListener('didFocus', () => {
      clientContext.getClients();
      userContext.getUsers();
      workContext.getWorks();
    });

    return () => {
      listener.remove();
    };
  }, []);

  let selectedDate = navigation.getParam('selectedDate');
  // let formattedDate = selectedDate.year + "-" + selectedDate.month + "-" + selectedDate.day;
  // console.log("selected date: " + formattedDate);
  // console.log("created date: " + new Date(selectedDate.year, selectedDate.month, selectedDate.day));
  const [startDate, setStartDate] = useState(selectedDate === undefined ? new Date(Date.now()) : new Date(selectedDate.year, selectedDate.month, selectedDate.day));
  //const [startTime, setStartTime] = useState(new Date(Date.now()));
  const [percentageValueToAdd, setPercentageValueToAdd] = useState(initialValues.value);

  const [clientDropDownOpen, setClientDropDownOpen] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [clientItems, setClients] = useState([]);

  const [userDropDownOpen, setUserDropDownOpen] = useState(false);
  const [employeeId, setUserId] = useState(null);
  const [userItems, setUsers] = useState([]);

  const [workDropDownOpen, setWorkDropDownOpen] = useState(false);
  const [workIds, setWorkId] = useState(null);
  const [workItems, setWorks] = useState([]);

  const onChangeDate = (event, selectedDate) => {
    let currentDate = selectedDate || startDate;
    setStartDate(currentDate);
  };

  // const onChangeTime = (event, selectedTime) => {
  //   let currentTime = selectedTime || startTime;
  //   setStartTime(currentTime);
  // };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 50}}>
      <View style={{ height: '100%' , backgroundColor: '#fa94e9'}}>

        <Text style={styles.label}>Data rozpoczęcia:</Text>
        <DateTimePicker
          value={startDate}
          onChange={onChangeDate}
          display='spinner'
          is24Hour={true}
          locale={'pl'}
          style={{backgroundColor: '#fa94e9'}}
        />

        <Text style={styles.label}>Godzina rozpoczęcia:</Text>
        <DateTimePicker
          value={startDate}
          onChange={onChangeDate}
          mode='time'
          display='spinner'
          is24Hour={true}
        />

        <DropDownPicker
          style={styles.dropDownPicker}
          placeholder="Wybierz klienta"
          open={clientDropDownOpen}
          value={clientId}
          items={clientContext.state.map(client => ({ label: `${client.name} ${client.surname}`, value: client.id }))}
          setOpen={setClientDropDownOpen}
          setValue={setClientId}
          setItems={setClients}
        />

        <DropDownPicker
          style={styles.dropDownPicker}
          placeholder="Wybierz pracownika"
          open={userDropDownOpen}
          value={employeeId}
          items={userContext.state.map(user => ({ label: `${user.name} ${user.surname}`, value: user.id }))}
          setOpen={setUserDropDownOpen}
          setValue={setUserId}
          setItems={setUsers}
        />

        <DropDownPicker
          style={styles.dropDownPicker}
          placeholder="Wybierz usługę"
          multiple={true}
          min={1}
          mode="BADGE"
          open={workDropDownOpen}
          value={workIds}
          items={workContext.state.map(work => ({ label: `${work.name} - ${work.price}zł`, value: work.id }))}
          setOpen={setWorkDropDownOpen}
          setValue={setWorkId}
          setItems={setWorks}
        />

        <Text style={styles.label}>Kara procentowa (%):</Text>
        <NumericInput
          style={styles.input}
          value={percentageValueToAdd}
          onChange={text => setPercentageValueToAdd(text)}
        />
        <Button title="Dodaj wizytę" onPress={() => { onSubmit(startDate, percentageValueToAdd, clientId, employeeId, workIds) }} />
      </View>
    </ScrollView>
  );
};

AppointmentForm.defaultProps = {
  initialValues: {
    startDate: '',
    percentageValueToAdd: null,
    clientId: null,
    employeeId: null,
    workIds: []

  }
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  },
  dropDownPicker: {
    marginTop: 30
  }
});

export default AppointmentForm;
