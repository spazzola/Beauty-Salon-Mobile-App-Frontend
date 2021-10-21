import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from '../user/context/UserContext';


const BaseRadioGroup = ({ navigation, changeAppointmentsToShow }) => {
    const { state, addUser, getUsers } = useContext(UserContext);
    const [appointmentsToShow, setAppointmentsToShow] = useState({myAppointments: true, employeeAppointments: false});

    useEffect(() => {
        getUsers();

        const listener = navigation.addListener('didFocus', () => {
            getUsers();
        });

        return () => {
            listener.remove();
        };
    }, []);

    function changeToMyAppointments() {
        let newState = {
            myAppointments: !appointmentsToShow.myAppointments,
            employeeAppointments : appointmentsToShow.employeeAppointments
        }
        setAppointmentsToShow(newState);
        changeAppointmentsToShow(newState);
    }

    function changeToEmployeeAppointments() {
        let newState = {
            myAppointments: appointmentsToShow.myAppointments,
            employeeAppointments : !appointmentsToShow.employeeAppointments
        }
        setAppointmentsToShow(newState);
        changeAppointmentsToShow(newState);
    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                onPress={() => changeToMyAppointments()}
                style={styles.button}>
                <Text style={{ color: 'pink' }}>Moje wizyty</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => changeToEmployeeAppointments()}
                style={styles.button}>
                <Text style={{ color: 'purple' }}>Wizyty pracownika</Text>
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