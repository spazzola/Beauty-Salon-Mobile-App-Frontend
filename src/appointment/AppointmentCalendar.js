import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import { buttonIcons } from '../icons/Icons';

LocaleConfig.locales['pl'] = {
    monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Czer', 'Lip.', 'Sier', 'Wrz.', 'Paź.', 'Lis.', 'Gru.'],
    dayNames: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
    dayNamesShort: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'],
    //today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'pl';

const AppointmentCalendar = ({ navigation }) => {

    return (
        <View style={{ backgroundColor: '#fa94e9', height: '100%' }}>
            <Text>Witaj, Iwona Worek </Text>
            <Calendar
                onDayPress={(selectedDate) => { navigation.navigate('Appointments', { selectedDate }) }}
                style={{
                    backgroundColor: '#fa94e9'
                }}
                theme={{
                    calendarBackground: '#fa94e9',
                    textSectionTitleColor: 'black',
                    todayTextColor: '#FA26A0',
                    textDisabledColor: '#bab5b5',
                }}
            />

            <View style={[styles.wrapper, { marginTop: 10 }]}>
                <TouchableOpacity onPress={() => navigation.navigate('AppointmentAdd')}>
                    <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'addAppointment')).uri} />
                </TouchableOpacity>
            </View>

            <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Clients')}>
                    <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'clients')).uri} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Users')}>
                    <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'employees')).uri} />
                </TouchableOpacity>
            </View>

            <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Works')}>
                    <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'services')).uri} />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        width: 160,
        height: 80
    }
})

export default AppointmentCalendar;