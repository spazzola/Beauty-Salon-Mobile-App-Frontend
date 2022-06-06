import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Alert } from 'react-native';
import { input, globalBackground, button, buttonText, buttonWrapper, headerBackgroundColor, detailTitle } from '../../../GlobalStyles';
import { Context as UserContext } from '../../user/context/UserContext';
import DropDownPicker from 'react-native-dropdown-picker'
//import BaseSpinner from '../../base_components/BaseSpinner';


const VacationForm = ({ onSubmit, initialValues, mode, backgroundColor, givenEmployeeId, navigation }) => {

    const [startYearDropDownOpen, setStartYearDropDownOpen] = useState(false);
    const [startSelectedYear, setStartSelectedYear] = useState();
    const [years, setYears] = useState([
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' },
        { label: '2025', value: '2025' },
        { label: '2026', value: '2026' },
    ]);

    const [startMonthDropDownOpen, setStartMonthDropDownOpen] = useState(false);
    const [startSelectedMonth, setStartSelectedMonth] = useState('06');
    const [startMonths, setStartMonths] = useState([
        { label: 'Styczeń', value: '01' },
        { label: 'Luty', value: '02' },
        { label: 'Marzec', value: '03' },
        { label: 'Kwiecień', value: '04' },
        { label: 'Maj', value: '05' },
        { label: 'Czerwiec', value: '06' },
        { label: 'Lipiec', value: '07' },
        { label: 'Sierpień', value: '08' },
        { label: 'Wrzesień', value: '09' },
        { label: 'Październik', value: '10' },
        { label: 'Listopad', value: '11' },
        { label: 'Grudzień', value: '12' },
    ]);

    const [startDayDropDownOpen, setStartDayDropDownOpen] = useState(false);
    const [startSelectedDay, setStartSelectedDay] = useState();
    const [days, setDays] = useState([]);

    const userContext = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userDropDownOpen, setUserDropDownOpen] = useState(false);
    const [employeeId, setUserId] = useState();
    const [userItems, setUsers] = useState([]);

    useEffect(() => {
        userContext.getUsers();
        var currentDate = startSelectedYear == null ? new Date() : new Date(startSelectedYear, startSelectedMonth, 0);
        var currentYear = currentDate.getFullYear();
        setStartSelectedYear(currentYear.toString());

        var daysInMonth = new Date(currentYear, (currentDate.getMonth() + 1), 0).getDate();
        var currentDays = [];
        for (var i = 1; i <= daysInMonth; i++) {
            currentDays.push({ label: i.toString(), value: i.toString() });
        }
        setDays(currentDays);

        const listener = navigation.addListener('didFocus', () => {
            userContext.getUsers();
        });

        return () => {
            listener.remove();
        };
    }, [startSelectedMonth]);




    return (
        <View style={[{ alignItems: 'center', height: '100%', backgroundColor: backgroundColor ? backgroundColor : globalBackground.backgroundColor }]}>
            <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold' }]}>Wybierz datę rozpoczęcia:</Text>
            <View style={{ flexDirection: 'row', zIndex: 10 }}>
                <View style={{ width: '30%' }}>
                    <DropDownPicker
                        open={startYearDropDownOpen}
                        value={startSelectedYear}
                        items={years}
                        setOpen={setStartYearDropDownOpen}
                        setValue={setStartSelectedYear}
                        setItems={setYears}
                        placeholder="Rok"
                        style={[styles.dropDownPicker, { width: '100%' }]}
                        textStyle={{
                            fontFamily: 'MerriWeather',
                            textAlign: 'center',
                            width: '50%',
                            fontSize: 20,
                            color: '#F875AA'
                        }}
                        dropDownContainerStyle={{
                            backgroundColor: '#F1D1D0',
                            borderBottomWidth: 1,
                            width: '100%'
                        }}
                    />
                </View>

                <View style={{ width: '40%', marginTop: '-0.9%' }}>
                    <DropDownPicker
                        open={startMonthDropDownOpen}
                        value={startSelectedMonth}
                        items={startMonths}
                        setOpen={setStartMonthDropDownOpen}
                        setValue={setStartSelectedMonth}
                        setItems={setStartMonths}
                        placeholder="Miesiąc"
                        style={[styles.dropDownPicker, { width: '100%' }]}
                        textStyle={{
                            fontFamily: 'MerriWeather',
                            textAlign: 'center',
                            width: '50%',
                            fontSize: 20,
                            color: '#F875AA'
                        }}
                        dropDownContainerStyle={{
                            backgroundColor: '#F1D1D0',
                            borderBottomWidth: 1,
                            width: '100%'
                        }}
                    />
                </View>

                <View style={{ width: '30%' }}>
                    <DropDownPicker
                        open={startDayDropDownOpen}
                        value={startSelectedDay}
                        items={days}
                        setOpen={setStartDayDropDownOpen}
                        setValue={setStartSelectedDay}
                        setItems={setDays}
                        placeholder="Dzień"
                        style={[styles.dropDownPicker, { width: '100%' }]}
                        textStyle={{
                            fontFamily: 'MerriWeather',
                            textAlign: 'center',
                            width: '50%',
                            fontSize: 20,
                            color: '#F875AA'
                        }}
                        dropDownContainerStyle={{
                            backgroundColor: '#F1D1D0',
                            borderBottomWidth: 1,
                            width: '100%'
                        }}
                    />
                </View>

            </View>

            <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold', marginTop: '10%' }]}>Wybierz godzinę rozpoczęcia:</Text>

            
            <DropDownPicker
                searchable={true}
                searchPlaceholder="Wyszukaj..."
                containerStyle={{
                    zIndex: 1
                }}
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
                dropDownDirection="BOTTOM"
                placeholder="Wybierz pracownika"
                open={userDropDownOpen}
                value={employeeId}
                items={userContext.state.map(user => ({ label: `${user.name} ${user.surname}`, value: user.id }))}
                setOpen={setUserDropDownOpen}
                setValue={setUserId}
                setItems={setUsers}
            />
        </View>
    );
};

VacationForm.defaultProps = {
    initialValues: {
        name: '',
        surname: '',
        phoneNumber: '',
        belatedCounter: ''
    }
};


const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    },
    button: {
        marginTop: 20,
        width: 170,
        height: 90
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
});

export default VacationForm;
