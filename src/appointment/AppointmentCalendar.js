import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import { buttonIcons } from '../icons/Icons';
import { useFonts } from 'expo-font';
import { globalBackground, itemParagraph, button, buttonText, buttonWrapper } from '../../GlobalStyles';


LocaleConfig.locales['pl'] = {
    monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Czer', 'Lip.', 'Sier', 'Wrz.', 'Paź.', 'Lis.', 'Gru.'],
    dayNames: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
    dayNamesShort: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'],
    //today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'pl';

const AppointmentCalendar = ({ navigation }) => {
    const [loaded] = useFonts({
        NotoSerif: require('../../assets/fonts/Noto-Serif.ttf'),
        NotoSerifBold: require('../../assets/fonts/Noto-Serif-Bold.ttf'),
        MerriWeather: require('../../assets/fonts/Merriweather-Regular.ttf'),
        MerriWeatherBold: require('../../assets/fonts/Merriweather-Bold.ttf')
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={{ backgroundColor: globalBackground.backgroundColor, height: '100%' }}>
            <Text style={[itemParagraph, { fontSize: 20, color: '#81F5FF' }]}></Text>
            <Calendar
                onDayPress={(selectedDate) => { navigation.navigate('Appointments', { selectedDate }) }}
                style={globalBackground}
                scrollEnabled={true}
                theme={{
                    calendarBackground: globalBackground.backgroundColor,
                    textSectionTitleColor: '#F875AA',
                    dayTextColor: '#F875AA',
                    todayTextColor: '#F1D1D0',
                    arrowColor: '#F875AA',
                    textDisabledColor: '#bab5b5',
                    textDayFontFamily: 'NotoSerif',
                    textDayHeaderFontFamily: 'NotoSerifBold',
                    textMonthFontFamily: 'NotoSerif',
                    monthTextColor: '#FBACCC'
                }}
            />

            <View style={buttonWrapper}>
                <TouchableOpacity style={button} onPress={() => navigation.navigate('AppointmentAdd')}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj wizytę</Text>
                </TouchableOpacity>
            </View>

            <View style={buttonWrapper}>
                <TouchableOpacity style={button} onPress={() => navigation.navigate('Solarium')}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Solarium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button} onPress={() => navigation.navigate('Costs')}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Koszty</Text>
                </TouchableOpacity>
            </View>

            <View style={buttonWrapper}>
                <TouchableOpacity style={button} onPress={() => navigation.navigate('Clients')}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Klienci</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button} onPress={() => navigation.navigate('Users')}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Personel</Text>
                </TouchableOpacity>
            </View>

            <View style={buttonWrapper}>
                <TouchableOpacity style={button} onPress={() => navigation.navigate('Works')}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Usługi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button} onPress={() => navigation.navigate('')}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Raporty</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default AppointmentCalendar;

{/* <View style={[styles.wrapper]}>
                <TouchableOpacity onPress={() => navigation.navigate('AppointmentAdd')}>
                    <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'addAppointment')).uri} />
                </TouchableOpacity>
            </View>

            <View style={[styles.wrapper]}>
                <TouchableOpacity onPress={() => navigation.navigate('Solarium')}>
                    <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'solarium')).uri} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Costs')}>
                    <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'costs')).uri} />
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
                <TouchableOpacity onPress={() => navigation.navigate('')}>
                    <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'reports')).uri} />
                </TouchableOpacity>
            </View> */}