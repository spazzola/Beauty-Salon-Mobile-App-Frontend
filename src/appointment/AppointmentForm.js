import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker'
import { Context as ClientContext } from '../client/context/ClientContext';
import { Context as UserContext } from '../user/context/UserContext';
import { Context as WorkContext } from '../work/context/WorkContext';
import NumericInput from 'react-native-numeric-input';
import Modal from 'react-native-modal';
import { buttonIcons } from '../icons/Icons';
import { detailTitle, globalBackground, button, buttonText, buttonWrapper } from '../../GlobalStyles';
import ClientForm from '../client/ClientForm';
import { isAppointmentFormValid } from './AppointmentService';


const AppointmentForm = ({ onSubmit, initialValues, navigation, appointmentId, givenDate, mode, givenClientId, givenEmployeeId, givenWorkIds }) => {
  const clientContext = useContext(ClientContext);
  const userContext = useContext(UserContext);
  const workContext = useContext(WorkContext);
  const [isModalVisible, setIsModalVisible] = useState(false);


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

  useEffect(() => {
    clientContext.getClients();

    const listener = navigation.addListener('didFocus', () => {
    });

    return () => {
      listener.remove();
    };
  }, [isModalVisible]);

  let selectedDate = navigation.getParam('selectedDate');

  const [startDate, setStartDate] = useState(selectedDate === undefined ?
    mode === 'edit' ?
      givenDate :
      new Date(Date.now()) :
    new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day));

  const [percentageValueToAdd, setPercentageValueToAdd] = useState(initialValues.percentageValueToAdd);
  const [note, setNote] = useState(initialValues.note);

  const [clientDropDownOpen, setClientDropDownOpen] = useState(false);
  const [clientId, setClientId] = useState(givenClientId ? givenClientId : null);
  const [clientItems, setClients] = useState([]);

  const [userDropDownOpen, setUserDropDownOpen] = useState(false);
  const [employeeId, setUserId] = useState(givenEmployeeId ? givenEmployeeId : null);
  const [userItems, setUsers] = useState([]);

  const [workDropDownOpen, setWorkDropDownOpen] = useState(false);
  const [workIds, setWorkId] = useState(givenWorkIds ? givenWorkIds : null);
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
          <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor, alignItems: 'center', justifyContent: 'space-around' }}>

            <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold', textAlign: 'center' }]}>Data rozpoczęcia:</Text>
            <View style={{ width: '90%' }}>
              <DateTimePicker
                value={startDate}
                onChange={onChangeDate}
                display='spinner'
                is24Hour={true}
                locale={'pl'}
                style={{ backgroundColor: globalBackground.backgroundColor, marginTop: '5%' }}
              />
            </View>

            <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold', textAlign: 'center' }]}>Godzina rozpoczęcia:</Text>
            <View style={{ width: '70%' }}>
              <DateTimePicker
                value={startDate}
                onChange={onChangeDate}
                mode='time'
                display='spinner'
                is24Hour={true}
                style={{ marginTop: '5%' }}
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
                  fontFamily: 'MerriWeatherBold',
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
              <View>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setIsModalVisible(true)} >
                  <Text style={{ fontSize: 18, color: '#F875AA', fontFamily: 'MerriWeatherBold', marginTop: '3%' }}>Nowy klient</Text>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                  <View style={styles.modalContainer}>
                    <View style={{ width: '100%', marginTop: '5%' }}>
                      <ClientForm
                        onSubmit={async (name, surname, phoneNumber) => {
                          let client = {
                            name,
                            surname,
                            phoneNumber
                          };
                          let response = await fetch(
                            'http://188.68.237.171:8080/myfront/client/create',
                            {
                              method: 'POST',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(client)
                            }
                          );
                          let json = await response.json();
                          setClientId(json.id);
                          setIsModalVisible(false);
                        }}
                      />
                    </View>
                  </View>
                </Modal>
              </View>
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
                  fontFamily: 'MerriWeatherBold',
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
                  fontFamily: 'MerriWeatherBold',
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

            <TextInput
              multiline={true}
              numberOfLines={10}
              placeholder={'Dodaj notatkę'}
              value={note}
              onChangeText={text => setNote(text)}
              style={styles.multilineInput} />

            <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold', marginTop: '10%', marginBottom: '5%' }]}>Kara procentowa (%):</Text>
            <NumericInput
              inputStyle={{ fontFamily: 'MerriWeatherBold' }}
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
              <TouchableOpacity style={[button, { marginTop: '5%' }]} onPress={
                mode === 'edit' ? async () => {
                  if (isAppointmentFormValid(appointmentId, startDate, percentageValueToAdd, clientId, employeeId, workIds)) {
                    await onSubmit(appointmentId, startDate, percentageValueToAdd, clientId, employeeId, workIds, note);
                    navigation.navigate('Appointments');
                  }
                }
                  :
                  async () => {
                    if (isAppointmentFormValid(1, startDate, percentageValueToAdd, clientId, employeeId, workIds)) {
                      await onSubmit(startDate, percentageValueToAdd, clientId, employeeId, workIds, note);
                      navigation.navigate('Appointments');
                    }
                  }
              }
              >
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>{mode === 'edit' ? 'Edytuj wizytę' : 'Dodaj wizytę'}</Text>
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
    percentageValueToAdd: 0,
    clientId: null,
    employeeId: null,
    workIds: [],
    note: ''
  }
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    marginTop: 50
    //borderWidth: 1,
    //borderColor: 'black',
    //marginBottom: 15,
    //padding: 5,
    //margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  },
  dropDownPicker: {
    marginTop: '10%',
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
  },
  modalContainer: {
    height: '80%',
    //flex: 1, 
    backgroundColor: globalBackground.backgroundColor,
    borderRadius: 30
  },
  multilineInput: {
    borderWidth: 2,
    borderRadius: 10,
    width: '80%',
    height: '15%',
    marginTop: '15%',
    fontSize: 20,
    fontFamily: 'MerriWeather',
    padding: 5,
  }
});

export default AppointmentForm;
