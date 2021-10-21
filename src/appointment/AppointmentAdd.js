import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/AppointmentContext';
import AppointmentForm from './AppointmentForm';

const AppointmentAdd = ({ navigation }) => {
  const { addAppointment } = useContext(Context);

  return (
    <AppointmentForm
      navigation={navigation}
      onSubmit={(startDate, startTime, percentageValueToAdd, clientId, userId, workIds) => {
        addAppointment(startDate, startTime, percentageValueToAdd, clientId, userId, workIds, () => navigation.navigate('Appointments'));
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default AppointmentAdd;