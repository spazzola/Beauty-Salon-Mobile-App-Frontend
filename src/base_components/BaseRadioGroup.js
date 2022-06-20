import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from '../user/context/UserContext';
import { globalBackground, buttonWrapper, button, buttonText } from '../../GlobalStyles';
import { useFonts } from 'expo-font';

const BaseRadioGroup = ({ navigation, changeAppointmentsToShow }) => {
    const { state, addUser, getUsers } = useContext(UserContext);
    const [appointmentsToShow, setAppointmentsToShow] = useState({ myAppointments: true, employeeAppointments: false });
    const [isMyAppointmentsSelected, setIsMyAppointmentsSelected] = useState(true);
    const [isEmployeeAppointmentsSelected, setIsEmployeeAppointmentsSelected] = useState(false);
    const [loaded] = useFonts({
        KalamRegular: require('../../assets/fonts/Kalam-Regular.ttf'),
        KalamBold: require('../../assets/fonts/Kalam-Bold.ttf'),
    });

    useEffect(() => {
        getUsers();

        const listener = navigation.addListener('didFocus', () => {
            getUsers();
        });

        return () => {
            listener.remove();
        };
    }, []);

    if (!loaded) {
        return null;
    }

    function changeToMyAppointments() {
        let newState = {
            myAppointments: !appointmentsToShow.myAppointments,
            employeeAppointments: appointmentsToShow.employeeAppointments
        }
        setIsMyAppointmentsSelected(!isMyAppointmentsSelected);
        setAppointmentsToShow(newState);
        changeAppointmentsToShow(newState);
    }

    function changeToEmployeeAppointments() {
        let newState = {
            myAppointments: appointmentsToShow.myAppointments,
            employeeAppointments: !appointmentsToShow.employeeAppointments
        }
        setIsEmployeeAppointmentsSelected(!isEmployeeAppointmentsSelected);
        setAppointmentsToShow(newState);
        changeAppointmentsToShow(newState);
    }

    return (
        <View style={[styles.wrapper, globalBackground]}>
            <TouchableOpacity
                onPress={() => changeToMyAppointments()}
                style={[styles.button, { backgroundColor: isMyAppointmentsSelected ? '#FBACCC' : '#d0c3c8' }]}>
                <Text style={{ color: '#F4F9F9', fontFamily: 'MerriWeatherBold' }}>Moje wizyty</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => changeToEmployeeAppointments()}
                style={[styles.button, { backgroundColor: isEmployeeAppointmentsSelected ? '#1C6DD0' : '#d0c3c8', marginLeft: '50%' }]}>
                <Text style={{ color: '#F4F9F9', fontFamily: 'MerriWeatherBold' }}>Wizyty pracownika</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
    button: {
        height: 30,
        width: '50%',
        borderRadius: 15,
        borderWidth: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 3
    }
})

export default BaseRadioGroup;