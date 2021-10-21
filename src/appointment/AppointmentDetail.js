import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Context } from './context/AppointmentContext';

const AppointmentDetail = ({ navigation }) => {
    const { state, deleteAppointment } = useContext(Context);

    const appointment = state.find((appointment) => appointment.id === navigation.getParam('id'));
    console.log(appointment);

    return (
        <View>
            <Text style={styles.paragraph}><Text style={styles.title}>Appointment id: </Text> {appointment.id}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Klient: </Text> {appointment.client.name}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Nr.kom: </Text> {appointment.client.surname}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Wartość: </Text> {appointment.worksSum}</Text>
            <View style={styles.buttonsContainer}>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    paragraph: {
        marginTop: 10,
        fontSize: 30,
        textAlign: 'center'
    },
    title: {
        fontWeight: 'bold'
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    delete: {
        height: 20,
        width: 50
    }
});

export default AppointmentDetail;