import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import { Context } from './context/AppointmentContext';
import AppointmentItem from './AppointmentItem';

const AppointmentScreen = ({ navigation }) => {
    const { state, addClient, getAppointments } = useContext(Context);

    useEffect(() => {
        getAppointments();

        const listener = navigation.addListener('didFocus', () => {
            getAppointments();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View>
            <Text>Appointment screen !!! {state.length}</Text>
            <Button title="Dodaj wizytę" onPress={() => navigation.navigate('AppointmentAdd')}/>
            <FlatList 
                data={state}
                keyExtractor={appointment => appointment.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Appointment', { id: item.id })}>
                            <AppointmentItem appointment={item}></AppointmentItem>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default AppointmentScreen;