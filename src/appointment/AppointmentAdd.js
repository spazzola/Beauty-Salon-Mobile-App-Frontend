import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/AppointmentContext';
import AppointmentForm from './AppointmentForm';
import { headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';

const AppointmentAdd = ({ navigation }) => {
  const { addAppointment } = useContext(Context);

  return (
    <AppointmentForm
      navigation={navigation}
      onSubmit={(startDate, startTime, percentageValueToAdd, clientId, userId, works, note) => {
        addAppointment(startDate, startTime, percentageValueToAdd, clientId, userId, works, note, () => navigation.navigate('Appointments'));
      }}
    />
  );
};

AppointmentAdd.navigationOptions = {
  title: 'Dodawanie wizyty',
  headerTintColor: headerTitleColor,
  headerTitleStyle: {
      fontFamily: 'MerriWeatherBold'
  },
  headerStyle: {
      backgroundColor: headerBackgroundColor,
  },
};

const styles = StyleSheet.create({});

export default AppointmentAdd;