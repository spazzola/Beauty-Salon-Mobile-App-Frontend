import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Context } from './context/AppointmentContext';
import AppointmentItem from './AppointmentItem';
import BaseRadioGroup from '../base_components/BaseRadioGroup';
import { changeShowMode } from './AppointmentService';
import { buttonIcons } from '../icons/Icons';

// function extractHours(startDate) {
//     return startDate.substring(11, 16);
// }

//CONFIGURATION
let boxHeight = 100;

let hours = ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const AppointmentScreen = ({ navigation }) => {
    const { state, addClient, getAppointments } = useContext(Context);
    const [mode, setMode] = useState('single')
    //let showMode = 'single';
    let appointmentsToShow = { myAppointments: true, employeeAppointments: false };

    function changeAppointmentsToShow(event) {
        appointmentsToShow = event;
        newMode = changeShowMode(appointmentsToShow);
        setMode(newMode);
    }

    useEffect(() => {
        getAppointments();
        let selectedDate = navigation.getParam('selectedDate');
        let formattedDate = selectedDate.day + "/" + selectedDate.month + "/" + selectedDate.year + " 00:00";

        const listener = navigation.addListener('didFocus', () => {
            getAppointments();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
        <>
            <View style={{ marginBottom: 5, justifyContent: 'center' }}>
                <BaseRadioGroup navigation={navigation} changeAppointmentsToShow={changeAppointmentsToShow} />
            </View>
            <ScrollView contentContainerStyle={{ height: 1800 }} showsVerticalScrollIndicator={false} >
                <View style={{ position: 'absolute', zIndex: -2, height: 2000 }}>
                    <FlatList
                        data={hours}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:00</Text>
                                    <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:15</Text>
                                    <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:30</Text>
                                    <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:45</Text>
                                </View>

                            )
                        }}
                    />
                </View>
                <View style={{ position: 'absolute', width: windowWidth, height: 2000, zIndex: -1 }}>
                    {/* <FlatList
                    data={state}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{position: 'absolute',backgroundColor: 'yellow', height: windowHeight}}>
                                <AppointmentItem appointment={item} navigation={navigation} />
                            </View>
                        );
                    }}
                /> */}
                    {state.map((item, index) => {
                        return (
                            <View style={{ position: 'absolute', backgroundColor: 'yellow', height: windowHeight }}>
                                <AppointmentItem appointment={item} navigation={navigation} mode={mode} selectedDate={navigation.getParam('selectedDate')}/>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            <View style={[styles.wrapper]}>
                <TouchableOpacity onPress={() => navigation.navigate('AppointmentAdd', { selectedDate: navigation.getParam('selectedDate')})}>
                    <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'addAppointment')).uri} />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        width: 160,
        height: 80
    }
})

export { boxHeight };
export default AppointmentScreen;