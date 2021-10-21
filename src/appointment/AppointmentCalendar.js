import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const AppointmentCalendar = ({ navigation }) => {

    return (
        <View>
            <Text>Appointment calendar !!! </Text>
            <Calendar onDayPress={(selectedDate) => {navigation.navigate('Appointments', {selectedDate})}}/>
            <Button title="Dodaj wizytę" onPress={() => navigation.navigate('AppointmentAdd')}/>
        </View>
    );
}

const styles = StyleSheet.create({})

export default AppointmentCalendar;