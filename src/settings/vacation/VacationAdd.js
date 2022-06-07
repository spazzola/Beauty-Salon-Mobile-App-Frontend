import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/SettingsContext';
import VacationForm from './VacationForm';
import { headerBackgroundColor, headerTitleColor } from '../../../GlobalStyles';

const VacationAdd = ({ navigation }) => {
    const { createVacation } = useContext(Context);

    return (
        <VacationForm
            navigation={navigation}
            onSubmit={(startDate, finishDate, userId) => {
                createVacation(startDate, finishDate, userId, () => navigation.navigate('VacationScreen'));
                navigation.navigate('Vacation');
            }}
        />
    );
};

VacationAdd.navigationOptions = {
    title: 'Dodawanie urlopu',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};


const styles = StyleSheet.create({});

export default VacationAdd;