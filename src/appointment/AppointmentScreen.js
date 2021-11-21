import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Context } from './context/AppointmentContext';
import AppointmentItem from './AppointmentItem';
import BaseRadioGroup from '../base_components/BaseRadioGroup';
import { changeShowMode } from './AppointmentService';
import { buttonIcons } from '../icons/Icons';
import { globalBackground, buttonText, button, headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';
import { Context as AuthContext } from '../signin/context/AuthContext';

// function extractHours(startDate) {
//     return startDate.substring(11, 16);
// }

//CONFIGURATION
let boxHeight = 100;
let hours = ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let headerTitle;

function sortList(appointments, appointmentsToShow, selectedDay) {
    if (appointmentsToShow.myAppointments && !appointmentsToShow.employeeAppointments) {
        return appointments.filter((appointment) =>
            appointment.employee.role === 'ADMIN' && appointment.finishDate.substring(8, 10) == selectedDay
        );
    }
    if (!appointmentsToShow.myAppointments && appointmentsToShow.employeeAppointments) {
        return appointments.filter((appointment) =>
            appointment.employee.role === 'USER' && appointment.finishDate.substring(8, 10) == selectedDay
        );
    }
    if (appointmentsToShow.myAppointments && appointmentsToShow.employeeAppointments) {
        return appointments.filter((appo) => appo.finishDate.substring(8, 10) == selectedDay);
    }
    if (!appointmentsToShow.myAppointments && !appointmentsToShow.employeeAppointments) {
        return [];
    }
}


const AppointmentScreen = ({ navigation }) => {
    const { state, getAppointments } = useContext(Context);
    const authState = useContext(AuthContext);
    const [appointmentsToShow, setAppointmentsToShow] = useState(
        authState.state.role === 'ADMIN' ? { myAppointments: true, employeeAppointments: false } : { myAppointments: false, employeeAppointments: true }
    );

    const [selectedDay, setSelectedDay] = useState(navigation.getParam('selectedDate').day)
    function changeAppointmentsToShow(event) {
        setAppointmentsToShow(event);
    }
    
    useEffect(() => {
        const date = navigation.getParam('selectedDate');
        headerTitle = date.day + '/' + date.month + '/' + date.year;

        getAppointments(date.month, date.year, authState.state.id);
        // let selectedDate = navigation.getParam('selectedDate');
        // let formattedDate = selectedDate.day + "/" + selectedDate.month + "/" + selectedDate.year + " 00:00";

        const listener = navigation.addListener('didFocus', () => {
            getAppointments(date.month, date.year, authState.state.id);
        });

        return () => {
            listener.remove();
        };
    }, []);

    useEffect(() => {
        const listener = navigation.addListener('didFocus', () => {

        });

        return () => {
            listener.remove();
        };
    }, [appointmentsToShow]);

    return (
        <>
            {authState.state.role === 'ADMIN' ?
                <View style={[globalBackground, { marginBottom: 0, justifyContent: 'center', zIndex: 2 }]}>
                    <BaseRadioGroup navigation={navigation} changeAppointmentsToShow={changeAppointmentsToShow} />
                </View> : null
            }
            <ScrollView contentContainerStyle={{ height: 1800 }} showsVerticalScrollIndicator={false} >
                <View style={[globalBackground, { position: 'absolute', zIndex: -2, height: 2000, top: authState.state.role === 'ADMIN' ? 30 : 0 }]}>
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
                    {appointmentsToShow.myAppointments && appointmentsToShow.employeeAppointments ?
                        (
                            sortList(state, appointmentsToShow, selectedDay).map((item, index) => {
                                return (
                                    <>
                                        <View key={index} style={{ position: 'absolute', backgroundColor: 'yellow', height: windowHeight }}>
                                            <AppointmentItem appointment={item} navigation={navigation} mode={'double'} selectedDate={navigation.getParam('selectedDate')} />
                                        </View>
                                    </>
                                )
                            })
                        )
                        :
                        (
                            sortList(state, appointmentsToShow, selectedDay).map((item, index) => {
                                return (
                                    <View key={index} style={{ position: 'absolute', backgroundColor: 'yellow', height: windowHeight }}>
                                        <AppointmentItem appointment={item} navigation={navigation} mode={'single'} selectedDate={navigation.getParam('selectedDate')} />
                                    </View>
                                )
                            })
                        )}
                </View>
            </ScrollView>
            <TouchableOpacity style={[styles.wrapper, button]} onPress={() => {
                console.log("clicked");
                navigation.navigate('AppointmentAdd', { selectedDate: navigation.getParam('selectedDate') })
            }}>
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj wizytę</Text>
            </TouchableOpacity>
        </>
    );
}

AppointmentScreen.navigationOptions = (navigation) => {
    return {
        title: headerTitle,
        headerTintColor: headerTitleColor,
        headerTitleStyle: {
            fontFamily: 'MerriWeatherBold'
        },
        headerStyle: {
            backgroundColor: headerBackgroundColor,
        },
    }
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: '87%',
        left: '50%',
        //top: 650, 
        //left: 200,
        zIndex: 1,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 3
    },
})

export { boxHeight };
export default AppointmentScreen;