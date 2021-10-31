import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/AppointmentContext';
import AppointmentForm from './AppointmentForm';

const AppointmentEdit = ({ navigation }) => {
    const id = navigation.getParam('id');
    const { state, editAppointment } = useContext(Context);
    //const [startDate, setStartDate] = useState(null);
    const appointment = state.find(appointment => appointment.id === id);

    const year = appointment.startDate.substring(0, 4);
    const month = appointment.startDate.substring(5, 7);
    const day = appointment.startDate.substring(8, 10);
    const hour = parseInt(appointment.startDate.substring(11, 13));
    const minute = parseInt(appointment.startDate.substring(14, 16));

    let createdDate = new Date(year, month - 1, day);
    createdDate.setHours(hour, minute);
    
    return (
        <AppointmentForm
            navigation={navigation}
            givenDate={createdDate}
            mode={'edit'}
            initialValues={{ startDate: appointment.startDate, clientId: appointment.client.id, employeeId: appointment.employee.id }}
            onSubmit={(startDate, startTime, percentageValueToAdd, clientId, userId, workIds) => {
                editAppointment(startDate, startTime, percentageValueToAdd, clientId, userId, workIds, () => navigation.navigate('Appointments'));
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default AppointmentEdit;