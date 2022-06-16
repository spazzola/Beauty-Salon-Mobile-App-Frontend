import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/SettingsContext';
import VacationForm from './VacationForm';
import BaseSpinner from '../../base_components/BaseSpinner';
import { headerBackgroundColor, headerTitleColor } from '../../../GlobalStyles';

const VacationAdd = ({ navigation }) => {
    const { state, createVacation, getAllVacations } = useContext(Context);
    const [showSpinner, setShowSpinner] = useState(false);

    return (
        <>
        <VacationForm
            navigation={navigation}
            onSubmit={async(startDate, finishDate, userId) => {
                createVacation(startDate, finishDate, userId, () => navigation.navigate('VacationScreen'));
                await getAllVacations();
                navigation.navigate('Vacation');
            }}
        />
        {showSpinner ?
            <BaseSpinner />
            : null}
        </>
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