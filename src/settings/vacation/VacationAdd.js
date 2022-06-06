import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/SettingsContext';
import VacationForm from './VacationForm';
import { headerBackgroundColor, headerTitleColor } from '../../../GlobalStyles';

const VacationAdd = ({ navigation }) => {
    //const { addCost } = useContext(Context);

    return (
        <VacationForm
            navigation={navigation}
            onSubmit={(name, value, addedDate) => {
                addCost(name, value, addedDate, () => navigation.navigate('VacationScreen'));
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