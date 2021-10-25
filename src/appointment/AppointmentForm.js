import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker'
import { Context as ClientContext } from '../client/context/ClientContext';
import { Context as UserContext } from '../user/context/UserContext';
import { Context as WorkContext } from '../work/context/WorkContext';
import NumericInput from 'react-native-numeric-input';
import { buttonIcons } from '../icons/Icons';
import { detailTitle, globalBackground } from '../../GlobalStyles';


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
    <ScrollView showsVerticalScrollIndicator={false} style={globalBackground}>
      <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor, alignItems: 'center' }}>

        <Text style={[detailTitle, styles.label, { fontFamily: 'KalamBold', textAlign: 'center' }]}>Data rozpoczęcia:</Text>
        <View style={{ width: '90%' }}>
          <DateTimePicker
            value={startDate}
            onChange={onChangeDate}
            display='spinner'
            is24Hour={true}
            locale={'pl'}
            style={{ backgroundColor: globalBackground.backgroundColor }}
          />
        </View>

        <Text style={[detailTitle, styles.label, { fontFamily: 'KalamBold', textAlign: 'center' }]}>Godzina rozpoczęcia:</Text>
        <View style={{ width: '70%' }}>
          <DateTimePicker
            value={startDate}
            onChange={onChangeDate}
            mode='time'
            display='spinner'
            is24Hour={true}
          />
        </View>

        <View>
          <DropDownPicker
            searchable={true}
            searchPlaceholder="Wyszukaj..."
            searchContainerStyle={{
              borderWidth: 1,
              borderRadius: 6,
              backgroundColor: '#FF00E4'
            }}
            style={[styles.dropDownPicker]}
            textStyle={{
              fontFamily: 'KalamBold',
              textAlign: 'center',
              width: '50%',
              fontSize: 20
            }}
            dropDownContainerStyle={{
              backgroundColor: '#ED50F1',
              width: '80%',
              borderWidth: 2
            }}
            dropDownDirection="TOP"
            placeholder="Wybierz klienta"
            open={clientDropDownOpen}
            value={clientId}
            items={clientContext.state.map(client => ({ label: `${client.name} ${client.surname}`, value: client.id }))}
            setOpen={setClientDropDownOpen}
            setValue={setClientId}
            setItems={setClients}
          />

          <DropDownPicker
            searchable={true}
            searchPlaceholder="Wyszukaj..."
            searchContainerStyle={{
              borderWidth: 1,
              borderRadius: 6,
              backgroundColor: '#FF00E4'
            }}
            style={[styles.dropDownPicker]}
            textStyle={{
              fontFamily: 'KalamBold',
              textAlign: 'center',
              width: '50%',
              fontSize: 20
            }}
            dropDownContainerStyle={{
              backgroundColor: '#ED50F1',
              width: '80%',
              borderWidth: 2
            }}
            dropDownDirection="TOP"
            placeholder="Wybierz pracownika"
            open={userDropDownOpen}
            value={employeeId}
            items={userContext.state.map(user => ({ label: `${user.name} ${user.surname}`, value: user.id }))}
            setOpen={setUserDropDownOpen}
            setValue={setUserId}
            setItems={setUsers}
          />

          <DropDownPicker
            searchable={true}
            searchPlaceholder="Wyszukaj..."
            searchContainerStyle={{
              borderWidth: 1,
              borderRadius: 6,
              backgroundColor: '#FF00E4'
            }}
            style={[styles.dropDownPicker]}
            textStyle={{
              fontFamily: 'KalamBold',
              fontSize: 20,
              textAlign: 'center',
              //width: '50%'
            }}
            dropDownContainerStyle={{
              backgroundColor: '#ED50F1',
              width: '80%',
              borderWidth: 2
            }}
            dropDownDirection="TOP"
            placeholder="Wybierz usługę"
            multiple={true}
            min={1}
            mode="BADGE"
            badgeColors={["#6ECB63", "#FFEDED", "#95DAC1", "#FD6F96", "#FF67E7"]}
            showBadgeDot={false}
            open={workDropDownOpen}
            value={workIds}
            items={workContext.state.map(work => ({ label: `${work.name} - ${work.price}zł`, value: work.id }))}
            setOpen={setWorkDropDownOpen}
            setValue={setWorkId}
            setItems={setWorks}
          />
        </View>


        <Text style={[detailTitle, styles.label, { fontFamily: 'KalamBold', marginTop: 30 }]}>Kara procentowa (%):</Text>
        <NumericInput
          containerStyle={{ marginTop: 10 }}
          inputStyle={{ fontFamily: 'KalamRegular' }}
          minValue={0}
          rounded={true}
          rightButtonBackgroundColor='#ED50F1'
          leftButtonBackgroundColor='#FDB9FC'
          style={styles.input}
          value={percentageValueToAdd}
          onChange={text => setPercentageValueToAdd(text)}
        />

        <TouchableOpacity style={{marginBottom: 50, marginTop: 20}} onPress={() => { onSubmit(startDate, percentageValueToAdd, clientId, employeeId, workIds) }}>
          <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'addAppointment')).uri} />
        </TouchableOpacity>

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
    marginTop: 30,
    width: '80%',
    borderWidth: 2,
    backgroundColor: '#FF00E4'
  },
  label: {
    marginTop: 20
  },
  button: {
    marginTop: 20,
    width: 170,
    height: 90
  }
});

export default AppointmentForm;
