import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Alert } from 'react-native';
import { input, globalBackground, button, buttonText, buttonWrapper, headerBackgroundColor, detailTitle } from '../../../GlobalStyles';
import { Context as UserContext } from '../../user/context/UserContext';
import DropDownPicker from 'react-native-dropdown-picker'
import BaseSpinner from '../../base_components/BaseSpinner';

const VacationForm = ({ onSubmit, initialValues, mode, backgroundColor, givenEmployeeId, navigation }) => {

    const [showSpinner, setShowSpinner] = useState(false);

    const [isOneDayVacationSelected, setOneDayVacationSelected] = useState(false);

    const [startYearDropDownOpen, setStartYearDropDownOpen] = useState(false);
    const [startSelectedYear, setStartSelectedYear] = useState(initialValues.selectedFinishYear);
    const [years, setYears] = useState([
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' },
        { label: '2025', value: '2025' },
        { label: '2026', value: '2026' },
    ]);

    const [startMonthDropDownOpen, setStartMonthDropDownOpen] = useState(false);
    const [startSelectedMonth, setStartSelectedMonth] = useState(initialValues.selectedStartMonth);
    const [months, setMonths] = useState([
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
    const [startSelectedDay, setStartSelectedDay] = useState(initialValues.selectedStartDay);
    const [startDays, setStartDays] = useState([]);

    const [startHourDropDownOpen, setStartHourDropDownOpen] = useState(false);
    const [startSelectedHour, setStartSelectedHour] = useState(initialValues.selectedStartHour);
    const [hours, setHours] = useState([
        { label: 'Cały dzień', value: 'allDay' },
        { label: '6', value: '06' },
        { label: '7', value: '07' },
        { label: '8', value: '08' },
        { label: '9', value: '09' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' }
    ]);

    const [startMinuteDropDownOpen, setStartMinuteDropDownOpen] = useState(false);
    const [startSelectedMinute, setStartSelectedMinute] = useState(initialValues.selectedStartMinute);
    const [minutes, setMinutes] = useState([
        { label: '00', value: '00' },
        { label: '15', value: '15' },
        { label: '30', value: '30' },
        { label: '45', value: '45' },
    ]);


    const [finishYearDropDownOpen, setFinishYearDropDownOpen] = useState(false);
    const [finishSelectedYear, setFinishSelectedYear] = useState(initialValues.selectedFinishYear);

    const [finishMonthDropDownOpen, setFinishMonthDropDownOpen] = useState(false);
    const [finishSelectedMonth, setFinishSelectedMonth] = useState(initialValues.selectedFinishMonth);

    const [finishDayDropDownOpen, setFinishDayDropDownOpen] = useState(false);
    const [finishSelectedDay, setFinishSelectedDay] = useState(initialValues.selectedFinishDay);
    const [finishDays, setFinishDays] = useState([]);

    const [finishHourDropDownOpen, setFinishHourDropDownOpen] = useState(false);
    const [finishSelectedHour, setFinishSelectedHour] = useState(initialValues.selectedFinishHour);

    const [finishMinuteDropDownOpen, setFinishMinuteDropDownOpen] = useState(false);
    const [finishSelectedMinute, setFinishSelectedMinute] = useState(initialValues.selectedFinishMinute);

    const userContext = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userDropDownOpen, setUserDropDownOpen] = useState(false);
    const [employeeId, setUserId] = useState(initialValues.employeeId);
    const [userItems, setUsers] = useState([]);

    useEffect(() => {
        userContext.getUsers();

        var currentDate = startSelectedYear == '' ? new Date() : new Date(startSelectedYear, startSelectedMonth, 0);
        var currentYear = currentDate.getFullYear();
        setStartSelectedYear(currentYear.toString());
        setFinishSelectedYear(currentYear.toString());

        var daysInMonth = new Date(currentYear, (currentDate.getMonth() + 1), 0).getDate();
        var currentDays = [];
        for (var i = 1; i <= daysInMonth; i++) {
            var day = i
            i < 10 ? i = "0" + i : i.toString();
            currentDays.push({ label: day, value: i.toString() });
        }
        setStartDays(currentDays);

        const listener = navigation.addListener('didFocus', () => {
            userContext.getUsers();
        });

        return () => {
            listener.remove();
        };
    }, [startSelectedMonth]);

    useEffect(() => {
        var daysInMonth = new Date(finishSelectedYear, finishSelectedMonth, 0).getDate();
        var currentDays = [];
        for (var i = 1; i <= daysInMonth; i++) {
            var day = i
            i < 10 ? i = "0" + i : i.toString();
            currentDays.push({ label: day, value: i });
        }
        setFinishDays(currentDays);

        const listener = navigation.addListener('didFocus', () => {

        });

        return () => {
            listener.remove();
        };
    }, [finishSelectedMonth]);




    return (
        <View style={[{ alignItems: 'center', height: '100%', backgroundColor: backgroundColor ? backgroundColor : globalBackground.backgroundColor }]}>
            <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold' }]}>Wybierz datę rozpoczęcia:</Text>
            <View style={{ flexDirection: 'row', zIndex: 13 }}>
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
                        items={months}
                        setOpen={setStartMonthDropDownOpen}
                        setValue={setStartSelectedMonth}
                        setItems={setMonths}
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
                        items={startDays}
                        setOpen={setStartDayDropDownOpen}
                        setValue={setStartSelectedDay}
                        setItems={setStartDays}
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
            <View style={{ flexDirection: 'row', zIndex: 12 }}>
                <View style={{ width: '40%' }}>
                    <DropDownPicker
                        open={startHourDropDownOpen}
                        value={startSelectedHour}
                        items={hours}
                        setOpen={setStartHourDropDownOpen}
                        setValue={setStartSelectedHour}
                        setItems={setHours}
                        placeholder="Godzina"
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
                        onChangeValue={item => {
                            if (item == 'allDay') {
                                setOneDayVacationSelected(true);
                                setFinishSelectedYear(startSelectedYear);
                                setFinishSelectedMonth(startSelectedMonth);
                                setFinishSelectedDay(startSelectedDay);
                            } else {
                                setOneDayVacationSelected(false);
                            }
                        }}
                    />
                </View>
                <View style={{ width: '30%', marginTop: '1%' }}>
                    <DropDownPicker
                        open={startMinuteDropDownOpen}
                        value={startSelectedMinute}
                        items={minutes}
                        setOpen={setStartMinuteDropDownOpen}
                        setValue={setStartSelectedMinute}
                        setItems={setMinutes}
                        disabled={isOneDayVacationSelected}
                        placeholder="Minuty"
                        style={[styles.dropDownPicker, { width: '100%' }]}
                        disabledStyle={styles.dropDownDisabled}
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

            <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold', marginTop: '20%' }]}>Wybierz datę zakończenia:</Text>
            <View style={{ flexDirection: 'row', zIndex: 11 }}>
                <View style={{ width: '30%' }}>
                    <DropDownPicker
                        open={finishYearDropDownOpen}
                        value={finishSelectedYear}
                        items={years}
                        setOpen={setFinishYearDropDownOpen}
                        setValue={setFinishSelectedYear}
                        setItems={setYears}
                        disabled={isOneDayVacationSelected}
                        placeholder="Rok"
                        style={[styles.dropDownPicker, { width: '100%' }]}
                        disabledStyle={styles.dropDownDisabled}
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
                        open={finishMonthDropDownOpen}
                        value={finishSelectedMonth}
                        items={months}
                        setOpen={setFinishMonthDropDownOpen}
                        setValue={setFinishSelectedMonth}
                        setItems={setMonths}
                        disabled={isOneDayVacationSelected}
                        placeholder="Miesiąc"
                        style={[styles.dropDownPicker, { width: '100%' }]}
                        disabledStyle={styles.dropDownDisabled}
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
                        open={finishDayDropDownOpen}
                        value={finishSelectedDay}
                        items={finishDays}
                        setOpen={setFinishDayDropDownOpen}
                        setValue={setFinishSelectedDay}
                        setItems={setFinishDays}
                        disabled={isOneDayVacationSelected}
                        placeholder="Dzień"
                        style={[styles.dropDownPicker, { width: '100%' }]}
                        disabledStyle={styles.dropDownDisabled}
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

            <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold', marginTop: '10%' }]}>Wybierz godzinę zakończenia:</Text>
            <View style={{ flexDirection: 'row', zIndex: 10 }}>
                <View style={{ width: '40%' }}>
                    <DropDownPicker
                        open={finishHourDropDownOpen}
                        value={finishSelectedHour}
                        items={hours}
                        setOpen={setFinishHourDropDownOpen}
                        setValue={setFinishSelectedHour}
                        setItems={setHours}
                        disabled={isOneDayVacationSelected}
                        placeholder="Godzina"
                        style={[styles.dropDownPicker, { width: '100%' }]}
                        disabledStyle={styles.dropDownDisabled}
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
                <View style={{ width: '30%', marginTop: '1%' }}>
                    <DropDownPicker
                        open={finishMinuteDropDownOpen}
                        value={finishSelectedMinute}
                        items={minutes}
                        setOpen={setFinishMinuteDropDownOpen}
                        setValue={setFinishSelectedMinute}
                        setItems={setMinutes}
                        disabled={isOneDayVacationSelected}
                        placeholder="Minuty"
                        style={[styles.dropDownPicker, { width: '100%' }]}
                        disabledStyle={styles.dropDownDisabled}
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

            <View style={{ marginTop: '5%', zIndex: 5 }}>
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

            <TouchableOpacity style={[styles.wrapper, button]} onPress={() => {
                var chosenStartDate;
                var chosenFinishDate;
                if (startSelectedYear == undefined) {
                    Alert.alert("Błąd", "Podaj rok rozpoczęcia");
                } else if (startSelectedMonth == undefined) {
                    Alert.alert("Błąd", "Podaj miesiąc rozpoczęcia");
                } else if (startSelectedDay == undefined) {
                    Alert.alert("Błąd", "Podaj dzień rozpoczęcia");
                } else if (startSelectedHour == undefined) {
                    Alert.alert("Błąd", "Podaj godzinę rozpoczęcia");
                } else if (startSelectedMinute == undefined && !isOneDayVacationSelected) {
                    Alert.alert("Błąd", "Podaj minutę rozpoczęcia");
                } else if (finishSelectedYear == undefined && !isOneDayVacationSelected) {
                    Alert.alert("Błąd", "Podaj rok zakończenia");
                } else if (finishSelectedMonth == undefined && !isOneDayVacationSelected) {
                    Alert.alert("Błąd", "Podaj miesiąc zakończenia");
                } else if (finishSelectedDay == undefined && !isOneDayVacationSelected) {
                    Alert.alert("Błąd", "Podaj dzień zakończenia");
                } else if (finishSelectedHour == undefined && !isOneDayVacationSelected) {
                    Alert.alert("Błąd", "Podaj godzinę zakończenia");
                } else if (finishSelectedMinute == undefined && !isOneDayVacationSelected) {
                    Alert.alert("Błąd", "Podaj minutę zakończenia");
                } else if (employeeId == undefined || employeeId < 1) {
                    Alert.alert("Błąd", "Wybierz pracownika");
                }
                else {
                    if (isOneDayVacationSelected) {
                        chosenStartDate = startSelectedDay + "/" + startSelectedMonth + "/" + startSelectedYear;
                        chosenStartDate = chosenStartDate + " " + "00:00";

                        chosenFinishDate = finishSelectedDay + "/" + finishSelectedMonth + "/" + finishSelectedYear;
                        chosenFinishDate = chosenFinishDate + " " + "23:59";
                    } else {
                        chosenStartDate = startSelectedDay + "/" + startSelectedMonth + "/" + startSelectedYear;
                        chosenStartDate = chosenStartDate + " " + startSelectedHour + ":" + startSelectedMinute;

                        chosenFinishDate = finishSelectedDay + "/" + finishSelectedMonth + "/" + finishSelectedYear;
                        chosenFinishDate = chosenFinishDate + " " + finishSelectedHour + ":" + finishSelectedMinute;
                    }
                    setShowSpinner(!showSpinner);
                    onSubmit(chosenStartDate, chosenFinishDate, employeeId);
                    setShowSpinner(!showSpinner);
                }
            }}>
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>{mode === 'edit' ? 'Edytuj urlop' : 'Dodaj urlop'}</Text>
            </TouchableOpacity>

            {showSpinner ?
                <BaseSpinner />
                : null}
        </View>
    );
};

VacationForm.defaultProps = {
    initialValues: {
        selectedStartYear: '',
        selectedStartMonth: '',
        selectedStartDay: '',
        selectedStartHour: '',
        selectedStartMinute: '',
        selectedFinishYear: '',
        selectedFinishMonth: '',
        selectedFinishDay: '',
        selectedFinishHour: '',
        selectedFinishMinute: '',
        employeeId: ''
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
    dropDownDisabled: {
        opacity: 0.5
    },
    wrapper: {
        marginTop: '15%',
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 3
    }
});

export default VacationForm;
