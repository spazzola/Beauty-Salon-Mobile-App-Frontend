import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import { buttonIcons } from '../icons/Icons';
import { useFonts } from 'expo-font';
import { globalBackground, itemParagraph, button, buttonText, buttonWrapper, headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';
import { Context as AuthContext } from '../signin/context/AuthContext';

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('jwt')
        if (value !== null) {
            console.log(value);
        }
    } catch (e) {
        // error reading value
    }
}
LocaleConfig.locales['pl'] = {
    monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Czer', 'Lip.', 'Sier.', 'Wrz.', 'Paź.', 'Lis.', 'Gru.'],
    dayNames: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
    dayNamesShort: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'],
    //today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'pl';

const AppointmentCalendar = ({ navigation }) => {
    const { state } = useContext(AuthContext);

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
            <Text style={[itemParagraph, { fontSize: 20, color: '#F875AA' }]}> Witaj, {state.name} {state.surname} </Text>
            <Calendar
                onDayPress={(selectedDate) => { navigation.navigate('Appointments', { selectedDate }) }}
                style={globalBackground}
                scrollEnabled={true}
                theme={{
                    calendarBackground: globalBackground.backgroundColor,
                    textSectionTitleColor: '#F875AA',
                    dayTextColor: '#F875AA',
                    //dayTextColor: 'black',
                    todayTextColor: '#F1D1D0',
                    arrowColor: '#F875AA',
                    textDisabledColor: '#bab5b5',
                    textDayFontFamily: 'MerriWeather',
                    textDayHeaderFontFamily: 'MerriWeatherBold',
                    textMonthFontFamily: 'MerriWeatherBold',
                    monthTextColor: '#FBACCC'
                }}
            />

            {state.role === 'ADMIN' ?
                (
                    <>
                        <View style={buttonWrapper}>
                            <TouchableOpacity style={[button, { width: 180, flexDirection: 'row' }]} onPress={() => navigation.navigate('AppointmentAdd')}>
                                <Image style={{ width: 18, height: 18, marginRight: 10, }} source={buttonIcons.add.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj wizytę</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={buttonWrapper}>
                            <TouchableOpacity style={[button, { flexDirection: 'row' }]} onPress={() => navigation.navigate('Solarium')}>
                                <Image style={{ width: 30, height: 30, marginRight: 10 }} source={buttonIcons.solarium.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Solarium</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[button, { flexDirection: 'row' }]} onPress={() => navigation.navigate('Costs')}>
                                <Image style={{ width: 26, height: 26, marginRight: 10, marginLeft: -15 }} source={buttonIcons.lowPrice.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Koszty</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={buttonWrapper}>
                            <TouchableOpacity style={[button, { flexDirection: 'row' }]} onPress={() => navigation.navigate('Clients')}>
                                <Image style={{ width: 26, height: 26, marginRight: 10, marginLeft: -15 }} source={buttonIcons.clients.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Klienci</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[button, { flexDirection: 'row' }]} onPress={() => navigation.navigate('Users')}>
                                <Image style={{ width: 27, height: 27, marginRight: 10, marginLeft: -15 }} source={buttonIcons.users.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Personel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={buttonWrapper}>
                            <TouchableOpacity style={[button, { flexDirection: 'row' }]} onPress={() => navigation.navigate('Works')}>
                                <Image style={{ width: 26, height: 26, marginRight: 10, marginLeft: -15 }} source={buttonIcons.works.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Usługi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[button, { flexDirection: 'row' }]} onPress={() => navigation.navigate('Reports')}>
                                <Image style={{ width: 26, height: 26, marginRight: 10, marginLeft: -15 }} source={buttonIcons.reports.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Raporty</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
                :
                (
                    <>
                        <View style={buttonWrapper}>
                            <TouchableOpacity style={[button, { width: 180, flexDirection: 'row' }]} onPress={() => navigation.navigate('AppointmentAdd')}>
                            <Image style={{ width: 18, height: 18, marginRight: 10, }} source={buttonIcons.add.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj wizytę</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={buttonWrapper}>
                            <TouchableOpacity style={[button, { flexDirection: 'row' }]} onPress={() => navigation.navigate('Solarium')}>
                            <Image style={{ width: 30, height: 30, marginRight: 10 }} source={buttonIcons.solarium.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Solarium</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[button, { flexDirection: 'row' }]} onPress={() => navigation.navigate('Costs')}>
                            <Image style={{ width: 26, height: 26, marginRight: 10, marginLeft: -15 }} source={buttonIcons.lowPrice.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Koszty</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={buttonWrapper}>
                            <TouchableOpacity style={[button, { flexDirection: 'row' }]} onPress={() => navigation.navigate('Clients')}>
                            <Image style={{ width: 26, height: 26, marginRight: 10, marginLeft: -15 }} source={buttonIcons.clients.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Klienci</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[button, { flexDirection: 'row' }]} onPress={() => navigation.navigate('Works')}>
                            <Image style={{ width: 26, height: 26, marginRight: 10, marginLeft: -15 }} source={buttonIcons.works.uri} />
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Usługi</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
            }
        </View>
    );
}

AppointmentCalendar.navigationOptions = {
    title: 'Kalendarz',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};

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