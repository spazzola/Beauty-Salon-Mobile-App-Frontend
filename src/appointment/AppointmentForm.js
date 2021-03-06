import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker'
import { Context as ClientContext } from '../client/context/ClientContext';
import { Context as UserContext } from '../user/context/UserContext';
import { Context as WorkContext } from '../work/context/WorkContext';
import NumericInput from 'react-native-numeric-input';
import Modal from 'react-native-modal';
import { buttonIcons } from '../icons/Icons';
import { detailTitle, detailParagraph, globalBackground, button, buttonText, buttonWrapper } from '../../GlobalStyles';
import ClientForm from '../client/ClientForm';
import { isAppointmentFormValid } from './AppointmentService';
import { Context as AuthContext } from '../signin/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseSpinner from '../base_components/BaseSpinner';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

function getSelectedWorks(workConextState, workIds) {
  return workIds != null ? workConextState.filter(work => workIds.includes(work.id)) : null;
}

function buildMarkedDateObject(year, month, day) {
  var date = year;
  if (month < 10) {
    date += '-0' + month;
  } else {
    date += '-' + month;
  }

  if (day < 10) {
    date += '-0' + day;
  } else {
    date += '-' + day;
  }

  return date;
}

LocaleConfig.locales['pl'] = {
  monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
  monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Czer', 'Lip.', 'Sier.', 'Wrz.', 'Paź.', 'Lis.', 'Gru.'],
  dayNames: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
  dayNamesShort: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'],
  //today: 'Aujourd\'hui'
};

