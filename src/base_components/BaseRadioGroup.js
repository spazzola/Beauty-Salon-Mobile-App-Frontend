import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from '../user/context/UserContext';
import { globalBackground } from '../../GlobalStyles';
import { useFonts } from 'expo-font';

const BaseRadioGroup = ({ navigation, changeAppointmentsToShow }) => {
    const { state, addUser, getUsers } = useContext(UserContext);
    const [appointmentsToShow, setAppointmentsToShow] = useState({myAppointments: true, employeeAppointments: false});
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
            employeeAppointments : appointmentsToShow.employeeAppointments
        }
        setIsMyAppointmentsSelected(!isMyAppointmentsSelected);
        setAppointmentsToShow(newState);
        changeAppointmentsToShow(newState);
    }

    function changeToEmployeeAppointments() {
        let newState = {
            myAppointments: appointmentsToShow.myAppointments,
            employeeAppointments : !appointmentsToShow.employeeAppointments
        }
        setIsEmployeeAppointmentsSelected(!isEmployeeAppointmentsSelected);
        setAppointmentsToShow(newState);
        changeAppointmentsToShow(newState);
    }

    return (
        <View style={[styles.wrapper, globalBackground]}>
            <TouchableOpacity
                onPress={() => changeToMyAppointments()}
                style={[styles.button, {backgroundColor: isMyAppointmentsSelected ? '#FF00E4' : '#d0c3c8' }]}>
                <Text style={{ color: 'pink', fontFamily: 'KalamBold' }}>Moje wizyty</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => changeToEmployeeAppointments()}
                style={[styles.button, {backgroundColor: isEmployeeAppointmentsSelected ? '#7027A0' : '#d0c3c8' }]}>
                <Text style={{ color: '#F56FAD', fontFamily: 'KalamBold' }}>Wizyty pracownika</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row'
    },
    button: {
        height: 30,
        width: 200,
        borderRadius: 10,
        borderWidth: 1,
    }
})

export default BaseRadioGroup;