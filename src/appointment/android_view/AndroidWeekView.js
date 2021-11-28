import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeekView, { addLocale } from 'react-native-week-view';
import MyEventComponent from './MyEventComponent';
import { headerTitleColor, globalBackground } from '../../../GlobalStyles';


addLocale('pl', {
    months: 'Styczeń_Luty_Marzec_Kwiecień_Maj_Czerwiec_Lipiec_Sierpień_Wrzesień_Październik_Listopad_Grudzień'.split('_'),
    monthsShort: 'Sty._Lut._Mar._Kwi._Maj_Czer._Lip._Sier._Wrz._Paź._Lis._Gru.'.split('_'),
    weekdays: 'Poniedziałek_Wtorek_Środa_Czwartek_Piątek_Sobota_Niedziela'.split('_'),
    weekdaysShort: 'Pon._Wt._Śr._Czw._Pt._Sob._Ndz.'.split('_'),
});

const myEvents = [
    {
        id: 1,
        description: 'Szykuj sie',
        startDate: new Date(2021, 3, 15, 8, 0),
        endDate: new Date(2021, 3, 15, 9, 30),
        // ... more properties if needed,
    },
    {
        id: 2,
        description: 'na gruba',
        startDate: new Date(2021, 3, 15, 10, 0),
        endDate: new Date(2021, 3, 15, 11, 0),
        // ... more properties if needed,
    },
    {
        id: 3,
        description: 'kuracje po',
        startDate: new Date(2021, 3, 15, 12, 0),
        endDate: new Date(2021, 3, 15, 13, 0),
        // ... more properties if needed,
    },
    {
        id: 4,
        description: 'moim przylocie',
        startDate: new Date(2021, 3, 15, 14, 0),
        endDate: new Date(2021, 3, 15, 15, 0),
        // ... more properties if needed,
    },
    // More events...
];

function mapAppointments(appointments) {
    return appointments.map(appointment => {
        return {
            id: appointment.id,
            description: appointment.client.name,
            startDate: new Date(appointment.startDate),
            endDate: new Date(appointment.finishDate),
            works: appointment.appointmentDetails
        }
            
        
    })
}
const AndroidWeekView = ({ navigation, appointments, selectedDate }) => {
    return (
        <>
            <WeekView
                locale={'pl'}
                showTitle={false}
                events={mapAppointments(appointments)}
                EventComponent={MyEventComponent}
                selectedDate={new Date(selectedDate.dateString)}
                numberOfDays={1}
                startHour={7}
                hoursInDisplay={14}
                timeStep={30}
                formatDateHeader="dddd" 
                hourTextStyle={{
                    fontFamily: 'MerriWeatherBold',
                    color: headerTitleColor
                }}
                headerTextStyle={{
                    fontFamily: 'MerriWeatherBold',
                    color: headerTitleColor
                }}
                headerStyle={{
                    borderWidth: 0,
                    borderColor: globalBackground.backgroundColor
                }}
                eventContainerStyle={{
                    backgroundColor: "#F1D1D0"
                }}
                onEventPress={(event) => navigation.navigate('Appointment', { id: event.id })}
            />
        </>
    );
}

const styles = StyleSheet.create({});

export default AndroidWeekView;