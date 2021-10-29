import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker'
import { Context as ClientContext } from '../client/context/ClientContext';
import { Context as UserContext } from '../user/context/UserContext';
import { Context as WorkContext } from '../work/context/WorkContext';
import NumericInput from 'react-native-numeric-input';
import { buttonIcons } from '../icons/Icons';
import { detailTitle, globalBackground, button, buttonText, buttonWrapper } from '../../GlobalStyles';


const AppointmentForm = ({ onSubmit, initialValues, navigation, givenDate, mode }) => {
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

  const [startDate, setStartDate] = useState(selectedDate === undefined ? 
    mode === 'edit' ? 
      givenDate : 
      new Date(Date.now()) : 
    new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day));

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false} style={globalBackground}>
          <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor, alignItems: 'center',  justifyContent: 'space-around' }}>

            <Text style={[detailTitle, styles.label, { fontFamily: 'NotoSerif', textAlign: 'center' }]}>Data rozpoczęcia:</Text>
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

            <Text style={[detailTitle, styles.label, { fontFamily: 'NotoSerif', textAlign: 'center' }]}>Godzina rozpoczęcia:</Text>
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
                  backgroundColor: '#F1D1D0'
                }}
                style={[styles.dropDownPicker]}
                textStyle={{
                  fontFamily: 'NotoSerif',
                  textAlign: 'center',
                  width: '50%',
                  fontSize: 20
                }}
                dropDownContainerStyle={{
                  backgroundColor: '#F1D1D0',
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
                  backgroundColor: '#F1D1D0'
                }}
                style={[styles.dropDownPicker]}
                textStyle={{
                  fontFamily: 'NotoSerif',
                  textAlign: 'center',
                  width: '50%',
                  fontSize: 20
                }}
                dropDownContainerStyle={{
                  backgroundColor: '#F1D1D0',
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
                  backgroundColor: '#F1D1D0'
                }}
                style={[styles.dropDownPicker]}
                textStyle={{
                  fontFamily: 'NotoSerif',
                  fontSize: 20,
                  textAlign: 'center',
                  //width: '50%'
                }}
                dropDownContainerStyle={{
                  backgroundColor: '#F1D1D0',
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


            <Text style={[detailTitle, styles.label, { fontFamily: 'NotoSerif', marginTop: 30 }]}>Kara procentowa (%):</Text>
            <NumericInput
              inputStyle={{ fontFamily: 'NotoSerif' }}
              containerStyle={{ marginTop: 10 }}
              minValue={0}
              rounded={true}
              rightButtonBackgroundColor='#FBACCC'
              leftButtonBackgroundColor='#F1D1D0'
              style={styles.input}
              value={percentageValueToAdd}
              onChange={text => setPercentageValueToAdd(text)}
            />

            <View style={[buttonWrapper, { marginBottom: 50, marginTop: 30 }]}>
              <TouchableOpacity style={button} onPress={async () => { 
                await onSubmit(startDate, percentageValueToAdd, clientId, employeeId, workIds);
                navigation.navigate('Appointments');
              }}
                >
                <Text style={[buttonText, { fontFamily: 'NotoSerif' }]}>Dodaj wizytę</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    backgroundColor: '#F1D1D0'
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
