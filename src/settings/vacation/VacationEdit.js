import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/SettingsContext';
import VacationForm from './VacationForm';
import { headerBackgroundColor, headerTitleColor } from '../../../GlobalStyles';

const VacationEdit = ({ navigation }) => {
    const id = navigation.getParam('id');
    const { state, editVacation } = useContext(Context);
    const vacation = state.find(vacation => vacation.id === id);

    const [selectedStartYear, setSelectedStartYear] = useState(vacation.startDate.substring(6, 10));
    const [selectedStartMonth, setSelectedStartMonth] = useState(vacation.startDate.substring(3, 5));
    const [selectedStartDay, setSelectedStartDay] = useState(vacation.startDate.substring(0, 2));
    const [selectedStartHour, setSelectedStartHour] = useState(vacation.startDate.substring(11, 13));
    const [selectedStartMinute, setSelectedStartMinute] = useState(vacation.startDate.substring(14, 16));
    const [selectedFinishYear, setSelectedFinishYear] = useState(vacation.finishDate.substring(6, 10));
    const [selectedFinishMonth, setSelectedFinishMonth] = useState(vacation.finishDate.substring(3, 5));
    const [selectedFinishDay, setSelectedFinishDay] = useState(vacation.finishDate.substring(0, 2));
    const [selectedFinishHour, setSelectedFinishHour] = useState(vacation.finishDate.substring(11, 13));
    const [selectedFinishMinute, setSelectedFinishMinute] = useState(vacation.finishDate.substring(14, 16));
    const [employeeId, setEmployeeId] = useState(vacation.employee.id);

    return (
        <VacationForm
            mode={'edit'}
            navigation={navigation}
            initialValues={{
                selectedStartYear,
                selectedStartMonth,
                selectedStartDay,
                selectedStartHour,
                selectedStartMinute,
                selectedFinishYear,
                selectedFinishMonth,
                selectedFinishDay,
                selectedFinishHour,
                selectedFinishMinute,
                employeeId
            }}
            onSubmit={(startDate, finishDate, employeeId) => {
                editVacation(id, startDate, finishDate, employeeId, () => navigation.pop());
            }}
        />
    );
};

VacationEdit.navigationOptions = {
    title: 'Edytowanie urlopu',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};

const styles = StyleSheet.create({});

export default VacationEdit;