const AppointmentForm = ({ onSubmit, initialValues, navigation, appointmentId, givenDate, mode, givenClientId, givenEmployeeId, givenWorkIds }) => {
  const clientContext = useContext(ClientContext);
  const userContext = useContext(UserContext);
  const workContext = useContext(WorkContext);
  const authConext = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChangePriceModalVisible, setIsChangePriceModalVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [showAndroidDateModal, setShowAndroidDateModal] = useState(false);
  const [type, setType] = useState('date');

  const showDateModal = (type) => {
    setShowAndroidDateModal(!showAndroidDateModal);
    setType(type);
  };

  const showDatePicker = () => {
    showDateModal('date');
  };
  const showTimePicker = () => {
    showDateModal('time');
  };

  const prepareDate = () => {
    let date = startDate || selectedDate;
    let month = date.getMonth();
    if (month < 10) {
      if (month == 9) {
        month = "10"
      } else {
        month = "0" + (month + 1).toString();
      }
    }

    let day = date.getDate();
    if (day < 10) {
      if (day == 9) {
        day = "10"
      } else {
        day = "0" + (day).toString();
      }
    }
    return date.getFullYear() + "-" + month + "-" + day;
  }
  const setInitialDate = (markedDate, givenMonth) => {
    var currentDate = new Date();
    var month = givenMonth == undefined ? currentDate.getMonth() + 1 : givenMonth;
    var year = currentDate.getFullYear();
    var daysInMonth = new Date(year, month, 0).getDate();
    var extractedSaturdays = [];
    var extractedSundays = [];

    for (var i = 1; i <= daysInMonth; i++) {
      var dayToCheck = new Date(year, month - 1, i).getDay();

      if (dayToCheck == 0) {
        extractedSundays.push(buildMarkedDateObject(year, month, i));
      }
      if (dayToCheck == 6) {
        extractedSaturdays.push(buildMarkedDateObject(year, month, i));
      }
    }

    var markedSundays = extractedSundays.reduce((c, v) => Object.assign(c, {
      [v]: {
        customStyles: {
          text: {
            //color: '#F31A09'
            color: 'black'
          }
        }
      }
    }), {});

    setMarkedDay(markedSundays);

    var markedSaturdays = extractedSaturdays.reduce((c, v) => Object.assign(c, {
      [v]: {
        customStyles: {
          text: {
            color: '#0F8BDE'
          }
        }
      }
    }), {});

    if (markedDate == undefined) {
      markedDate = prepareDate();
    }
    
    let currentMarkedDate = {
      [markedDate]: {
        selectedColor: '#F875AA',
        selected: true
        
      }
    }
    let markedDates = Object.assign(markedSundays, markedSaturdays);
    markedDates = Object.assign(markedDates, currentMarkedDate);
    setMarkedDay(markedDates);

  }

  const [markedDay, setMarkedDay] = useState();
  const [saturdays, setSaturdays] = useState();
  const [sundays, setSundays] = useState();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    clientContext.getClients();
    userContext.getUsers();
    workContext.getWorks();

    setInitialDate();

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
  const [employeeId, setUserId] = useState(givenEmployeeId ? givenEmployeeId : authConext.state.id);
  //const [employeeId, setUserId] = useState(authConext.state.role === 'USER' ? authConext.state.id : (givenEmployeeId ? givenEmployeeId : null));

  const [userItems, setUsers] = useState([]);

  const [workDropDownOpen, setWorkDropDownOpen] = useState(false);
  const [workIds, setWorkIds] = useState(givenWorkIds ? givenWorkIds : []);
  const [workItems, setWorkItems] = useState([]);

  const onChangeDate = (event, selectedDate) => {
    // let currentDate = selectedDate || startDate;
    // setStartDate(currentDate);
    // setShowAndroidDateModal(false);
    setStartDate(new Date(event));
    setShowAndroidDateModal(false);
  };

  // const onChangeTime = (event, selectedTime) => {
  //   console.log(event.getHours() + ":" + event.getMinutes());
  //   // let currentTime = selectedTime || startTime;
  //   // setStartTime(currentTime);
  // };


  const handleUpdate = (index, providedPrice) => {
    const newWorks = [...workItems];
    newWorks[index].providedPrice = providedPrice;
    setWorkItems(newWorks);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false} style={globalBackground}>
          <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor, alignItems: 'center', justifyContent: 'space-around' }}>

            {
              Platform.OS === 'ios' ? (
                <>
                  <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold', textAlign: 'center' }]}>Data rozpoczęcia:</Text>
                  <View style={{ width: '90%' }}>
                    {/* <DateTimePicker
                      value={startDate}
                      onChange={onChangeDate}
                      //display='spinner'
                      display='calendar'
                      mode='date'
                      is24Hour={true}
                      locale={'pl'}
                      style={{ backgroundColor: globalBackground.backgroundColor, marginTop: '5%' }}
                    /> */}
                    <Calendar
                      //onDayPress={(selectedDate) => { onChangeDate(selectedDate.dateString + 'T00:00:00.000Z') }}
                      current={prepareDate()}
                      // onDayPress={(markedDate => {
                      //   setMarkedDay({
                      //     ...markedDay,
                      //     [markedDate.dateString]: {
                      //       selected: true,
                      //       marked: true,
                      //       selectedColor: '#F875AA'
                      //     }
                      //   });
                      //   let date = startDate || selectedDate;
                      //   date.setFullYear(markedDate.year, (markedDate.month - 1), markedDate.day);
                      //   setStartDate(date);
                      // })}
                      onDayPress={markedDate => setInitialDate(markedDate.dateString, markedDate.month)}
                      onMonthChange={date => setInitialDate(undefined, date.month)}
                      style={[globalBackground, { marginTop: '7%' }]}
                      scrollEnabled={true}
                      markingType={'custom'}
                      markedDates={markedDay}
                      theme={{
                        'stylesheet.calendar.header': {
                          sundayDayHeader: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            //color: '#F31A09',
                            color: 'black',
                            fontWeight: 'bold'
                          },
                          saturdayDayHeader: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            color: '#0F8BDE',
                            fontWeight: 'bold'
                          },
                          dayHeader: {
                            color: '#F875AA',
                            fontWeight: 'bold'
                          }
                        },
                        calendarBackground: globalBackground.backgroundColor,
                        textSectionTitleColor: '#F875AA',
                        dayTextColor: '#F875AA',
                        //dayTextColor: 'black',
                        todayTextColor: '#F875AA',
                        arrowColor: '#F875AA',
                        textDisabledColor: '#bab5b5',
                        textDayFontFamily: 'MerriWeather',
                        textDayHeaderFontFamily: 'MerriWeatherBold',
                        textMonthFontFamily: 'MerriWeatherBold',
                        monthTextColor: '#FBACCC'
                      }}
                    />
                  </View>

                  <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold', textAlign: 'center' }]}>Godzina rozpoczęcia:</Text>
                  <View style={{ width: '70%' }}>
                    <DateTimePicker
                      value={startDate}
                      onChange={(event, selectedTime) => {
                        let date = startDate || selectedDate;
                        date.setHours(selectedTime.getHours(), selectedTime.getMinutes());
                        setStartDate(date);
                      }}
                      mode='time'
                      display='spinner'
                      is24Hour={true}
                      style={{ marginTop: '5%' }}
                    />
                  </View>
                </>
              )
                :
                (
                  <>
                    <View style={buttonWrapper}>
                      <TouchableOpacity style={[button, { width: 180, flexDirection: 'row' }]} onPress={showDatePicker}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Wybierz datę</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={[detailParagraph, { fontSize: 17, marginTop: 0, fontFamily: 'MerriWeather' }]}> Wybrana data: {startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear()}</Text>
                    {
                      showAndroidDateModal ?
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={startDate}
                          mode={type}
                          is24Hour={true}
                          display="default"
                          onChange={onChangeDate}
                        />
                        : null
                    }
                    <View style={buttonWrapper}>
                      <TouchableOpacity style={[button, { width: 180, flexDirection: 'row' }]} onPress={showTimePicker}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Wybierz czas</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={[detailParagraph, { fontSize: 17, marginTop: 0, fontFamily: 'MerriWeather' }]}> Wybrany czas: {startDate.getHours() + ':' + startDate.getMinutes()}</Text>
                  </>
                )

            }

            <View>
              <DropDownPicker
                searchable={true}
                searchPlaceholder="Wyszukaj..."
                searchContainerStyle={{
                  borderWidth: 0,
                  shadowColor: '#171717',
                  shadowOffset: { width: 2, height: 4 },
                  shadowOpacity: 0.7,
                  shadowRadius: 3,
                  borderRadius: 6,
                  backgroundColor: '#F1D1D0'
                }}
                style={[styles.dropDownPicker]}
                textStyle={{
                  fontFamily: 'MerriWeather',
                  textAlign: 'center',
                  width: '50%',
                  fontSize: 20,
                  color: '#F875AA'
                }}
                dropDownContainerStyle={{
                  backgroundColor: '#F1D1D0',
                  width: '80%',
                  borderBottomWidth: 1
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
                  <View style={[styles.modalContainer, { height: '60%' }]}>
                    <View style={[styles.headerWrapper, { height: '12%' }]}>
                      <Text style={styles.modalHeader}>Dodawanie klienta</Text>
                    </View>
                    <View style={{ width: '100%', height: '60%', marginTop: '5%' }}>
                      <ClientForm
                        backgroundColor={styles.modalContainer.backgroundColor}
                        onSubmit={async (name, surname, phoneNumber) => {
                          const jwt = await AsyncStorage.getItem('jwt');
                          let client = {
                            name,
                            surname,
                            phoneNumber
                          };
                          let response = await fetch(
                            'http://51.83.185.78:8080/myfront/client/create',
                            {
                              method: 'POST',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + jwt
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
              {authConext.state.role === 'ADMIN' ?
                <DropDownPicker
                  searchable={true}
                  searchPlaceholder="Wyszukaj..."
                  searchContainerStyle={{
                    borderWidth: 0,
                    shadowColor: '#171717',
                    shadowOffset: { width: 2, height: 4 },
                    shadowOpacity: 0.7,
                    shadowRadius: 3,
                    borderRadius: 6,
                    backgroundColor: '#F1D1D0'
                  }}
                  style={[styles.dropDownPicker]}
                  textStyle={{
                    fontFamily: 'MerriWeather',
                    textAlign: 'center',
                    width: '50%',
                    fontSize: 20,
                    color: '#F875AA'
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: '#F1D1D0',
                    width: '80%',
                    borderBottomWidth: 1
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
                :
                null
              }

              <DropDownPicker
                searchable={true}
                searchPlaceholder="Wyszukaj..."
                searchContainerStyle={{
                  borderWidth: 0,
                  shadowColor: '#171717',
                  shadowOffset: { width: 2, height: 4 },
                  shadowOpacity: 0.7,
                  shadowRadius: 3,
                  borderRadius: 6,
                  backgroundColor: '#F1D1D0'
                }}
                style={[styles.dropDownPicker]}
                textStyle={{
                  fontFamily: 'MerriWeather',
                  fontSize: 20,
                  textAlign: 'center',
                  color: '#F875AA'
                }}
                dropDownContainerStyle={{
                  backgroundColor: '#F1D1D0',
                  width: '80%',
                  borderBottomWidth: 1
                }}
                dropDownDirection="TOP"
                placeholder="Wybierz usługę"
                multiple={true}
                min={1}
                mode="BADGE"
                badgeColors={["#dc7c71", "#FFEDED", "#95DAC1", "#e4ac90"]}
                showBadgeDot={false}
                open={workDropDownOpen}
                value={workIds}
                items={workContext.state.map(work => ({ label: `${work.name} - ${work.price}zł`, value: work.id, }))}
                setOpen={setWorkDropDownOpen}
                setValue={(value) => {
                  setWorkIds(value);
                }}
              //setValue={setWorkIds}
              />
              {/* <DropDownPicker
            open={open}
            multiple={true}
            min={1}
            value={value}
            items={workContext.state.map(work => ({ label: `${work.name} - ${work.price}zł`, value: work.id, }))}
            setOpen={setOpen}
            setValue={setWorkIds}
            mode="BADGE"
            badgeColors={["#dc7c71", "#FFEDED", "#95DAC1", "#e4ac90"]}
            showBadgeDot={false}
            searchable={true}
            searchPlaceholder="Wyszukaj..."
            dropDownDirection="TOP"
            placeholder="Wybierz usługę"
          /> */}
              <View>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setIsChangePriceModalVisible(true)} >
                  <Text style={{ fontSize: 18, color: '#F875AA', fontFamily: 'MerriWeatherBold', marginTop: '3%' }}>Zmień cenę</Text>
                </TouchableOpacity>
                <Modal isVisible={isChangePriceModalVisible} onBackdropPress={() => setIsChangePriceModalVisible(false)} onShow={() => {
                  let works = getSelectedWorks(workContext.state, workIds);
                  works.map(work => work.providedPrice == null ? work.providedPrice = work.price : null);
                  setWorkItems(works);
                }}>
                  <View style={[styles.modalContainer, { height: '50%' }]}>
                    <View style={[styles.headerWrapper, { height: '12%' }]}>
                      <Text style={styles.modalHeader}>Zmiana ceny</Text>
                    </View>
                    <View style={{ width: '100%', height: '75%', marginTop: '5%' }}>
                      <FlatList
                        data={workItems}
                        keyExtractor={work => work.id.toString()}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: index == 0 ? 0 : '5%',
                              marginLeft: '2%',
                              marginRight: '2%'
                            }}>
                              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginRight: '3%' }}>
                                <Text style={{ fontSize: 18, fontFamily: 'MerriWeatherBold', alignSelf: 'center' }}>{item.name}</Text>
                              </ScrollView>
                              <NumericInput
                                inputStyle={{ fontFamily: 'MerriWeatherBold' }}
                                minValue={0}
                                rounded={true}
                                rightButtonBackgroundColor='#F875AA'
                                leftButtonBackgroundColor='#F1D1D0'
                                //style={styles.input}
                                totalHeight={50}
                                totalWidth={120}
                                value={item.providedPrice}
                                onChange={(value) => {
                                  handleUpdate(index, value);
                                }}
                              />
                            </View>
                          );
                        }}
                      />
                      <TouchableOpacity style={[buttonWrapper, button, { alignSelf: 'center' }]} onPress={() => setIsChangePriceModalVisible(false)}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Zmień</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>

            <TextInput
              multiline={true}
              numberOfLines={10}
              placeholder={'Dodaj notatkę'}
              value={note}
              onChangeText={text => setNote(text)}
              style={styles.multilineInput} />

            <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold', marginBottom: '7%', marginTop: '15%' }]}>Dodatkowa opłata (%):</Text>
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
                    let works = getSelectedWorks(workContext.state, workIds);
                    setShowSpinner(!showSpinner);
                    await onSubmit(appointmentId, startDate, percentageValueToAdd, clientId, employeeId, works, note);
                    setShowSpinner(!showSpinner);
                    navigation.navigate('Appointments', {
                      selectedDate: {
                        year: startDate.getFullYear(),
                        month: startDate.getMonth() + 1,
                        day: startDate.getDate()
                      }
                    });
                  }
                }
                  :
                  async () => {
                    let works = getSelectedWorks(workContext.state, workIds);
                    if (isAppointmentFormValid(1, startDate, percentageValueToAdd, clientId, employeeId, works)) {
                      setShowSpinner(!showSpinner);
                      await onSubmit(startDate, percentageValueToAdd, clientId, employeeId, works, note);
                      setShowSpinner(!showSpinner);
                      navigation.navigate('Appointments', {
                        selectedDate: {
                          year: startDate.getFullYear(),
                          month: startDate.getMonth() + 1,
                          day: startDate.getDate()
                        }
                      });
                    }
                  }
              }
              >
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>{mode === 'edit' ? 'Edytuj wizytę' : 'Dodaj wizytę'}</Text>
              </TouchableOpacity>
            </View>
            {showSpinner ?
              <BaseSpinner />
              : null}
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
  wrapper: {
    zIndex: 1,
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 3
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  },
  dropDownPicker: {
    marginTop: '10%',
    width: '80%',
    borderWidth: 0,
    backgroundColor: '#F1D1D0',
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  label: {
    marginTop: '10%'
  },
  button: {
    marginTop: 20,
    width: 170,
    height: 90
  },
  modalContainer: {
    width: '100%',
    height: '80%',
    //flex: 1, 
    backgroundColor: '#FBACCC',
    borderRadius: 30
  },
  headerWrapper: {
    height: '20%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F875AA',
    justifyContent: 'center'
  },
  modalHeader: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'MerriWeatherBold'
  },
  multilineInput: {
    color: '#F875AA',
    borderRadius: 10,
    width: '80%',
    height: '15%',
    marginTop: '15%',
    fontSize: 20,
    fontFamily: 'MerriWeather',
    padding: 5,
    backgroundColor: '#F1D1D0',
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    borderRadius: 6,
  }
});

export default AppointmentForm;